import { app } from "@/app";
import { TokenProvider } from "@/services/token-provider";

export class FastifyJwtProvider implements TokenProvider {
    sign(payload: object): string {
        return app.jwt.sign(payload)
    }
}