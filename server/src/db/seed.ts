

import {
  authLinks,
  evaluations,
  appointments,
  services,
  businesses,
  appointmentDetails,
  users,
} from "./schema";
import { faker } from "@faker-js/faker";
import { db } from "./connection";
import chalk from "chalk";
import { createId } from "@paralleldrive/cuid2";

/**
 * Reset database
 */
await db.delete(appointmentDetails);
await db.delete(appointments);
await db.delete(evaluations);
await db.delete(services);
await db.delete(businesses);
await db.delete(authLinks);
await db.delete(users);

console.log(chalk.yellow("✔ Database reset"));

/**
 * Create clients
 */
const [client1, client2] = await db
  .insert(users)
  .values([
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: "client",
    },
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: "client",
    },
  ])
  .returning();

console.log(chalk.yellow("✔ Created clients"));

/**
 * Create business representative
 */
const [representative] = await db
  .insert(users)
  .values({
    name: faker.person.fullName(),
    email: "conniedpaula@gmail.com",
    role: "admin",
  })
  .returning();

console.log(chalk.yellow("✔ Created administrator"));

/**
 * Create business
 */
const [business] = await db
  .insert(businesses)
  .values({
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    representativeId: representative.id,
  })
  .returning();

console.log(chalk.yellow("✔ Created business"));

/**
 * Create services
 */
const availableServices = await db
  .insert(services)
  .values([
    {
      name: faker.commerce.productName(),
      priceInCents: Number(
        faker.commerce.price({
          min: 190,
          max: 490,
          dec: 0,
        }),
      ),
      businessId: business.id,
      description: faker.commerce.productDescription(),
    },
    {
      name: faker.commerce.productName(),
      priceInCents: Number(
        faker.commerce.price({
          min: 190,
          max: 490,
          dec: 0,
        }),
      ),
      businessId: business.id,
      description: faker.commerce.productDescription(),
    },
    {
      name: faker.commerce.productName(),
      priceInCents: Number(
        faker.commerce.price({
          min: 190,
          max: 490,
          dec: 0,
        }),
      ),
      businessId: business.id,
      description: faker.commerce.productDescription(),
    },
    {
      name: faker.commerce.productName(),
      priceInCents: Number(
        faker.commerce.price({
          min: 190,
          max: 490,
          dec: 0,
        }),
      ),
      businessId: business.id,
      description: faker.commerce.productDescription(),
    },
    {
      name: faker.commerce.productName(),
      priceInCents: Number(
        faker.commerce.price({
          min: 190,
          max: 490,
          dec: 0,
        }),
      ),
      businessId: business.id,
      description: faker.commerce.productDescription(),
    },
    {
      name: faker.commerce.productName(),
      priceInCents: Number(
        faker.commerce.price({
          min: 190,
          max: 490,
          dec: 0,
        }),
      ),
      businessId: business.id,
      description: faker.commerce.productDescription(),
    },
    {
      name: faker.commerce.productName(),
      priceInCents: Number(
        faker.commerce.price({
          min: 190,
          max: 490,
          dec: 0,
        }),
      ),
      businessId: business.id,
      description: faker.commerce.productDescription(),
    },
    {
      name: faker.commerce.productName(),
      priceInCents: Number(
        faker.commerce.price({
          min: 190,
          max: 490,
          dec: 0,
        }),
      ),
      businessId: business.id,
      description: faker.commerce.productDescription(),
    },
    {
      name: faker.commerce.productName(),
      priceInCents: Number(
        faker.commerce.price({
          min: 190,
          max: 490,
          dec: 0,
        }),
      ),
      businessId: business.id,
      description: faker.commerce.productDescription(),
    },
  ])
  .returning();

console.log(chalk.yellow("✔ Created services"));

const appointmentDetailsToPush: (typeof appointmentDetails.$inferInsert)[] = [];
const appointmentsToInsert: (typeof appointments.$inferInsert)[] = [];

for (let i = 0; i < 200; i++) {
  const appointmentId = createId();

  const appointmentServices = faker.helpers.arrayElements(availableServices, {
    min: 1,
    max: 3,
  });

  let totalInCents = 0;

  appointmentServices.forEach((appointmentService) => {
    const quantity = faker.number.int({
      min: 1,
      max: 3,
    });

    totalInCents += appointmentService.priceInCents * quantity;

    appointmentDetailsToPush.push({
      appointmentId,
      serviceId: appointmentService.id,
      priceInCents: appointmentService.priceInCents,
      quantity,
    });
  });

  appointmentsToInsert.push({
    id: appointmentId,
    clientId: faker.helpers.arrayElement([client1.id, client2.id]),
    businessId: business.id,
    status: faker.helpers.arrayElement([
      "booked",
      "canceled",
      "prepaid",
      "awaiting_payment",
      "completed",
    ]),
    totalInCents,
    appointmentDate: faker.date.soon({ days: 10 }),
    createdAt: faker.date.recent({
      days: 40,
    }),
  });
}

await db.insert(appointments).values(appointmentsToInsert);
await db.insert(appointmentDetails).values(appointmentDetailsToPush);

console.log(chalk.yellow("✔ Created appointments"));

console.log(chalk.greenBright("Database seeded successfully!"));

process.exit();
