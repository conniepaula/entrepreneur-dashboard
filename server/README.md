# 🍕 pizza.shop API

Food delivery app (aka. iFood/Uber Eats) back-end built with TypeScript, Drizzle a ElysiaJS.

> 🔥 This project aims to keep runtime agnostic, this means it should work on Bun, Node, Cloudflare Workers or any Web Standard API compatible runtime.

## Running

This project depends on Docker to setup database. With Docker installed, clone the project, install  dependencies, setup Docker containers and run the application.

> You must also run migrations to create database tables and run the seed to populate the database with fake data.

```sh
bun i
docker compose up -d
bun migrate
bun seed
bun dev
```

## Features

> The **summary** of the features are listed below. All the features contains E2E tests.

- it should allow business to register
- it should allow business representatives to log in
- it should allow clients to register
- it should allow appointments to be booked
- it should allow representatives to edit list of services provided by business
- it should be able to manage the business evaluations
- it should be able to leave an evaluation
- it should allow appointments to be managed
- it should allow updates to the public business profile
- it should allow opening and closing times to be set
- it should allow business metrics to be listed