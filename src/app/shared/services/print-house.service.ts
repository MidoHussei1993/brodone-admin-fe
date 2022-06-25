import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { END_POINTS } from "src/app/core/Http/globals/global-config";

const API = END_POINTS.printhouse;

@Injectable({
  providedIn: "root",
})
export class PrintHouseService {
  constructor(private httpClient: HttpClient) {}

  getPrintHouseList(filter: any = {}): Observable<any> {
    return this.httpClient.get(API.printhouse, {
      params: {
        ...(filter.page && { page: filter.page }),
        ...(filter.size && { size: filter.size }),
        // ...(filter.fromDate && { fromDate: filter.fromDate }),
        // ...(filter.toDate && { toDate: filter.toDate }),
        ...(filter.printerId && { printerId: filter.printerId }),
        ...(filter.customerId && { customerId: filter.customerId }),
        ...(filter.orderId && { orderId: filter.orderId }),
        ...(filter.username && { username: filter.username }),
      },
    });
  }

  get(): Observable<any> {
    return this.httpClient.get(API.get);
  }
  create(body: any): Observable<any> {
    return this.httpClient.post(API.add, body);
  }

  update(body: any): Observable<any> {
    return this.httpClient.post(API.edit, body);
  }
  getById(id: number): Observable<any> {
    return this.httpClient.get(API.getById(id));
  }

  getCityDropdown(): Observable<any> {
    return this.httpClient.get(API.cityDropdown);
  }
}
