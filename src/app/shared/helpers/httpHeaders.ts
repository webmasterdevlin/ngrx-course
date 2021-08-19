import { HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { get } from "./jwtCache";

export const AuthBearerAndContentTypeJsonHeaders = {
  options: new HttpHeaderResponse({
    headers: new HttpHeaders({
      Authorization: "Bearer " + get(),
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache",
    }),
  }),
};
