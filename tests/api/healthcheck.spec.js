import { test, expect } from '@playwright/test';
import 'dotenv/config';

const rotas = [
  '',
  '/usuarios',
  '/produtos'
];

test.describe('Health Check - ServeRest', () => {

  for (const rota of rotas) {

    test(`GET ${rota || '/'}`, async ({ request }) => {

      const response = await request.get(
        `${process.env.BASE_URL}${rota}`
      );

      expect(response.status()).toBe(200);

    });

  }

});