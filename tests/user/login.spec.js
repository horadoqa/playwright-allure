import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { setAllureFeature } from '../../utils/allure.js';

test.describe.serial('Login usuário', () => {

    let token;

    const usuario = {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.string.alphanumeric(10),
    administrador: 'true'
  };

    test('CREATE - Deve criar usuário para login', async ({ request }) => {

        await setAllureFeature('Usuário', 'Criar usuário para login');

        const response = await request.post(
            `${process.env.BASE_URL}/usuarios`,
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                data: usuario
            }
        );

        const body = await response.json();

        if (response.status() !== 201) {
            console.error('Status:', response.status());
            console.error('Resposta:', body);
        }

        expect(response.status()).toBe(201);

        expect(body).toHaveProperty('_id');

        console.log(
            'Usuário criado para login:',
            body._id
        );
    });


    test('LOGIN - Deve realizar login com usuário criado', async ({ request }) => {

        await setAllureFeature('Usuário', 'Realizar login');

        const response = await request.post(
            `${process.env.BASE_URL}/login`,
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                data: {
                    email: usuario.email,
                    password: usuario.password,
                },
            }
        );

        const body = await response.json();

        if (response.status() !== 200) {
            console.error('Status:', response.status());
            console.error('Resposta:', body);
        }

        expect(response.status()).toBe(200);

        expect(body).toHaveProperty('message');

        expect(body.message).toContain(
            'Login realizado com sucesso'
        );

        expect(body).toHaveProperty('authorization');

        token = body.authorization;

        console.log(
            'Token gerado:',
            token
        );
    });


    test('LOGIN - Deve validar token gerado', async () => {

        expect(token).toBeDefined();

        expect(token).toContain(
            'Bearer'
        );

        console.log(
            'Token válido:',
            token
        );
    });

});