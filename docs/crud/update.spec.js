import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { setAllureFeature } from '../../../utils/allure.js';
import fs from 'fs';

test.describe('Atualizar usuário', () => {

    test('Deve atualizar um usuário cadastrado', async ({ request }) => {

        await setAllureFeature('Usuário', 'Atualizar usuário');

        const usuarioCriado = JSON.parse(
            fs.readFileSync('./data/usuario.json', 'utf-8')
        );

        const response = await request.put(
            `${process.env.BASE_URL}/usuarios/${usuarioCriado.id}`,
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                data: {
                    nome: process.env.NOME_ATUALIZADO,
                    email: process.env.EMAIL_ATUALIZADO,
                    password: process.env.PASSWORD,
                    administrador: 'true',
                },
            }
        );

        const body = await response.json();

        if (response.status() !== 200) {
            console.error('Status recebido:', response.status());
            console.error('Resposta da API:', body);
        }

        expect(response.status()).toBe(200);

        expect(body).toHaveProperty('message');

        expect(body.message).toContain(
            'Registro alterado com sucesso'
        );

        const consulta = await request.get(
            `${process.env.BASE_URL}/usuarios/${usuarioCriado.id}`,
            {
                headers: {
                    accept: 'application/json',
                },
            }
        );

        const usuarioAtualizado = await consulta.json();

        expect(consulta.status()).toBe(200);

        expect(usuarioAtualizado).toHaveProperty(
            'email',
            process.env.EMAIL_ATUALIZADO
        );

        expect(usuarioAtualizado).toHaveProperty(
            'nome',
            process.env.NOME_ATUALIZADO
        );

        console.log('Usuário atualizado:', usuarioAtualizado);
    });
});