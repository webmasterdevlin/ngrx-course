import { HttpHeaderResponse, HttpHeaders } from "@angular/common/http";

export const AuthBearerAndContentTypeJsonHeaders = {
  options: new HttpHeaderResponse({
    headers: new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache",
    }),
  }),
};
