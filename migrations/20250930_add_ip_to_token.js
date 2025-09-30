export async function up(knex) {
  await knex.schema.alterTable("tokens", (table) => {
    table.string("ip");
  });
}

export async function down(knex) {
  await knex.schema.alterTable("tokens", (table) => {
    table.dropColumn("ip");
  });
}
