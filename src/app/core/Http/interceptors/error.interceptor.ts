import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import { AuthService } from "src/app/shared/services/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private route: Router,
    private authService: AuthService,
    private translate: TranslateService,
    private notifier: NotifierService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          console.log("fireeeeeee");
          localStorage.clear();
          this.authService.signout();
        }

        console.log(err);

        if (err.status && !(err.status === 200)) {
          Swal.fire({
            icon: "warning",
            position: "center",
            text: this.translate.instant("error"),
            title: err.error,
            showConfirmButton: false,
            timer: 5000,
          });
        }

        if (err.status === 0) {
          Swal.fire({
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
            position: "top-start",
            text: " خطأ في الاتصال بالخادم",
            showCancelButton: false,
            showCloseButton: false,
          });
        }
        if (err.status === 404 || err.status === 400) {
          console.log(err);
          this.notifier.notify("error", err.error);
        }

        const error = err.error
          ? err.error.message || err.statusText
          : err.status;
        return throwError(error);
      })
    );
  }
}
