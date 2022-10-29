import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';

const API = END_POINTS.variations;

@Injectable({
  providedIn: 'root'
})
export class VariationService {
  constructor(private http: HttpClient) {}
  create(restaurantId: any, menuItemId: any, model): Observable<any> {
    return this.http.post<any>(API.add(restaurantId, menuItemId), model);
  }

  get(restaurantId: any, menuItemId: any, filter: any): Observable<any> {
    return this.http.get<any>(API.getAll(restaurantId, menuItemId), {
      params: {
        ...(filter.page && { page: filter.page }),
        ...(filter.limit && { limit: filter.limit }),
      },
    });
  }

  getById(restaurantId: any, menuItemId: any, id: number): Observable<any> {
    return this.http.get<any>(API.getById(restaurantId, menuItemId, id));
  }

  edit(
    restaurantId: any,
    menuItemId: any,
    id: number,
    model
  ): Observable<any> {
    return this.http.patch<any>(
      API.update(restaurantId, menuItemId, id),
      model
    );
  }

  delete(restaurantId: any, menuItemId: any, id: number): Observable<any> {
    return this.http.get<any>(API.delete(restaurantId, menuItemId, id));
  }
}
