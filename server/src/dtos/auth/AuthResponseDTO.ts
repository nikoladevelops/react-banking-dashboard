import type { AuthTokenPayload } from "../../utils/jwtHelper.js";

export default interface AuthResponseDTO {
  tokenPayload: AuthTokenPayload;
  token: string;
}
