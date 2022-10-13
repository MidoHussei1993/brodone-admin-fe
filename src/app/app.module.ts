import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./shared/inmemory-db/inmemory-db.service";
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { JwtInterceptor } from "./core/Http/interceptors";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { NotifierModule } from "angular-notifier";
import { NgxSpinnerModule } from "ngx-spinner";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ErrorInterceptor } from "./core/Http/interceptors/error.interceptor";
import { AppHttpInterceptor } from "./core/Http/interceptors/message.interceptor";
import { GoogleMapsModule } from '@angular/google-maps';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule } from "@angular/forms";
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "../assets/i18n/", ".json");
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true,
    }),
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: "ar",
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    NotifierModule,
    GoogleMapsModule,
    AngularMultiSelectModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AppHttpInterceptor,
    //   multi: true,
    // },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
