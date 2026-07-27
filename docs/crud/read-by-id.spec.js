import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { setAllureFeature } from '../../../utils/allure.js';
import fs from 'fs';

test.describe('Consultar usuário', () => {

    test('Deve consultar um usuário cadastrado', async ({ request }) => {

        await setAllureFeature('Usuário', 'Consultar usuário');

        const usuarioCriado = JSON.parse(
            fs.readFileSync('./data/usuario.json', 'utf-8')
        );

        const response = await request.get(
            `${process.env.BASE_URL}/usuarios/${usuarioCriado.id}`,
            {
                headers: {
                    accept: 'application/json',
                },
            }
        );

        const body = await response.json();

        // Exibe erro da API caso o status não seja o esperado
        if (response.status() !== 200) {
            console.error('Status recebido:', response.status());
            console.error('Resposta da API:', body);
        }

        expect(response.status()).toBe(200);

        // Valida os dados retornados
        expect(body).toHaveProperty('_id', usuarioCriado.id);
        expect(body).toHaveProperty('nome', process.env.NOME);
        expect(body).toHaveProperty('email', process.env.EMAIL);
        expect(body).toHaveProperty('administrador', 'true');

        console.log('Usuário encontrado:', body);
    });
});