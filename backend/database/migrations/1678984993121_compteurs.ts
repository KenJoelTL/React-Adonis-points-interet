import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class CompteursTableMigration extends BaseSchema {
  protected tableName = "compteurs";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("ancien_id").unsigned();
      table.string("nom");
      table.enum("statut", [
        "Actif",
        "En maintenance",
        "Unidirectionnel",
        "Inactif",
      ]);
      table.float("longitude", 16, 13);
      table.float("latitude", 16, 13);
      table.integer("annee_implante");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
