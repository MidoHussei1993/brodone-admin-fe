import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';

const API = END_POINTS.tables;

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  constructor(private http: HttpClient) {}

  create(restaurantId: number,model): Observable<any> {
    return this.http.post<any>(API.add(restaurantId), model);
  }

  get(restaurantId: number, filter: any): Observable<any> {
    return this.http.get<any>(API.getAll(restaurantId), {
      params: {
        ...(filter.page && { page: filter.page }),
        ...(filter.limit && { limit: filter.limit }),
      },
    });
  }

  getById(restaurantId: number, id: number): Observable<any> {
    return this.http.get<any>(API.getById(restaurantId,id));
  }

  edit(restaurantId: number, id: number, model): Observable<any> {
    return this.http.patch<any>(API.update(restaurantId,id), model);
  }

  delete(restaurantId: number, id: number): Observable<boolean> {
    return this.http.delete<boolean>(API.delete(restaurantId,id));
  }
}
