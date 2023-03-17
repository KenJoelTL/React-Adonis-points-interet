import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Passage extends BaseSchema {
  protected tableName = "passages";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.bigInteger("compteur_id").unsigned().index("compteur_id");
      table.datetime("date");
      table.integer("nb_passage").checkPositive();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });

      table.foreign("compteur_id").references("users.id").onDelete("CASCADE");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
