# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user/cadastro/cadastro.spec.js >> Cadastrar usuário >> Deve criar um novo usuário
- Location: tests/user/cadastro/cadastro.spec.js:6:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 400
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import 'dotenv/config';
  3  | import { setAllureFeature } from '../../../utils/allure.js';
  4  | 
  5  | test.describe('Cadastrar usuário', () => {
  6  |   test('Deve criar um novo usuário', async ({ request }) => {
  7  | 
  8  |     await setAllureFeature('Usuário', 'Cadastrar usuário');
  9  | 
  10 |     const response = await request.post(
  11 |       `${process.env.BASE_URL}/usuarios`,
  12 |       {
  13 |         headers: {
  14 |           accept: 'application/json',
  15 |           'Content-Type': 'application/json',
  16 |         },
  17 |         data: {
  18 |           nome: process.env.NOME,
  19 |           email: process.env.EMAIL,
  20 |           password: process.env.PASSWORD,
  21 |           administrador: 'true',
  22 |         },
  23 |       }
  24 |     );
  25 | 
  26 |     const body = await response.json();
  27 | 
  28 |     // Exibe o erro da API caso o status não seja o esperado
  29 |     if (response.status() !== 201) {
  30 |       console.error('Status recebido:', response.status());
  31 |       console.error('Resposta da API:', body);
  32 |     }
  33 | 
> 34 |     expect(response.status()).toBe(201);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  35 | 
  36 |     expect(body).toHaveProperty('message');
  37 |   });
  38 | });
```