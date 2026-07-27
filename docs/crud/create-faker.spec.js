import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { setAllureFeature } from '../../utils/allure.js';
import { faker } from '@faker-js/faker';

test.describe('Cadastrar usuário', () => {

  test('Deve criar um novo usuário', async ({ request }) => {

    await setAllureFeature('Usuário', 'Cadastrar usuário');

    const usuario = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: 'true',
    };

    const response = await request.post(
      `${process.env.BASE_URL}/usuarios`,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: usuario,
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
    expect(body).toHaveProperty('_id');

    console.log('Usuário criado:', {
      id: body._id,
      email: usuario.email
    });

  });

});