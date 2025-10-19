import { type Knex } from "knex";
import type { UserModel } from "../modules/user/user.model.ts";

export async function seed(knex: Knex) {
  const users: UserModel[] = [
    {
      id: "00000000-0000-0000-0000-000000000001",
      email: "alice@example.com",
      phone: "+10000000001",
      password: "Password123!",
    },
    {
      id: "00000000-0000-0000-0000-000000000002",
      email: "bob@example.com",
      phone: "+10000000002",
      password: "Password123!",
    },
    {
      id: "00000000-0000-0000-0000-000000000003",
      email: "carol@example.com",
      phone: "+10000000003",
      password: "Password123!",
    },
  ];

  await knex<UserModel>("users")
    .whereIn(
      "email",
      users.map((u) => u.email),
    )
    .del();

  // Insert seed entries (timestamps handled by DB defaults)
  await knex("users").insert(users);
}
