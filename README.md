# Playwright + Allure Report

Projeto de automação de testes utilizando **Playwright** com integração ao **Allure Report**, desenvolvido para demonstrar boas práticas na automação de testes de **API** e **Web**, organização de projeto e geração de relatórios de execução.

## Tecnologias

* Playwright
* Node.js
* Allure Report
* JavaScript
* Faker
* Dotenv

---

## Estrutura do Projeto

```text
project/
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── utils/
│   ├── services/
│   ├── fixtures/
│   └── constants/
│
├── tests/
│   ├── smoke/
│   ├── regression/
│   ├── e2e/
│   └── api/
│
├── reports/
│   ├── allure-results/
│   ├── allure-report/
│   ├── screenshots/
│   ├── videos/
│   └── traces/
│
├── playwright.config.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

---

## Pré-requisitos

Antes de iniciar, é necessário ter instalado:

* Node.js 18 ou superior
* npm
* Java (necessário para o Allure Report)

---

## Instalação

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Acesse a pasta do projeto:

```bash
cd playwright-allure
```

Instale as dependências:

```bash
npm install
```

Instale os navegadores do Playwright:

```bash
npx playwright install
```

---

## ▶Executando os testes

Executar toda a suíte:

```bash
npx playwright test
```

Executar um arquivo específico:

```bash
npx playwright test tests/api/healthcheck.spec.js
```

Executar um teste pelo nome:

```bash
npx playwright test -g "Cadastrar usuário"
```

---

## Relatórios Allure

Gerar o relatório:

```bash
allure generate reports/allure-results --clean
```

Abrir o relatório:

```bash
allure open reports/allure-report
```

---

## Cenários automatizados

### Usuários

* Criar usuário
* Consultar usuário
* Atualizar usuário
* Excluir usuário
* Login
* CRUD completo

### Produtos

* Criar produto
* Consultar produto
* Atualizar produto
* Excluir produto
* CRUD completo

### Health Check

* Validação da disponibilidade da API
* Verificação das rotas principais

---

## Recursos implementados

* Integração com Allure Report
* Organização por funcionalidades
* Uso de variáveis de ambiente (`.env`)
* Geração de dados dinâmicos com Faker
* Evidências de execução
* Estrutura preparada para Page Object Model (POM)
* Testes de API utilizando `APIRequestContext`

---

## Relatório

O relatório do projeto está disponível em:

> https://horadoqa.github.io/playwright-allure/

---

## Autor

Desenvolvido por **Hora do QA**.

Se este projeto foi útil para você, deixe uma ⭐ no repositório.
