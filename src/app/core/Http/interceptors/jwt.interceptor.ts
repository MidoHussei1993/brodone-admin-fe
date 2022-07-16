import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

declare var require;
var jwtDecode = require("jwt-decode");

@Injectable({ providedIn: "root" })
export class JwtInterceptor implements HttpInterceptor {
  // constructor(public translateService: TranslateService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let header = {};
    let token = localStorage.getItem("token");

    if (token) {
      header["Authorization"] = "Bearer" + " " + token;
      header["accept"] = "application/json, text/plain, *";
      //   header["language"] = localStorage.getItem("language");
    }
    header["Accept-Language"] = "ar";

    request = request.clone({
      setHeaders: header,
    });
    return next.handle(request);
  }
}
