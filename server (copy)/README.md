#App

Enceladus

## RFs (Requisitos funcionais)

- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível o usuário autenticar com 2FA (autenticação de dois fatores);
- [ ] Deve ser possível o usuário buscar o extrato por data;
- [x] Deve ser possível cadastrar um novo usuário;
- [ ] Deve ser possível cadastrar um novo custo fixo;
- [x] Deve ser possível cadastrar um novo cliente;
- [x] Deve ser possível cadastrar um novo servico;
- [x] Deve ser possível cadastrar um novo extra;
- [ ] Deve ser possível visualizar um extrato do cliente;

## RNs (Regras de negocio)

- [ ] O administrador não deve poder se cadastrar com um e-mail duplicado;
- [ ] Os novos usuários só podem ser cadastrados por administradores;
- [ ] Somente o administrador pode cadastrar um novo cliente;
- [ ] Somente o administrador pode visualizar o extrato do cliente;

## RNS (Requisitos nao funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistido em um banco PostgreSQL;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);

## Unitary Tests

- [x] Criação de um novo usuário;
- [x] Criação de um novo cliente;
- [x] Teste de criação de um novo serviço
- [x] Teste de criação de um novo extra
- [x] Teste de autenticação de um usuário
