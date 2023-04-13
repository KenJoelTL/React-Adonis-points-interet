import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import PointInteret from "App/Models/PointInteret";
import CreateAtelierValidator from "App/Validators/CreateAtelierValidator";
import CreateFontaineValidator from "App/Validators/CreateFontaineValidator";

export default class PointsInteretsController {
  public async index({ request, response }: HttpContextContract) {
    const query = PointInteret.query();

    const type = request.input("type");
    const nom_parc_lieu = request.input("nom_parc_lieu");
    const limite = request.input("limite");

    if (type === "fontaine") {
      query.where("type", "fontaine");
    } else if (type === "atelier") {
      query.where("type", "atelier");
    }

    if (nom_parc_lieu) {
      query.where((select_points) => {
        select_points
          .whereILike("nom_parc_lieu", `%${nom_parc_lieu}%`)
          .orWhereILike("remarque", `%${nom_parc_lieu}%`);
      });
    }

    if (limite) {
      query.limit(parseInt(limite));
    }
    const pointsdinteretList = await query;
    response.ok(pointsdinteretList);
  }

  public async store({ request, response }: HttpContextContract) {
    let newPoint = {};
    let pointDTO;
    try {
      if (request.input("type") === "fontaine") {
        console.log("fontaine");
        newPoint = await request.validate(CreateFontaineValidator);
        // pointDTO = this.createFontaineDTO(newPoint);
      } else {
        console.log("atelier");
        newPoint = await request.validate(CreateAtelierValidator);
      }
    } catch (error) {
      return response.badRequest(error.messages);
    }
    // Sauvegarder la liste mise à jour dans la BD
    // console.log(pointDTO);
    const createdPoint = await PointInteret.create(newPoint);

    // Retourner le nouveau point d'intérêt créé
    response.created(createdPoint);
  }

  public async show({ params, response }: HttpContextContract) {
    const pointId = params.id;
    const point = await PointInteret.find(pointId);

    if (!point) {
      return response.notFound({ message: "Point d'intérêt introuvable" });
    }

    return response.ok(point);
  }

  private createFontaineDTO(pointsdinteret) {
    const fontaineDTO = {
      nom_parc_lieu: "",
      date_installation: "",
      remarque: "",
      longitude: "",
      latitude: "",
      type: "fontaine",
    };
    fontaineDTO.nom_parc_lieu = pointsdinteret.nom_parc_lieu;
    fontaineDTO.date_installation = pointsdinteret.date_installation;
    fontaineDTO.remarque = pointsdinteret.remarque;
    fontaineDTO.longitude = pointsdinteret.longitude;
    fontaineDTO.latitude = pointsdinteret.latitude;

    return fontaineDTO;
  }

  private createAtelierDTO(pointsdinteret) {
    const fontaineDTO = {
      nom_parc_lieu: "",
      date_installation: "",
      remarque: "",
      longitude: "",
      latitude: "",
      type: "fontaine",
    };
    fontaineDTO.nom_parc_lieu = pointsdinteret.nom_parc_lieu;
    fontaineDTO.date_installation = pointsdinteret.date_installation;
    fontaineDTO.remarque = pointsdinteret.remarque;
    fontaineDTO.longitude = pointsdinteret.longitude;
    fontaineDTO.latitude = pointsdinteret.latitude;

    return fontaineDTO;
  }

  public async update({}: HttpContextContract) {}
}
