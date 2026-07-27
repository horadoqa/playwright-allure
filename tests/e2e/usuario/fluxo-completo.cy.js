const allure = Cypress.Allure.reporter.getInterface();

describe('Cadastro, Login, Atualização e Exclusão', () => {

  allure.feature('Usuário');
  allure.story('Fluxo Completo');
  
  it('Fluxo completo usuário', () => {

    // 1️⃣ Cadastro do usuário
    const emailUnico = `horadoqa${Date.now()}@qa.com.br`;

    cy.request({
      method: 'POST',
      url: `${Cypress.env('url')}/usuarios`,
      body: {
        nome: "Hora do QA",
        email: emailUnico,
        password: Cypress.env('userPassword'),
        administrador: "true"
      }
    }).then((responseCadastro) => {

      // 📌 EXPECTS DO CADASTRO
      expect(responseCadastro.status).to.eq(201);
      expect(responseCadastro.body).to.have.property('message', 'Cadastro realizado com sucesso');
      expect(responseCadastro.body).to.have.property('_id');

      const userId = responseCadastro.body._id;

      // 2️⃣ Login do usuário
      cy.request({
        method: 'POST',
        url: `${Cypress.env('url')}/login`,
        body: {
          email: emailUnico,
          password: Cypress.env('userPassword')
        }
      }).then((responseLogin) => {

        // 📌 EXPECTS DO LOGIN
        expect(responseLogin.status).to.eq(200);
        expect(responseLogin.body).to.have.property('message', 'Login realizado com sucesso');
        expect(responseLogin.body).to.have.property('authorization');

        // 3️⃣ Atualizar nome do usuário via PUT
        cy.request({
          method: 'PUT',
          url: `${Cypress.env('url')}/usuarios/${userId}`,
          body: {
            nome: "Hora do QA",
            email: emailUnico,
            password: Cypress.env('userPassword'),
            administrador: "true"
          }
        }).then((responsePut) => {

          // 📌 EXPECTS DO PUT
          expect(responsePut.status).to.eq(200);
          expect(responsePut.body).to.have.property('message', 'Registro alterado com sucesso');

          // 4️⃣ Deletar usuário cadastrado → DELETE
          cy.request({
            method: 'DELETE',
            url: `${Cypress.env('url')}/usuarios/${userId}`
          }).then((responseDelete) => {

            // 📌 EXPECTS DO DELETE
            expect(responseDelete.status).to.eq(200);
            expect(responseDelete.body).to.have.property('message', 'Registro excluído com sucesso');

          });

        });

      });

    });

  });

});
