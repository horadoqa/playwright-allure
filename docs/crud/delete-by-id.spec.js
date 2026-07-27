import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { setAllureFeature } from '../../utils/allure.js';
import fs from 'fs';

test.describe('Excluir usuário', () => {

    test('Deve excluir um usuário cadastrado', async ({ request }) => {

        await setAllureFeature('Usuário', 'Excluir usuário');

        const usuarioCriado = JSON.parse(
            fs.readFileSync('./data/usuario.json', 'utf-8')
        );

        const response = await request.delete(
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

        expect(body).toHaveProperty('message');

        expect(body.message).toContain(
            'Registro excluído com sucesso'
        );

        console.log('Usuário excluído:', usuarioCriado.id);

        const consulta = await request.get(
            `${process.env.BASE_URL}/usuarios/${usuarioCriado.id}`
        );

        expect(consulta.status()).toBe(400);
    });
});