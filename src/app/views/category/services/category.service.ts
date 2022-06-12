import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { CategoryFilter } from '../models';

const API = END_POINTS.category;


@Injectable({
  providedIn: 'root'
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
    return this.httpClient.post(API.addEditcategory, body);
  }
}
