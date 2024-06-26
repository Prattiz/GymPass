# GymPass

O GymPass é uma aplicação voltada para o gerenciamento de check-ins em academias. 
Seu objetivo principal é fornecer aos usuários a capacidade de se cadastrar, 
autenticar-se e realizar check-ins em academias próximas. 
Além disso, os usuários podem visualizar seu perfil, 
histórico de check-ins e buscar academias por nome ou proximidade. 
A aplicação impõe algumas regras de negócio, como evitar cadastros duplicados, 
limitar check-ins diários e validar a proximidade do usuário com a academia.

## Tecnologias -->

 - Node.js
 - TypeScript
 - Prisma
 - Bcryptjs
 - Fastify
 - Zod
 - Vitest
 - Super-Test
 - Dayjs
 - JWT 

## Habilidades -->

 - Testes Unitarios
 - Testes E2E
 - Git Hub Actions
 - CI


## RFs (Requisitos funcionais) ---> ✅

- [X] Deve ser possível se cadastrar
- [X] Deve ser possível se autenticar
- [X] Deve ser possível obter o perfil de um usuário logado
- [X] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [X] Deve ser possível o usuário obter o seu histórico de check-ins
- [X] Deve ser possível o usuário buscar academias próximas
- [X] Deve ser possível o usuário buscar academias pelo nome
- [X] Deve ser possível o usuário realizar check-in em uma academia
- [X] Deve ser possível validar o check-in de um usuário
- [X] Deve ser possível cadastrar uma academia

## RNs (Regras de negócio) ---> ✅

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado
- [X] O usuário não pode fazer 2 check-ins no mesmo dia
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [X] O check-in só pode ser validado até 20 minutos após ser criado
- [X] O check-in só pode ser validado por administradores
- [X] A academia só pode ser cadastrada por administradores

## RNFs (Requisitos não-funcionais) ---> ✅

- [X] A senha do usuário precisa estar criptografada
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [X] Todas listas de dados precisam estar paginadas com 20 itens por página
- [X] O usuário deve ser identificado por um JWT (JSON Web Token)