import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { setAllureFeature } from '../../../utils/allure.js';

test.describe('Cadastrar usuário', () => {
  test('Deve criar um novo usuário', async ({ request }) => {

    await setAllureFeature('Usuário', 'Cadastrar usuário');

    const response = await request.post(
      `${process.env.BASE_URL}/usuarios`,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          nome: process.env.NOME,
          email: process.env.EMAIL,
          password: process.env.PASSWORD,
          administrador: 'true',
        },
      }
    );

    const body = await response.json();

    // Exibe o erro da API caso o status não seja o esperado
    if (response.status() !== 201) {
      console.error('Status recebido:', response.status());
      console.error('Resposta da API:', body);
    }

    expect(response.status()).toBe(201);

    expect(body).toHaveProperty('message');
  });
});