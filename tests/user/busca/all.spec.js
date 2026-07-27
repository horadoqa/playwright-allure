import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { setAllureFeature } from '../../../utils/allure.js';

// Metadados do Allure

test.describe('Listar usuários', () => {
    test('Deve listar todos os usuários', async ({ request }) => {
        await setAllureFeature('Usuário', 'Listar usuários');
        const response = await request.get('/usuarios');

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(Array.isArray(body.usuarios)).toBe(true);
    });
});