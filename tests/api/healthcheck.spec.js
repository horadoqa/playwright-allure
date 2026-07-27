import { test, expect } from '@playwright/test';
import 'dotenv/config';

test.describe('HealthCheck', () => {
  test('should return 200 OK when accessing serverest.dev', async ({ request }) => {
    const response = await request.get(process.env.BASE_URL);

    expect(response.status()).toBe(200);
  });
});