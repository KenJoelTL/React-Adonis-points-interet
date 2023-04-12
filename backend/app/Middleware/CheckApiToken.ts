import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Env from "@ioc:Adonis/Core/Env";

export default class CheckApiToken {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    if (request.input("apiToken") !== Env.get("API_TOKEN"))
      return response.unauthorized({ message: "Envoyez un jeton valide" });
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next();
  }
}
