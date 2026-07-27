# Começando o projeto do ZERO

1. Criar o projeto

Crie a pasta e inicialize o Node.js:

```bash
mkdir project
cd project

npm init -y
```

2. Instalar o Playwright

Instale o Playwright:

```bash
npm init playwright@latest

Do you want to use TypeScript or JavaScript?
▸ JavaScript

Where to put your end-to-end tests? 
▸ e2e

Add a GitHub Actions workflow? (Y/n) 
▸ true

Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) 
▸ true

Install Playwright operating system dependencies (requires sudo / root - can be done manually via 'sudo npx playwright install-deps')? (y/N) ▸ false

```

```bash
✔ Success! Created a Playwright Test project at /home/rfahham/projetos/playwright-allure

Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test
```


3. Reorganizar a estrutura

Depois da instalação, deixe o projeto assim:

```bash
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

4. Instalar dependências úteis

## Dotenv

```bash
npm install dotenv
```

## Allure

```bash
npm install -D allure-playwright allure-commandline
```

## Faker (para geração de dados)

```bash
npm install @faker-js/faker
```

## Axios (para testes de API ou serviços)

```bash
npm install axios
```

## allure-playwright

```bash
npm install -D allure-playwright allure-commandline
```

```bash
allure generate reports/allure-results -o reports/allure-report --clean
```

Execute o teste

```bash
npx playwright test
```

Para abrir o relatório:

```bash
npx playwright show-report
```
