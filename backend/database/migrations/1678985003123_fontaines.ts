import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class FontainesTableMigration extends BaseSchema {
  protected tableName = "fontaines";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.string("arrondissement");
      table.string("nom_parc_lieu");
      table.string("proximite_jeux_repere");
      table.string("intersection");
      table.string("etat");
      table.dateTime("date_installation");
      table.string("remarque");
      table.enum("type", ["Fontaine à boire", "Atelier de réparation"]);
      table.string("precision_localisation");
      table.dateTime("date_installation");
      table.float("x", 2, 7);
      table.float("y", 2, 7);
      table.float("latitude", 3, 13);
      table.float("longitude", 3, 13);

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
