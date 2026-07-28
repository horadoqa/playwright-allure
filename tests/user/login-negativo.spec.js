import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { setAllureFeature } from '../../utils/allure.js';

test.describe.serial('Cenários Negativos para o Login', () => {

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

    test('LOGIN - Não deve realizar login com senha incorreta', async ({ request }) => {

        await setAllureFeature('Login', 'Senha incorreta');

        const response = await request.post(`${process.env.BASE_URL}/login`, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                email: usuario.email,
                password: 'senhaIncorreta123'
            }
        });

        const body = await response.json();

        expect(response.status()).toBe(401);
        expect(body.message).toBe('Email e/ou senha inválidos');
    });

    test('LOGIN - Não deve realizar login com e-mail inexistente', async ({ request }) => {

        await setAllureFeature('Login', 'E-mail inexistente');

        const response = await request.post(`${process.env.BASE_URL}/login`, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                email: faker.internet.email(),
                password: process.env.PASSWORD
            }
        });

        const body = await response.json();

        expect(response.status()).toBe(401);
        expect(body.message).toBe('Email e/ou senha inválidos');
    });

    test('LOGIN - Não deve realizar login com formato de e-mail inválido', async ({ request }) => {

        await setAllureFeature('Login', 'Formato de e-mail inválido');

        const response = await request.post(`${process.env.BASE_URL}/login`, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                email: process.env.EMAIL_INVALIDO,
                password: process.env.PASSWORD
            }
        });

        const body = await response.json();

        expect(response.status()).toBe(400);
        expect(body).toEqual({email: 'email deve ser um email válido'});
    });

    test('LOGIN - Não deve realizar login sem informar e-mail', async ({ request }) => {

        await setAllureFeature('Login', 'E-mail obrigatório');

        const response = await request.post(`${process.env.BASE_URL}/login`, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                password: usuario.password
            }
        });

        const body = await response.json();

        expect(response.status()).toBe(400);
        expect(body.email).toBe('email é obrigatório');
    });

    test('LOGIN - Não deve realizar login sem informar senha', async ({ request }) => {

        await setAllureFeature('Login', 'Senha obrigatória');

        const response = await request.post(`${process.env.BASE_URL}/login`, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                email: usuario.email
            }
        });

        const body = await response.json();

        expect(response.status()).toBe(400);
        expect(body.password).toBe('password é obrigatório');
    });

    test('LOGIN - Não deve realizar login sem enviar dados', async ({ request }) => {

        await setAllureFeature('Login', 'Payload vazio');

        const response = await request.post(`${process.env.BASE_URL}/login`, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {}
        });

        const body = await response.json();

        expect(response.status()).toBe(400);
        expect(body.email).toBe('email é obrigatório');
        expect(body.password).toBe('password é obrigatório');
    });

    test('LOGIN - Não deve realizar login com senha vazia', async ({ request }) => {

        await setAllureFeature('Login', 'Senha vazia');

        const response = await request.post(`${process.env.BASE_URL}/login`, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                email: usuario.email,
                password: ''
            }
        });

        const body = await response.json();

        expect(response.status()).toBe(400);
        expect(body.password).toBe('password não pode ficar em branco');
    });

    test('LOGIN - Não deve realizar login com e-mail vazio', async ({ request }) => {

        await setAllureFeature('Login', 'E-mail vazio');

        const response = await request.post(`${process.env.BASE_URL}/login`, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                email: '',
                password: usuario.password
            }
        });

        const body = await response.json();

        expect(response.status()).toBe(400);
        expect(body.email).toBe('email não pode ficar em branco');
    });





});