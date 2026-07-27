const allure = Cypress.Allure.reporter.getInterface();

describe('Login Inválido', () => {
  
  before(() => {
    allure.feature('Usuário');
    allure.story('Login');
  });
  
  it('Não deve realizar login', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('url')}/login`,
      failOnStatusCode: false,   // importante para permitir 401
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: {
        email: Cypress.env('emailInvalido'),
        password: Cypress.env('passwordInvalido')
      }
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Email e/ou senha inválidos');
    });
  });
});
