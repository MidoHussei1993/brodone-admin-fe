import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { END_POINTS } from "src/app/core/Http/globals/global-config";
import { OrderFilter, OrderOperation } from "../models";

const API = END_POINTS.orders;

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  get(filter: OrderFilter): Observable<any> {
    return this.httpClient.get(API.get, {
      params: {
        ...(filter.page && { page: filter.page - 1 }),
        ...(filter.size && { size: filter.size }),
        ...(filter.fromDate && { fromDate: filter.fromDate }),
        ...(filter.toDate && { toDate: filter.toDate }),
        ...(filter.printerId && { printerId: filter.printerId }),
        ...(filter.customerId && { customerId: filter.customerId }),
        ...(filter.orderId && { orderId: filter.orderId }),
        ...(filter.username && { username: filter.username }),
        // fromDate: '20-05-2020',
        // toDate: '25-05-2024',
      },
    });
  }

  assign(body: OrderOperation): Observable<any> {
    return this.httpClient.post(API.assign, body);
  }

  revoke(body: OrderOperation): Observable<any> {
    return this.httpClient.delete(API.revoke);
  }
  withdraw(body: OrderOperation): Observable<any> {
    return this.httpClient.delete(API.withdraw);
  }
}
