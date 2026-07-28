import { test, expect } from '@playwright/test';
import 'dotenv/config';

// Tipagem explícita do array.
const rotas: string[] = [ 
  '',
  '/usuarios',
  '/produtos',
];

// Tipagem implícita da variável baseUrl.
const baseUrl = process.env.BASE_URL; 


// O TypeScript exige tratar a possibilidade de ela ser undefined.
if (!baseUrl) {
  throw new Error('A variável de ambiente BASE_URL não foi definida.');
}

test.describe('Health Check - ServeRest', () => {

  for (const rota of rotas) {

    test(`GET ${rota || '/'}`, async ({ request }) => {

      const response = await request.get(`${baseUrl}${rota}`);

      expect(response.status()).toBe(200);

    });

  }
});