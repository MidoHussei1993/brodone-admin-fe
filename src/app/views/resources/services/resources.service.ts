import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { RestaurantPost } from '../../restaurant/models';

const API = END_POINTS.resources;


@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private httpClient: HttpClient) {}

  get(filter:any): Observable<any[]> {
    return this.httpClient.get<any[]>(API.getAll, {
      params: {
        ...(filter.page && { page: filter.page }),
        ...(filter.limit && { limit: filter.limit }),
      },
    })
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get<any>(API.getById(id))
  }

  create(body:RestaurantPost): Observable<any> {
    return this.httpClient.post<any>(API.add,body)
  }

  edit(id:number,body:RestaurantPost): Observable<any> {
    return this.httpClient.patch<any>(API.update(id),body)
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(API.delete(id))
  }

}
