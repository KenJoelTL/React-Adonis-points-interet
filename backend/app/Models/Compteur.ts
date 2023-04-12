import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Compteur extends BaseModel {
  public static table = "compteurs";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public ancien_id: number;

  @column()
  public nom: string;

  @column()
  public statut: string;

  @column()
  public longitude: number;

  @column()
  public latitude: number;

  @column()
  public annee_implante: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
