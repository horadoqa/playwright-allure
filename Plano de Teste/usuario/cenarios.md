# 📘 **PLANO DE TESTE — Módulo de Usuários (Serverest.dev)**

## 🔰 **1. Objetivo**

Validar se as funcionalidades relacionadas ao recurso **/usuarios** do Serverest.dev estão funcionando conforme esperado, garantindo que operações de **criação, consulta, edição, login e exclusão** sejam realizadas corretamente.

---

## 🔍 **2. Escopo**

Cobrir as operações disponibilizadas pela API:

* **POST /usuarios** — Criar usuário
* **GET /usuarios** — Listar usuários
* **GET /usuarios/{id}** — Buscar usuário por ID
* **PUT /usuarios/{id}** — Atualizar usuário
* **DELETE /usuarios/{id}** — Excluir usuário
* **POST /login** — Login de usuário

---

## 🚫 **3. Fora do Escopo**

* Testes de performance
* Testes de segurança avançados (SQL Injection, XSS, etc.)
* Testes do módulo de produtos/carrinhos

---

## 🧩 **4. Pré-Requisitos**

* Acesso ativo ao ambiente Serverest.dev
* Ferramentas para requisições: Cypress, Postman ou Insomnia
* Variáveis de ambiente para **email** e **senha** quando aplicável
* Conexão com a internet

---

# 🧪 **5. Cenários de Teste (Detalhados)**

---

# ✅ **5.1. Criar Usuário (POST /usuarios)**

### **TC001 — Criar usuário válido**

**Objetivo:** Validar criação de usuário com dados válidos.
**Entrada:**

* nome: válido
* email único
* password válido
* administrador: "true"

**Resultado esperado:**

* HTTP 201
* message: "Cadastro realizado com sucesso"
* Retornar `_id`

---

### **TC002 — Criar usuário com email já existente**

**Objetivo:** Garantir que a API não permite duplicação de emails
**Entrada:** email já cadastrado
**Resultado esperado:**

* HTTP 400
* message: "Este email já está sendo usado"

---

### **TC003 — Criar usuário sem email**

**Entrada:** email ausente
**Resultado esperado:**

* HTTP 400
* Mensagem de erro adequada

---

### **TC004 — Criar usuário com formatos inválidos**

Validar:

* email sem @
* senha vazia
* administrador diferente de "true" ou "false"

Resultado:

* HTTP 400 e mensagem correspondente

---

# 🔎 **5.2. Consultar Usuários (GET /usuarios)**

### **TC005 — Listar todos os usuários**

**Resultado esperado:**

* HTTP 200
* Lista com campo `quantidade`
* Array `usuarios`

---

### **TC006 — Buscar usuário por ID existente**

**Resultado:**

* HTTP 200
* Retorna dados corretos

---

### **TC007 — Buscar usuário por ID inexistente**

**Resultado:**

* HTTP 400
* message: "Usuário não encontrado"

---

# ✏️ **5.3. Atualizar Usuário (PUT /usuarios/{id})**

### **TC008 — Atualizar usuário válido**

**Resultado:**

* HTTP 200
* message: "Registro alterado com sucesso"

---

### **TC009 — Atualizar usuário com email já cadastrado**

**Resultado:**

* HTTP 400
* message: "Este email já está sendo usado"

---

### **TC010 — Atualizar usuário inexistente**

**Resultado:**

* HTTP 201
* message: "Cadastro realizado com sucesso"
  *(Comportamento atual da API: cria caso não exista)*

---

# ❌ **5.4. Deletar Usuário (DELETE /usuarios/{id})**

### **TC011 — Deletar usuário válido**

**Resultado:**

* HTTP 200
* message: "Registro excluído com sucesso"

---

### **TC012 — Deletar usuário inexistente**

**Resultado:**

* HTTP 200
* message: "Nenhum registro excluído"

---

# 🔐 **5.5. Login (POST /login)**

### **TC013 — Login válido**

**Entrada:** email + password corretos
**Resultado:**

* HTTP 200
* message: "Login realizado com sucesso"
* authorization: token JWT

---

### **TC014 — Login com senha incorreta**

Resultado esperado:

* HTTP 401
* message: "Email e/ou senha inválidos"

---

### **TC015 — Login com usuário inexistente**

Resultado:

* HTTP 400
* message: "Email e/ou senha inválidos"

---

# 🔁 **5.6. Cenários Combinados**

### **TC016 — Criar usuário → Login**

Garantir que o usuário criado consegue logar imediatamente.

---

### **TC017 — Criar usuário → Deletar usuário → Tentar logar**

* Login deve falhar após exclusão

---

### **TC018 — Criar usuário → Atualizar email → Fazer login com email antigo e novo**

* Login com email antigo: deve falhar
* Login com email atualizado: deve funcionar

---

# 📊 **6. Critérios de Aceitação**

* Todos os testes críticos devem passar
* Nenhum cenário deve retornar erros inesperados
* Estrutura de resposta deve seguir JSON padronizado
* Não deve ser possível cadastrar emails duplicados

---

# ⚙️ **7. Critérios de Aprovação**

O módulo de usuários é aprovado se:

✔ 100% dos testes principais passam
✔ Respostas seguem o contrato da API
✔ Erros retornam mensagens claras
✔ Login e cadastro funcionam ponta a ponta

---

# 📁 **8. Evidências**

* Logs do Cypress ou Postman
* Prints dos testes
* JSON de entrada e saída

---

