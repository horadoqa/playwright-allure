import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { setAllureFeature } from '../../../utils/allure.js';

test.describe('Listar usuários', () => {

    test('Deve listar todos os usuários', async ({ request }) => {

        await setAllureFeature('Usuário', 'Listar usuários');

        const response = await request.get(
            `${process.env.BASE_URL}/usuarios`,
            {
                headers: {
                    accept: 'application/json',
                },
            }
        );

        const body = await response.json();

        // Exibe erro caso a API falhe
        if (response.status() !== 200) {
            console.error('Status recebido:', response.status());
            console.error('Resposta da API:', body);
        }

        expect(response.status()).toBe(200);

        expect(body).toHaveProperty('quantidade');

        expect(body).toHaveProperty('usuarios');

        expect(Array.isArray(body.usuarios)).toBe(true);

        expect(body.usuarios.length).toBeGreaterThan(0);

        console.log('Quantidade de usuários:', body.quantidade);

        console.log('Usuários encontrados:');

        body.usuarios.forEach(usuario => {
            console.log({
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                administrador: usuario.administrador
            });
        });
    });
});