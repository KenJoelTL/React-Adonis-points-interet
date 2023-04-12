import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Passage extends BaseModel {
  public static table = "passages";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public compteur_id: number;

  @column.dateTime()
  public date: DateTime;

  @column.dateTime()
  public nb_passage: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
