import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { setAllureFeature } from '../../../utils/allure.js';

test.describe.serial('CRUD Produtos', () => {

    const usuario = {
        nome: `Hora do QA - ${faker.person.firstName()}`,
        email: faker.internet.email(),
        password: faker.string.alphanumeric(10)
    };

    const produto = {
        nome: 'Adesivo Hora do QA',
        preco: 10,
        descricao: 'Adesivo redondo 5cm com o logo Hora do QA',
        quantidade: 50
    };

    async function login(page, usuario) {
        await page.goto('https://front.serverest.dev/login');

        await page.fill('input[name="email"]', usuario.email);
        await page.fill('input[name="password"]', usuario.password);

        await Promise.all([
            page.waitForURL(/admin\/home/),
            page.click('button[type="submit"]')
        ]);

        await page.waitForLoadState('networkidle');
    }

    test('CADASTRO E LOGIN DO USUÁRIO', async ({ page }) => {

        await page.goto(process.env.E2E_URL);

        await page.locator('form small a').click();
        await page.locator('#nome').fill(usuario.nome);
        await page.locator('#email').fill(usuario.email);
        await page.locator('#password').fill(usuario.password);
        await page.locator('input[type="checkbox"]').check();

        await Promise.all([
            page.waitForURL(/admin\/home/),
            page.locator('form button').click()
        ]);

        await expect(page).toHaveURL(/admin\/home/);

        const token = await page.evaluate(() =>
            localStorage.getItem('serverest/userToken')
        );

        console.log('Token:', token);

        expect(token).toBeTruthy();
    });

    test('CREATE - Deve cadastrar produto usando token do login', async ({ page, request }) => {

        await login(page, usuario);

        const token = await page.evaluate(() =>
            localStorage.getItem('serverest/userToken')
        );

        expect(token).toBeTruthy();

        const response = await request.post(
            'https://serverest.dev/produtos',
            {
                headers: {
                    Authorization: token
                },
                data: produto
            }
        );

        expect(response.status()).toBe(201);

        console.log(await response.json());
    });

    test('READ - Deve listar o produto cadastrado', async ({ page }) => {

        await login(page, usuario);

        await page.goto('https://front.serverest.dev/admin/listarprodutos');

        await page.waitForLoadState('networkidle');

        await expect(
            page.locator('table').getByText(produto.nome)
        ).toBeVisible();

    });

    // test('UPDATE - Deve alterar o produto', async ({ page }) => {

    //     await login(page, usuario);

    //     await page.goto('https://front.serverest.dev/admin/listarprodutos');

    //     const linhaProduto = page
    //         .locator('table tbody tr')
    //         .filter({ hasText: produto.nome });

    //     await expect(linhaProduto).toBeVisible();

    //     // Clica em Editar
    //     await linhaProduto.locator('button').first().click();

    //     // Altera os dados
    //     await page.fill('#nome', 'Adesivo Hora do QA Atualizado');
    //     await page.fill('#preco', '20');
    //     await page.fill('#descricao', 'Descrição atualizada');
    //     await page.fill('#quantity', '100');

    //     // Salva
    //     await page.getByRole('button', { name: /salvar|cadastrar/i }).click();

    //     // Valida
    //     await expect(
    //         page.getByText('Adesivo Hora do QA Atualizado')
    //     ).toBeVisible();

    // });

    test('DELETE - Deve excluir o produto', async ({ page }) => {

        await login(page, usuario);

        await page.goto('https://front.serverest.dev/admin/listarprodutos');

        const linhaProduto = page
            .locator('table tbody tr')
            .filter({ hasText: produto.nome });

        await expect(linhaProduto).toBeVisible();

        // Segundo botão da linha (Excluir)
        await linhaProduto.locator('button').nth(1).click();

        await expect(linhaProduto).toHaveCount(0);

    });

});