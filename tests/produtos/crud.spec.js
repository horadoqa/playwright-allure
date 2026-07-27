import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { setAllureFeature } from '../../utils/allure.js';

test.describe.serial('CRUD Produto', () => {

  let token;
  let produtoId;

  const usuario = {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.string.alphanumeric(10),
    administrador: 'true'
  };

  const produto = {
    nome: `Produto ${Date.now()}`,
    preco: 470,
    descricao: 'Mouse Gamer',
    quantidade: 10
  };

  test.beforeAll(async ({ request }) => {

    // Cria usuário
    await request.post(`${process.env.BASE_URL}/usuarios`, {
      data: usuario
    });

    // Login
    const login = await request.post(`${process.env.BASE_URL}/login`, {
      data: {
        email: usuario.email,
        password: usuario.password
      }
    });

    const body = await login.json();

    token = body.authorization;

  });

  test('CREATE - Deve cadastrar produto', async ({ request }) => {

    await setAllureFeature('Produto', 'Cadastrar produto');

    const response = await request.post(
      `${process.env.BASE_URL}/produtos`,
      {
        headers: {
          Authorization: token
        },
        data: produto
      }
    );

    const body = await response.json();

    expect(response.status()).toBe(201);

    expect(body.message).toBe('Cadastro realizado com sucesso');

    produtoId = body._id;

  });

  test('READ - Deve consultar produto', async ({ request }) => {

    await setAllureFeature('Produto', 'Consultar produto');

    const response = await request.get(
      `${process.env.BASE_URL}/produtos/${produtoId}`
    );

    const body = await response.json();

    expect(response.status()).toBe(200);

    expect(body.nome).toBe(produto.nome);
    expect(body.preco).toBe(produto.preco);
    expect(body.descricao).toBe(produto.descricao);
    expect(body.quantidade).toBe(produto.quantidade);

  });

  test('UPDATE - Deve atualizar produto', async ({ request }) => {

    await setAllureFeature('Produto', 'Atualizar produto');

    const produtoAtualizado = {
      nome: `${produto.nome} Atualizado`,
      preco: 550,
      descricao: 'Mouse sem fio',
      quantidade: 20
    };

    const response = await request.put(
      `${process.env.BASE_URL}/produtos/${produtoId}`,
      {
        headers: {
          Authorization: token
        },
        data: produtoAtualizado
      }
    );

    const body = await response.json();

    expect(response.status()).toBe(200);

    expect(body.message).toBe('Registro alterado com sucesso');

    Object.assign(produto, produtoAtualizado);

  });

  test('READ após UPDATE', async ({ request }) => {

    await setAllureFeature('Produto', 'Validar atualização');

    const response = await request.get(
      `${process.env.BASE_URL}/produtos/${produtoId}`
    );

    const body = await response.json();

    expect(response.status()).toBe(200);

    expect(body.nome).toBe(produto.nome);
    expect(body.preco).toBe(produto.preco);
    expect(body.descricao).toBe(produto.descricao);
    expect(body.quantidade).toBe(produto.quantidade);

  });

  test('DELETE - Deve excluir produto', async ({ request }) => {

    await setAllureFeature('Produto', 'Excluir produto');

    const response = await request.delete(
      `${process.env.BASE_URL}/produtos/${produtoId}`,
      {
        headers: {
          Authorization: token
        }
      }
    );

    const body = await response.json();

    expect(response.status()).toBe(200);

    expect(body.message).toBe('Registro excluído com sucesso');

  });

  test('READ após DELETE', async ({ request }) => {

    await setAllureFeature('Produto', 'Validar exclusão');

    const response = await request.get(
      `${process.env.BASE_URL}/produtos/${produtoId}`
    );

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe('Produto não encontrado');

  });

});