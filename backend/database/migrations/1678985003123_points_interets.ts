import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class PointsInteretTableMigration extends BaseSchema {
  protected tableName = "points_interets";

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
      table.float("x", 9, 7);
      table.float("y", 9, 7);
      table.float("latitude", 16, 13);
      table.float("longitude", 16, 13);

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
