<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

ChefDesk é uma plataforma de backoffice para personal chefs, criada para centralizar a gestão de clientes, cardápios, reservas, orçamentos e eventos em um só lugar. Simples, organizada e eficiente, ajuda o chef a cuidar da operação enquanto foca no que faz melhor: criar experiências gastronômicas memoráveis.

## 🔐 Autenticação e Autorização

O sistema implementa autenticação baseada em JWT (JSON Web Tokens) para proteger rotas administrativas:

- **Todos os usuários são admins** por padrão
- **Rotas administrativas protegidas** com JWT nas operações de criação e edição
- **Endpoints públicos** para consultar dados (GET)
- **Login** com username ou email

**Documentação completa**: Veja [AUTH_README.md](AUTH_README.md)

## Project setup

```bash
# Instalar dependências
$ npm install

# Configurar variáveis de ambiente
# Criar arquivo .env (copiar de .env.example se disponível)
# Adicionar: MONGO_URI, PORT e JWT_SECRET

# Criar primeiro usuário (seed)
$ npm run seed:user
```

**Credenciais padrão** (após seed):

- Username: `admin`
- Email: `admin@chefdesk.com`
- Senha: `admin123456` (⚠️ Altere após login)

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 📋 Endpoints Principais

### Autenticação

- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Login com email/username

### Categorias Menu (Requer JWT em POST)

- `POST /categorias-menu` - Criar categoria ⚠️
- `GET /categorias-menu` - Listar categorias

### Pratos Cardápio (Requer JWT em POST/PATCH/DELETE)

- `POST /pratos-cardapio` - Criar prato ⚠️
- `GET /pratos-cardapio` - Listar pratos
- `GET /pratos-cardapio/:id` - Obter prato
- `PATCH /pratos-cardapio/:id` - Editar prato ⚠️
- `DELETE /pratos-cardapio/:id` - Deletar prato ⚠️

### Personalizações Serviço (Requer JWT em POST/PATCH/DELETE)

- `POST /personalizacoes-servico` - Criar personalização ⚠️
- `GET /personalizacoes-servico` - Listar personalizações
- `PATCH /personalizacoes-servico/:id` - Editar personalização ⚠️
- `DELETE /personalizacoes-servico/:id` - Deletar personalização ⚠️

### Pricing (Requer JWT em POST/PATCH/DELETE)

- `POST /calculate` - Criar cálculo de preço ⚠️
- `GET /calculate` - Listar cálculos
- `PATCH /calculate/:id` - Editar cálculo ⚠️
- `DELETE /calculate/:id` - Deletar cálculo ⚠️

⚠️ = Requer token JWT válido

## 🧪 Testando com Swagger

1. Acesse `http://localhost:3000/api`
2. Clique no botão **"Authorize"** (cadeado 🔒)
3. Cole o token no formato: `Bearer SEU_TOKEN_JWT`
4. Teste os endpoints protegidos

## 📝 Variáveis de Ambiente

```env
# Banco de dados
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/database

# Servidor
PORT=3000

# Autenticação JWT
JWT_SECRET=sua-chave-secreta-super-segura
```

⚠️ **Em produção**: Altere `JWT_SECRET` para uma chave forte!

## Scripts Disponíveis

````bash
# Tests
$ npm run test              # unit tests
$ npm run test:e2e          # e2e tests
$ npm run test:cov          # test coverage

# Seed
$ npm run seed:pratos       # Seed de pratos cardápio
$ npm run seed:user         # Seed de usuário admin

# Desenvolvimento
$ n🚀 Guia Rápido de Início

### 1. Setup Inicial
```bash
npm install
npm run seed:user
npm run start:dev
````

### 2. Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -📚 Documentação

- [Autenticação e Autorização](AUTH_README.md) - Guia completo de autenticação JWT
- [NestJS Documentation](https://docs.nestjs.com) - Framework documentation
- [API Swagger](http://localhost:3000/api) - Swagger UI (quando servidor estiver rodando)

## 🏗️ Estrutura do Projeto

```

src/
├── auth/ # Módulo de autenticação JWT
├── users/ # Módulo de usuários
├── categorias-menu/ # Gestão de categorias
├── pratos-cardapio/ # Gestão de pratos
├── personalizacoes-servico/ # Gestão de personalizações
├── pricing/ # Cálculos de preço
├── clientes/ # Gestão de clientes
├── leads/ # Gestão de leads
├── orcamentos/ # Gestão de orçamentos
├── orcamento-draft/ # Rascunho de orçamentos
└── notifications/ # Sistema de notificações

```

## Support

Para suporte e documentação, consulte:

- [NestJS Discord](https://discord.gg/G7Qnnhy) - Comunidade NestJS
- [NestJS Docs](https://docs.nestjs.com) - Documentação oficial
- [Autenticação JWT](AUTH_README.md) - Documentação local de autenticação

## License

ChefDesk é MIT licensed
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
