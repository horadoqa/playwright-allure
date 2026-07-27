describe('Fluxo condicional de API - Serverest', () => {
  const baseUrl = 'https://serverest.dev';

  it('Deve testar a API e, se estiver OK, realizar login', () => {
    // 1️⃣ Teste inicial da API
    cy.request({
      method: 'GET',
      url: `${baseUrl}/usuarios`,
      failOnStatusCode: false,
    }).then((healthRes) => {
      // Interrompe o teste se a API não estiver OK
      if (healthRes.status !== 200) {
        throw new Error(`API inicial indisponível: ${healthRes.status}`);
      }

      // 2️⃣ Login (somente se a API estiver OK)
      cy.request({
        method: 'POST',
        url: `${baseUrl}/login`,
        body: {
          email: 'fulano@qa.com',
          password: 'teste',
        },
        failOnStatusCode: false,
      }).then((loginRes) => {
        expect(loginRes.status).to.eq(200);
        expect(loginRes.body).to.have.property('authorization');
      });
    });
  });
});
