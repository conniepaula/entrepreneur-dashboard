import { businesses, users } from "@/db/schema";
import { db } from "@/db/connection";
import Elysia, { t } from "elysia";

export const registerBusiness = new Elysia().post(
  "/businesses",
  async ({ body, set }) => {
    const { businessName, representativeName, email, phone } = body;

    const [representative] = await db
      .insert(users)
      .values({
        name: representativeName,
        email,
        phone,
        role: "admin",
      })
      .returning();

    await db.insert(businesses).values({
      name: businessName,
      representativeId: representative.id,
    });

    set.status = 204;
  },
  {
    body: t.Object({
      businessName: t.String(),
      representativeName: t.String(),
      phone: t.String(),
      email: t.String({ format: "email" }),
    }),
  },
);
