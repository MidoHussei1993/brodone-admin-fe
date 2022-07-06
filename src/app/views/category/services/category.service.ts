import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { END_POINTS } from "src/app/core/Http/globals/global-config";
import { CategoryFilter } from "../models";

const API = END_POINTS.category;

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  delete(id: number): Observable<any> {
    return this.httpClient.delete(API.delete(id));
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(API.getById(id));
  }

  getAll(filter: CategoryFilter): Observable<any> {
    return this.httpClient.get(API.getAll, {
      params: {
        ...(filter.page && { page: filter.page - 1 }),
        ...(filter.size && { size: filter.size }),
        // ...(filter.id && { id: filter.id }),
        // ...(filter.sort && { sort: filter.sort }),
      },
    });
  }

  create(body: any): Observable<any> {
    return this.httpClient.post(API.addEditcategory, body);
  }

  update(body: any): Observable<any> {
    return this.httpClient.put(API.addEditcategory, body);
  }

  getDropdown(): Observable<any> {
    return this.httpClient.get(API.dropDown);
  }
  getCategoryImage(id: number): Observable<any> {
    return this.httpClient.get(API.getCategoryImage(id));
  }
  getCategoryCanvas(id: number): Observable<any> {
    return this.httpClient.get(API.getCategoryCanvas(id));
  }
  uploadCategoryImage(body): Observable<any> {
    let formData = new FormData();
    let arr = [];
    arr = [...Object.entries(body)];
    console.table(arr);
    arr.map((item) => {
      formData.append(item[0], item[1]);
    });
    // return this.httpClient.post(API.uploadImage, formData, {
    //   headers: new HttpHeaders().append("Content-Type", "multipart/form-data; boundary=<calculated when request is sent>"),
    // });
    return this.httpClient.post(API.uploadCategoryImage, formData);
  }
  uploadCategoryCanvas(body): Observable<any> {
    let formData = new FormData();
    let arr = [];
    arr = [...Object.entries(body)];
    console.table(arr);
    arr.map((item) => {
      formData.append(item[0], item[1]);
    });
    return this.httpClient.post(API.uploadCategoryCanvas, formData);
  }
}
