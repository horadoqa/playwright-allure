# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user/cadastro/cadastro.spec.js >> Cadastrar usuário >> Deve criar um novo usuário
- Location: tests/user/cadastro/cadastro.spec.js:5:7

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
  3  | 
  4  | test.describe('Cadastrar usuário', () => {
  5  |   test('Deve criar um novo usuário', async ({ request }) => {
  6  |     const response = await request.post(
  7  |       `${process.env.BASE_URL}/usuarios`,
  8  |       {
  9  |         headers: {
  10 |           accept: 'application/json',
  11 |           'Content-Type': 'application/json',
  12 |         },
  13 |         data: {
  14 |           nome: process.env.NOME,
  15 |           email: process.env.EMAIL,
  16 |           password: process.env.PASSWORD,
  17 |           administrador: 'true',
  18 |         },
  19 |       }
  20 |     );
  21 | 
> 22 |     expect(response.status()).toBe(201);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  23 | 
  24 |     const body = await response.json();
  25 |     expect(body).toHaveProperty('message');
  26 |   });
  27 | });
```