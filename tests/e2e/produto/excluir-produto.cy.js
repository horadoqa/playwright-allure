const allure = Cypress.Allure.reporter.getInterface();

describe('Apagar Produto', () => {
  
  allure.feature('Produto');
  allure.story('Excluir de produto');

  it('Cadastra usuário, loga, cria produto e deleta produto', () => {
  
      // 1️⃣ Cadastro do usuário
      const emailUnico = `horadoqa${Date.now()}@qa.com.br`
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
        expect(responseCadastro.status).to.eq(201)
        expect(responseCadastro.body).to.have.property('message', 'Cadastro realizado com sucesso')
        expect(responseCadastro.body).to.have.property('_id')
  
        // 2️⃣ Login do usuário
        cy.request({
          method: 'POST',
          url: `${Cypress.env('url')}/login`,
          body: {
            email: emailUnico,
            password: Cypress.env('userPassword')
          }
        }).then((responseLogin) => {
          expect(responseLogin.status).to.eq(200)
          expect(responseLogin.body).to.have.property('message', 'Login realizado com sucesso')
          expect(responseLogin.body).to.have.property('authorization')
  
          const token = responseLogin.body.authorization
  
          // 3️⃣ Cadastro do produto
          const nomeProdutoUnico = `Logitech MX Vertical - ${Date.now()}`
          cy.request({
            method: 'POST',
            url: `${Cypress.env('url')}/produtos`,
            headers: {
              Authorization: token
            },
            body: {
              nome: nomeProdutoUnico,
              preco: 470,
              descricao: "Mouse",
              quantidade: 381
            }
          }).then((responseProduto) => {
            expect(responseProduto.status).to.eq(201)
            expect(responseProduto.body).to.have.property('message', 'Cadastro realizado com sucesso')
            expect(responseProduto.body).to.have.property('_id')
  
            const produtoId = responseProduto.body._id
  
            // 4️⃣ Deleção do produto
            cy.request({
              method: 'DELETE',
              url: `${Cypress.env('url')}/produtos/${produtoId}`,
              headers: {
                Authorization: token
              }
            }).then((responseDelete) => {
              expect(responseDelete.status).to.eq(200)
              expect(responseDelete.body).to.have.property('message', 'Registro excluído com sucesso')
            })
  
          })
  
        })
  
      })
  
    })
  
  })
  