import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { faker } from '@faker-js/faker';

test.describe.serial('CRUD Usuário', () => {

    let usuario;


    test.beforeAll(async ({ request }) => {

        usuario = {
            nome: `Hora do QA - ${faker.person.firstName()}`,
            email: faker.internet.email(),
            password: faker.string.alphanumeric(10)
        };


        const response = await request.post(
            'https://serverest.dev/usuarios',
            {
                data: {
                    nome: usuario.nome,
                    email: usuario.email,
                    password: usuario.password,
                    administrador: 'true'
                }
            }
        );


        expect(response.status()).toBe(201);

        const body = await response.json();

        usuario.id = body._id;

        console.log('Usuário criado:', usuario);

    });


    async function login(page, usuario) {

        await page.goto(process.env.E2E_URL);

        await page.locator('#email').fill(usuario.email);
        await page.locator('#password').fill(usuario.password);


        await Promise.all([
            page.waitForURL(/admin\/home/),
            page.locator('form button').click()
        ]);

    }


    test('CREATE - Deve validar usuário criado', async ({ page }) => {

        await login(page, usuario);

        await expect(page).toHaveURL(/admin\/home/);

        await expect(
            page.getByText(usuario.nome)
        ).toBeVisible();

    });


    test('LOGIN - Deve realizar login', async ({ page }) => {

        await login(page, usuario);

        await expect(page).toHaveURL(/admin\/home/);

    });


    test('READ - Deve listar usuário cadastrado', async ({ page }) => {

        await login(page, usuario);


        await page.goto(
            'https://front.serverest.dev/admin/listarusuarios'
        );


        const linhaUsuario = page
            .locator('table tbody tr')
            .filter({ hasText: usuario.email });


        await expect(linhaUsuario).toBeVisible();

    });


    test('UPDATE - Deve alterar informações do usuário', async () => {

        console.log(
            'Ainda não foi implementado o UPDATE no FrontEnd'
        );

        test.skip();

    });


    // test('DELETE - Deve excluir usuário', async ({ page }) => {

    //     await login(page, usuario);


    //     await page.goto(
    //         'https://front.serverest.dev/admin/listarusuarios'
    //     );


    //     const linhaUsuario = page
    //         .locator('table tbody tr')
    //         .filter({ hasText: usuario.email });


    //     await expect(linhaUsuario).toBeVisible();


    //     await linhaUsuario
    //         .getByRole('button', { name: 'Excluir' })
    //         .click();


    //     await page.waitForTimeout(2000);


    //     const usuarioNaTabela = page
    //         .locator('table tbody tr')
    //         .filter({ hasText: usuario.email });


    //     await expect(usuarioNaTabela).toHaveCount(0);

    // });

});