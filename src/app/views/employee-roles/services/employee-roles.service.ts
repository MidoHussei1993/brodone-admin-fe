import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { EmployeeRoles, EmployeeRolesPost } from '../models';

const API = END_POINTS.EmployeesRoles;

@Injectable({
  providedIn: 'root'
})
export class EmployeeRolesService {

  constructor(private httpClient: HttpClient) {}

  get(restaurantId: string, filter: any): Observable<any> {
    return this.httpClient.get<any>(API.getAll(restaurantId), {
      params: {
        ...(filter.page && { page: filter.page }),
        ...(filter.limit && { limit: filter.limit }),
      },
    });
  }

  getById(restaurantId:string,roleId:string): Observable<EmployeeRoles> {
    return this.httpClient.get<EmployeeRoles>(API.getById(restaurantId,roleId))
  }

  create(restaurantId:string,body:EmployeeRolesPost): Observable<EmployeeRolesPost> {
    return this.httpClient.post<EmployeeRolesPost>(API.add(restaurantId),body)
  }

  edit(restaurantId: string,roleId:string,body:EmployeeRolesPost): Observable<EmployeeRolesPost> {
    return this.httpClient.patch<EmployeeRolesPost>(API.update(restaurantId,roleId),body)
  }

  delete(restaurantId: string,roleId:string): Observable<EmployeeRoles> {
    return this.httpClient.delete<EmployeeRoles>(API.delete(restaurantId,roleId))
  }

}
