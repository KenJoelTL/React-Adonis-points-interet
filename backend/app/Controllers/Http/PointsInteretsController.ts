import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import PointInteret from "App/Models/PointInteret";

export default class PointsInteretsController {
  public async index({ request, response }: HttpContextContract) {
    const query = PointInteret.query();

    const type = request.input("type");
    const nom = request.input("nom");
    const limite = request.input("limite");

    if (type === "fontaine") {
      query.where("type", "Fontaine à boire");
    } else if (type === "atelier") {
      query.where("type", "Atelier");
    }

    if (nom) {
      query.where((select_points) => {
        select_points
          .whereILike("nom_parc_lieu", `%${nom}%`)
          .orWhereILike("remarque", `%${nom}%`);
      });
    }

    if (limite) {
      query.limit(parseInt(limite));
    }
    const pointsdinteretList = await query;
    response.ok(pointsdinteretList);
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({ params, response }: HttpContextContract) {
    const pointId = params.id;
    const point = await PointInteret.find(pointId);

    if (!point) {
      return response.notFound({ message: "Point d'intérêt introuvable" });
    }

    return response.ok(point);
  }

  public async update({}: HttpContextContract) {}
}
