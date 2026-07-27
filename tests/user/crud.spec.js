import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { setAllureFeature } from '../../utils/allure.js';

test.describe.serial('CRUD Usuário', () => {

    let usuarioId;

    test('CREATE - Deve criar um usuário', async ({ request }) => {

        await setAllureFeature('Usuário', 'Criar usuário');

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

        if (response.status() !== 201) {
            console.error('Status:', response.status());
            console.error('Resposta:', body);
        }

        expect(response.status()).toBe(201);

        expect(body).toHaveProperty('_id');

        usuarioId = body._id;

        console.log('Usuário criado:', usuarioId);
    });


    test('READ - Deve consultar o usuário criado', async ({ request }) => {

        await setAllureFeature('Usuário', 'Consultar usuário');

        const response = await request.get(
            `${process.env.BASE_URL}/usuarios/${usuarioId}`,
            {
                headers: {
                    accept: 'application/json',
                },
            }
        );

        const body = await response.json();

        if (response.status() !== 200) {
            console.error('Status:', response.status());
            console.error('Resposta:', body);
        }

        expect(response.status()).toBe(200);

        expect(body).toHaveProperty('nome', process.env.NOME);
        expect(body).toHaveProperty('email', process.env.EMAIL);
        expect(body).toHaveProperty('administrador', 'true');

        console.log('Usuário consultado:', body);
    });


    test('UPDATE - Deve atualizar o usuário', async ({ request }) => {

        await setAllureFeature('Usuário', 'Atualizar usuário');

        const response = await request.put(
            `${process.env.BASE_URL}/usuarios/${usuarioId}`,
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                data: {
                    nome: process.env.NOME_ATUALIZADO,
                    email: process.env.EMAIL_ATUALIZADO,
                    password: process.env.PASSWORD,
                    administrador: 'true',
                },
            }
        );

        const body = await response.json();

        if (response.status() !== 200) {
            console.error('Status:', response.status());
            console.error('Resposta:', body);
        }

        expect(response.status()).toBe(200);

        expect(body.message).toContain(
            'Registro alterado com sucesso'
        );

        console.log('Usuário atualizado:', usuarioId);
    });


    test('READ após UPDATE - Deve validar dados atualizados', async ({ request }) => {

        await setAllureFeature('Usuário', 'Validar usuário atualizado');

        const response = await request.get(
            `${process.env.BASE_URL}/usuarios/${usuarioId}`
        );

        const body = await response.json();

        expect(response.status()).toBe(200);

        expect(body).toHaveProperty(
            'nome',
            process.env.NOME_ATUALIZADO
        );

        expect(body).toHaveProperty(
            'email',
            process.env.EMAIL_ATUALIZADO
        );

        console.log('Dados atualizados confirmados:', body);
    });


    test('DELETE - Deve excluir o usuário', async ({ request }) => {

        await setAllureFeature('Usuário', 'Excluir usuário');

        const response = await request.delete(
            `${process.env.BASE_URL}/usuarios/${usuarioId}`,
            {
                headers: {
                    accept: 'application/json',
                },
            }
        );

        const body = await response.json();

        if (response.status() !== 200) {
            console.error('Status:', response.status());
            console.error('Resposta:', body);
        }

        expect(response.status()).toBe(200);

        expect(body.message).toContain(
            'Registro excluído com sucesso'
        );

        console.log('Usuário excluído:', usuarioId);
    });


    test('READ após DELETE - Deve validar que usuário foi removido', async ({ request }) => {

        await setAllureFeature('Usuário', 'Validar exclusão');

        const response = await request.get(
            `${process.env.BASE_URL}/usuarios/${usuarioId}`
        );

        expect(response.status()).toBe(400);

        console.log('Usuário removido com sucesso:', usuarioId);
    });

});