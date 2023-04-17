import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Passage from "App/Models/Passage";

export default class PassagesController {
  public async index({ request, response, params }: HttpContextContract) {
    const compteurId = params.id;
    const debut = request.input("debut");
    const fin = request.input("fin");
    const limite = request.input("limite");

    const query = Passage.query().where("compteur_id", compteurId);
    if (debut) {
      query.where("date", ">=", debut + " 00:00:00 GMT-0500");
    }
    if (fin) {
      query.where("date", "<=", fin + " 00:00:00 GMT-0500");
    }

    if (limite) query.limit(limite);

    const filteredList = await query;
    response.ok(filteredList);
  }
}
