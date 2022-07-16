import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    public toasterService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((evt) => {
        console.log(
          "🚀 ~ file: message.interceptor.ts ~ line 22 ~ AppHttpInterceptor ~ tap ~ evt",
          evt
        );
        if (evt instanceof HttpResponse) {
          console.log(evt);
          if (evt.body && evt.body)
            this.toasterService.success(evt.body.message, evt.body.title, {
              positionClass: "toast-bottom-center",
            });
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            this.toasterService.error(err.error.message, err.error.title, {
              positionClass: "toast-bottom-center",
            });
          } catch (e) {
            this.toasterService.error("An error occurred", "", {
              positionClass: "toast-bottom-center",
            });
          }
          //log error
          this.spinner.hide();
        }
        return of(err);
      })
    );
  }
}
