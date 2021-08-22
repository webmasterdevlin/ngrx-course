import { HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { getJwt } from "./jwtCache";

export const AuthBearerAndContentTypeJsonHeaders = {
  options: new HttpHeaderResponse({
    headers: new HttpHeaders({
      Authorization: "Bearer " + getJwt(),
      "Content-Type": "application/json; charset=utf-8",
    }),
  }),
};
