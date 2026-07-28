# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/usuarios/crud.spec.js >> CRUD Usuário >> DELETE - Deve excluir usuário
- Location: tests/e2e/usuarios/crud.spec.js:112:9

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('table tbody tr').filter({ hasText: 'Doreen.Hickle58@yahoo.com' })
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('table tbody tr').filter({ hasText: 'Doreen.Hickle58@yahoo.com' })
    14 × locator resolved to 1 element
       - unexpected value "1"

```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - navigation [ref=f1e4]:
    - generic [ref=f1e5]:
      - list [ref=f1e7]:
        - listitem [ref=f1e8]:
          - generic [ref=f1e9] [cursor=pointer]: Home
        - listitem [ref=f1e10]:
          - generic [ref=f1e11] [cursor=pointer]: Cadastrar Usuários
        - listitem [ref=f1e12]:
          - generic [ref=f1e13] [cursor=pointer]: Listar Usuários
        - listitem [ref=f1e14]:
          - generic [ref=f1e15] [cursor=pointer]: Cadastrar Produtos
        - listitem [ref=f1e16]:
          - generic [ref=f1e17] [cursor=pointer]: Listar Produtos
        - listitem [ref=f1e18]:
          - generic [ref=f1e19] [cursor=pointer]: Relatórios
      - button "Logout" [ref=f1e21] [cursor=pointer]
  - generic [ref=f1e22]:
    - heading "Lista dos usuários" [level=1] [ref=f1e23]
    - separator [ref=f1e24]
    - paragraph [ref=f1e25]:
      - table [ref=f1e26]:
        - rowgroup [ref=f1e27]:
          - row [ref=f1e28]:
            - columnheader "Nome" [ref=f1e29]
            - columnheader "Email" [ref=f1e30]
            - columnheader "Senha" [ref=f1e31]
            - columnheader "Administrador" [ref=f1e32]
            - columnheader "Ações" [ref=f1e33]
        - rowgroup [ref=f1e34]:
          - row [ref=f1e35]:
            - cell "Fulano da Silva" [ref=f1e36]
            - cell "fulano@qa.com" [ref=f1e37]
            - cell "teste" [ref=f1e38]
            - cell "true" [ref=f1e39]
            - cell [ref=f1e40]:
              - generic [ref=f1e41]:
                - button "Editar" [ref=f1e42] [cursor=pointer]
                - button "Excluir" [ref=f1e43] [cursor=pointer]
          - row [ref=f1e44]:
            - cell "Jéssica Pimentel Testes" [ref=f1e45]
            - cell "jfcmpteste1785273137@qa.com.br" [ref=f1e46]
            - cell "1234567" [ref=f1e47]
            - cell "true" [ref=f1e48]
            - cell [ref=f1e49]:
              - generic [ref=f1e50]:
                - button "Editar" [ref=f1e51] [cursor=pointer]
                - button "Excluir" [ref=f1e52] [cursor=pointer]
          - row [ref=f1e53]:
            - cell "Hora do QA - Deangelo" [ref=f1e54]
            - cell "Doreen.Hickle58@yahoo.com" [ref=f1e55]
            - cell "mVHxS0dwFj" [ref=f1e56]
            - cell "true" [ref=f1e57]
            - cell [ref=f1e58]:
              - generic [ref=f1e59]:
                - button "Editar" [ref=f1e60] [cursor=pointer]
                - button "Excluir" [active] [ref=f1e61] [cursor=pointer]
          - row [ref=f1e62]:
            - cell "Monk D Luffe" [ref=f1e63]
            - cell "monkdluffe01@qa.com.br" [ref=f1e64]
            - cell "teste1234" [ref=f1e65]
            - cell "true" [ref=f1e66]
            - cell [ref=f1e67]:
              - generic [ref=f1e68]:
                - button "Editar" [ref=f1e69] [cursor=pointer]
                - button "Excluir" [ref=f1e70] [cursor=pointer]
          - row [ref=f1e71]:
            - cell "Antonio Frare Jr" [ref=f1e72]
            - cell "junior69697@mail.com" [ref=f1e73]
            - cell "1234" [ref=f1e74]
            - cell "false" [ref=f1e75]
            - cell [ref=f1e76]:
              - generic [ref=f1e77]:
                - button "Editar" [ref=f1e78] [cursor=pointer]
                - button "Excluir" [ref=f1e79] [cursor=pointer]
          - row [ref=f1e80]:
            - cell "Leigh Oberbrunner" [ref=f1e81]
            - cell "Ramon.Harvey@gmail.com" [ref=f1e82]
            - cell "Pass123@" [ref=f1e83]
            - cell "true" [ref=f1e84]
            - cell [ref=f1e85]:
              - generic [ref=f1e86]:
                - button "Editar" [ref=f1e87] [cursor=pointer]
                - button "Excluir" [ref=f1e88] [cursor=pointer]
```

# Test source

```ts
  43  |     async function login(page, usuario) {
  44  | 
  45  |         await page.goto(process.env.E2E_URL);
  46  | 
  47  |         await page.locator('#email').fill(usuario.email);
  48  |         await page.locator('#password').fill(usuario.password);
  49  | 
  50  | 
  51  |         await Promise.all([
  52  |             page.waitForURL(/admin\/home/),
  53  |             page.locator('form button').click()
  54  |         ]);
  55  | 
  56  |     }
  57  | 
  58  | 
  59  |     test('CREATE - Deve validar usuário criado', async ({ page }) => {
  60  | 
  61  |         await login(page, usuario);
  62  | 
  63  |         await expect(page).toHaveURL(/admin\/home/);
  64  | 
  65  |         await expect(
  66  |             page.getByText(usuario.nome)
  67  |         ).toBeVisible();
  68  | 
  69  |     });
  70  | 
  71  | 
  72  |     test('LOGIN - Deve realizar login', async ({ page }) => {
  73  | 
  74  |         await login(page, usuario);
  75  | 
  76  |         await expect(page).toHaveURL(/admin\/home/);
  77  | 
  78  |     });
  79  | 
  80  | 
  81  |     test('READ - Deve listar usuário cadastrado', async ({ page }) => {
  82  | 
  83  |         await login(page, usuario);
  84  | 
  85  | 
  86  |         await page.goto(
  87  |             'https://front.serverest.dev/admin/listarusuarios'
  88  |         );
  89  | 
  90  | 
  91  |         const linhaUsuario = page
  92  |             .locator('table tbody tr')
  93  |             .filter({ hasText: usuario.email });
  94  | 
  95  | 
  96  |         await expect(linhaUsuario).toBeVisible();
  97  | 
  98  |     });
  99  | 
  100 | 
  101 |     test('UPDATE - Deve alterar informações do usuário', async () => {
  102 | 
  103 |         console.log(
  104 |             'Ainda não foi implementado o UPDATE no FrontEnd'
  105 |         );
  106 | 
  107 |         test.skip();
  108 | 
  109 |     });
  110 | 
  111 | 
  112 |     test('DELETE - Deve excluir usuário', async ({ page }) => {
  113 | 
  114 |         await login(page, usuario);
  115 | 
  116 | 
  117 |         await page.goto(
  118 |             'https://front.serverest.dev/admin/listarusuarios'
  119 |         );
  120 | 
  121 | 
  122 |         const linhaUsuario = page
  123 |             .locator('table tbody tr')
  124 |             .filter({ hasText: usuario.email });
  125 | 
  126 | 
  127 |         await expect(linhaUsuario).toBeVisible();
  128 | 
  129 | 
  130 |         await linhaUsuario
  131 |             .getByRole('button', { name: 'Excluir' })
  132 |             .click();
  133 | 
  134 | 
  135 |         await page.waitForTimeout(2000);
  136 | 
  137 | 
  138 |         const usuarioNaTabela = page
  139 |             .locator('table tbody tr')
  140 |             .filter({ hasText: usuario.email });
  141 | 
  142 | 
> 143 |         await expect(usuarioNaTabela).toHaveCount(0);
      |                                       ^ Error: expect(locator).toHaveCount(expected) failed
  144 | 
  145 |     });
  146 | 
  147 | });
```