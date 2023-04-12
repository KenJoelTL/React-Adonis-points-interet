import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class PointInteret extends BaseModel {
  public static table = "points_interets";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public arrondissement: string;

  @column()
  public adresse: string;

  @column()
  public nom_parc_lieu: string;

  @column()
  public proximite_jeux_repere: string;

  @column()
  public intersection: string;

  @column()
  public etat: string;

  @column()
  public date_installation: DateTime;

  @column()
  public remarque: string;

  @column()
  public type: string;

  @column()
  public precision_localisation: string;

  @column()
  public x: number;

  @column()
  public y: number;

  @column()
  public annee: number;

  @column()
  public latitude: number;

  @column()
  public longitude: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
