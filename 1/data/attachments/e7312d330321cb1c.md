# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user/login/login.spec.js >> Login >> Deve realizar login com sucesso
- Location: tests/user/login/login.spec.js:5:7

# Error details

```
TypeError: apiRequestContext.post: Invalid URL
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import 'dotenv/config';
  3  | 
  4  | test.describe('Login', () => {
  5  |   test('Deve realizar login com sucesso', async ({ request }) => {
> 6  |     const response = await request.post('/login', {
     |                                    ^ TypeError: apiRequestContext.post: Invalid URL
  7  |       headers: {
  8  |         accept: 'application/json',
  9  |         'Content-Type': 'application/json',
  10 |       },
  11 |       data: {
  12 |         email: process.env.EMAIL,
  13 |         password: process.env.PASSWORD,
  14 |       },
  15 |     });
  16 | 
  17 |     expect(response.status()).toBe(200);
  18 | 
  19 |     const body = await response.json();
  20 | 
  21 |     expect(body).toHaveProperty('message', 'Login realizado com sucesso');
  22 |     expect(body).toHaveProperty('authorization');
  23 |   });
  24 | });
```