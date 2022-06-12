import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Router } from "@angular/router";

import jwt_decode from "jwt-decode";
import { END_POINTS } from "src/app/core/Http/globals/global-config";
import { LoginModel } from "../models";

const API = END_POINTS.AUTH;

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // login
  login(model: LoginModel): Observable<any> {
    const formData = new FormData();
    for (const [key, value] of Object.entries(model)) {
      formData.append(`${key}`, String(value));
    }
    return this.http
      .post(API.login, formData, {
        headers: new HttpHeaders().set(
          "Authorization",
          "Basic VGFiYUBTZXJ2aWNlczIwMjJDbGllbnQ6VGFiYSRlY3JpdEtleQ=="
        ),
      })
  }
}
