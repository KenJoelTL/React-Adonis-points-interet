import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Compteur from "App/Models/Compteur";

export default class CompteursController {
  public async index({ request, response }: HttpContextContract) {
    const limite = request.input("limite");

    const query = Compteur.query();

    // Filtrez la liste des compteurs si le paramètre `limite` est fourni.
    if (limite) {
      query.limit(limite);
    }
    const compteursListe = await query;

    return response.ok(compteursListe);
  }

  public async show({ params, response }: HttpContextContract) {
    const compteurId = params.id;

    if (!compteurId) {
      return response.notFound({ message: "Compteur introuvable" });
    }

    const compteur = await Compteur.find(compteurId);

    if (!compteur) {
      return response.notFound({ message: "Compteur introuvable" });
    }

    return response.ok(compteur);
  }
}
