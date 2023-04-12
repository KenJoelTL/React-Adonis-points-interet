import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class PassagesTableMigration extends BaseSchema {
  protected tableName = "passages";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("compteur_id").unsigned().index("compteur_id");
      table.datetime("date");
      table.integer("nb_passage");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps();

      table
        .foreign("compteur_id")
        .references("compteurs.id")
        .onDelete("CASCADE");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
