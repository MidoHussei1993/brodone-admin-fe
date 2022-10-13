import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';

const API = END_POINTS.menus;


@Injectable({
  providedIn: 'root'
})
export class MenusService {
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

  edit(restaurantId: number, model): Observable<any> {
    return this.http.patch<any>(API.update(restaurantId), model);
  }

  delete(restaurantId: number): Observable<boolean> {
    return this.http.delete<boolean>(API.delete(restaurantId));
  }
}
