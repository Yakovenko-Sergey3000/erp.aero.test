export async function up(knex) {
  if (!(await knex.schema.hasTable("users"))) {
    await knex.schema.createTable("users", (table) => {
      table.uuid("id").primary();
      table.string("email").unique();
      table.string("phone").unique();
      table.string("password").notNullable();
      table.timestamps(true, true);
    });
  }

  if (!(await knex.schema.hasTable("tokens"))) {
    await knex.schema.createTable("tokens", (table) => {
      table.increments("id").primary();
      table
        .uuid("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("refresh_token").notNullable().unique();
      table.boolean("is_broken").defaultTo(false);
      table.timestamp("expires_at").notNullable();

      table.timestamps(true, true);
    });
  }

  if (!(await knex.schema.hasTable("files"))) {
    await knex.schema.createTable("files", (table) => {
      table.increments("id").primary();
      table
        .uuid("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("name").notNullable();
      table.string("extension").notNullable();
      table.string("mime_type").notNullable();
      table.bigInteger("size").notNullable();
      table.timestamp("uploaded_at").defaultTo(knex.fn.now());
      table.string("path").notNullable();
    });
  }
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("tokens");
  await knex.schema.dropTableIfExists("files");
}
