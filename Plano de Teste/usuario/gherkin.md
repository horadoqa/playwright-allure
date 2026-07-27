# 📘 **Gherkin – Cenários de Usuários Serverest.dev**

```gherkin
Feature: Gerenciamento de usuários no Serverest.dev
  Como um QA ou desenvolvedor
  Quero testar a API de usuários
  Para garantir que cadastro, login, atualização e exclusão funcionem corretamente

# =========================================
# Cadastro de Usuários
# =========================================
Scenario: Criar usuário válido
  Given que possuo um email único e senha válida
  When eu enviar uma requisição POST para "/usuarios" com nome, email, senha e administrador
  Then o status da resposta deve ser 201
  And a mensagem deve ser "Cadastro realizado com sucesso"
  And o retorno deve conter "_id"

Scenario: Criar usuário com email já existente
  Given que possuo um email já cadastrado
  When eu enviar uma requisição POST para "/usuarios"
  Then o status da resposta deve ser 400
  And a mensagem deve ser "Este email já está sendo usado"

Scenario: Criar usuário sem email
  Given que não informo o campo email
  When eu enviar uma requisição POST para "/usuarios"
  Then o status da resposta deve ser 400
  And deve retornar mensagem de erro apropriada

Scenario: Criar usuário com dados inválidos
  Given que envio email inválido ou senha vazia ou administrador inválido
  When eu enviar uma requisição POST para "/usuarios"
  Then o status da resposta deve ser 400
  And deve retornar mensagem de erro apropriada

# =========================================
# Consulta de Usuários
# =========================================
Scenario: Listar todos os usuários
  When eu enviar uma requisição GET para "/usuarios"
  Then o status da resposta deve ser 200
  And o retorno deve conter "quantidade" e "usuarios"

Scenario: Buscar usuário por ID existente
  Given que possuo um usuário cadastrado
  When eu enviar uma requisição GET para "/usuarios/{id}"
  Then o status da resposta deve ser 200
  And o retorno deve conter os dados corretos do usuário

Scenario: Buscar usuário por ID inexistente
  Given que informo um ID inválido
  When eu enviar uma requisição GET para "/usuarios/{id}"
  Then o status da resposta deve ser 400
  And a mensagem deve ser "Usuário não encontrado"

# =========================================
# Atualização de Usuários
# =========================================
Scenario: Atualizar usuário existente com dados válidos
  Given que possuo um usuário cadastrado
  When eu enviar uma requisição PUT para "/usuarios/{id}" com novos dados válidos
  Then o status da resposta deve ser 200
  And a mensagem deve ser "Registro alterado com sucesso"

Scenario: Atualizar usuário com email duplicado
  Given que possuo outro usuário com email existente
  When eu enviar uma requisição PUT para "/usuarios/{id}" alterando para email duplicado
  Then o status da resposta deve ser 400
  And a mensagem deve ser "Este email já está sendo usado"

# =========================================
# Exclusão de Usuários
# =========================================
Scenario: Deletar usuário existente
  Given que possuo um usuário cadastrado
  When eu enviar uma requisição DELETE para "/usuarios/{id}"
  Then o status da resposta deve ser 200
  And a mensagem deve ser "Registro excluído com sucesso"

Scenario: Deletar usuário inexistente
  Given que informo um ID inválido
  When eu enviar uma requisição DELETE para "/usuarios/{id}"
  Then o status da resposta deve ser 200
  And a mensagem deve ser "Nenhum registro excluído"

# =========================================
# Login de Usuários
# =========================================
Scenario: Login com usuário válido
  Given que possuo um usuário cadastrado
  When eu enviar uma requisição POST para "/login" com email e senha corretos
  Then o status da resposta deve ser 200
  And a mensagem deve ser "Login realizado com sucesso"
  And deve retornar token de autorização

Scenario: Login com senha incorreta
  Given que possuo um usuário cadastrado
  When eu enviar uma requisição POST para "/login" com senha incorreta
  Then o status da resposta deve ser 401
  And a mensagem deve ser "Email e/ou senha inválidos"

Scenario: Login com usuário inexistente
  Given que informo email inexistente
  When eu enviar uma requisição POST para "/login"
  Then o status da resposta deve ser 400
  And a mensagem deve ser "Email e/ou senha inválidos"

# =========================================
# Fluxos Combinados
# =========================================
Scenario: Criar usuário e fazer login
  Given que possuo um email único e senha válida
  When eu criar o usuário
  And eu realizar login com o mesmo usuário
  Then o login deve ser bem-sucedido
  And deve retornar token de autorização

Scenario: Criar usuário, deletar e tentar login
  Given que possuo um usuário cadastrado
  When eu deletar o usuário
  And eu tento logar com o mesmo usuário
  Then o login deve falhar
  And a mensagem deve ser "Email e/ou senha inválidos"
```

---

Esses cenários **cobrem**:

* Cadastro (positivo e negativo)
* Consulta (todos, por ID)
* Atualização (válida e inválida)
* Exclusão
* Login (válido, senha incorreta, usuário inexistente)
* Fluxos combinados ponta a ponta

---

