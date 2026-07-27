const allure = Cypress.Allure.reporter.getInterface();

describe('Deve listar todos os usuários Hora do QA', () => {
  allure.feature('Usuário');
  allure.story('Listagem');

  it('Deve encontrar o usuário Hora do QA', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('url')}/usuarios`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.usuarios).to.be.an('array');

      // Filtrando o usuário pelo nome
      const usuariosHoraDoQA = response.body.usuarios.filter(
        (u) => u.nome === 'Hora do QA'
      );

      expect(usuariosHoraDoQA.length).to.be.greaterThan(0); // garante que existe
      console.log('Usuários encontrados:', usuariosHoraDoQA);
    });
  });
});
