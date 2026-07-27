import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { setAllureFeature } from '../../../utils/allure.js';

test.describe('Login', () => {
    test('Deve realizar login com sucesso', async ({ request }) => {
        await setAllureFeature('Usuário', 'Login');
        const response = await request.post('/login', {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                email: process.env.EMAIL,
                password: process.env.PASSWORD,
            },
        });

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body).toHaveProperty('message', 'Login realizado com sucesso');
        expect(body).toHaveProperty('authorization');
    });
});