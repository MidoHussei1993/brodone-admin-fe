import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { END_POINTS } from "src/app/core/Http/globals/global-config";
import { ProductFilter } from "../models";

const API = END_POINTS.product;

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  delete(id: number): Observable<any> {
    return this.httpClient.delete(API.delete(id));
  }

  getColors(): Observable<any> {
    return this.httpClient.get(API.getColors);
  }

  getSizesList(): Observable<any> {
    return this.httpClient.get(API.getSizes);
  }

  getAll(filter: ProductFilter): Observable<any> {
    return this.httpClient.get(API.getAll, {
      params: {
        ...(filter.page && { page: filter.page }),
        ...(filter.size && { size: filter.size }),
        // ...(filter.id && { id: filter.id }),
        // ...(filter.sort && { sort: filter.sort }),
      },
    });
  }

  create(body: any): Observable<any> {
    return this.httpClient.post(API.add, body);
  }

  update(body: any): Observable<any> {
    return this.httpClient.put(API.edit, body);
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(API.getById(id));
  }

  uploadProductImage(body): Observable<any> {
    let formData = new FormData();
    let arr = [];
    arr = [...Object.entries(body)];
    let headers = new HttpHeaders();
    console.table(arr);
    arr.map((item) => {
      formData.append(item[0], item[1]);
    });
    // return this.httpClient.post(API.uploadImage, formData, {
    //   headers: new HttpHeaders().append("Content-Type", "multipart/form-data; boundary=<calculated when request is sent>"),
    // });
    return this.httpClient.post(API.uploadImage, formData);
  }
}
