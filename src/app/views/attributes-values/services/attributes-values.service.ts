import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { END_POINTS } from "src/app/core/Http/globals/global-config";

const API = END_POINTS.attributesValues;

@Injectable({
  providedIn: "root",
})
export class AttributesValuesService {
  constructor(private http: HttpClient) {}
  create(restaurantId: any, attributeId: any, model): Observable<any> {
    return this.http.post<any>(API.add(restaurantId, attributeId), model);
  }

  get(restaurantId: any, attributeId: any, filter: any): Observable<any> {
    return this.http.get<any>(API.getAll(restaurantId, attributeId), {
      params: {
        ...(filter.page && { page: filter.page }),
        ...(filter.limit && { limit: filter.limit }),
      },
    });
  }

  getById(restaurantId: any, attributeId: any, id: number): Observable<any> {
    return this.http.get<any>(API.getById(restaurantId, attributeId, id));
  }

  edit(
    restaurantId: any,
    attributeId: any,
    id: number,
    model
  ): Observable<any> {
    return this.http.patch<any>(
      API.update(restaurantId, attributeId, id),
      model
    );
  }
}
