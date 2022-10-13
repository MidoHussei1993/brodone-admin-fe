import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { EmployeeBranches, EmployeeBranchesPost } from '../models';

const API = END_POINTS.restaurantBranches;

@Injectable({
  providedIn: 'root'
})
export class EmployeeBranchesService {

  constructor(private httpClient: HttpClient) {}

  get(restaurantId:string,filter:any): Observable<any[]> {
    return this.httpClient.get<any[]>(API.getAll(restaurantId), {
      params: {
        ...(filter.page && { page: filter.page }),
        ...(filter.limit && { limit: filter.limit }),
      },
    })
  }

  getById(restaurantId:string,branchId:string): Observable<EmployeeBranches> {
    return this.httpClient.get<EmployeeBranches>(API.getById(restaurantId,branchId))
  }

  create(restaurantId:string,body:EmployeeBranchesPost): Observable<EmployeeBranchesPost> {
    return this.httpClient.post<EmployeeBranchesPost>(API.add(restaurantId),body)
  }

  edit(restaurantId: string,branchId:string,body:EmployeeBranchesPost): Observable<EmployeeBranchesPost> {
    return this.httpClient.patch<EmployeeBranchesPost>(API.update(restaurantId,branchId),body)
  }

  delete(restaurantId: string,branchId:string): Observable<EmployeeBranches> {
    return this.httpClient.delete<EmployeeBranches>(API.delete(restaurantId,branchId))
  }

}
