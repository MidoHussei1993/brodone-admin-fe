import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { Tag } from '../models';
import { TagPost } from '../models/tag-post.model';

const API = END_POINTS.tags;

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient) {}

  get(filter: any): Observable<any> {
    return this.httpClient.get<any>(API.getAll, {
      params: {
        ...(filter.page && { page: filter.page }),
        ...(filter.limit && { limit: filter.limit }),
      },
    });
  }

  getById(id: number): Observable<Tag> {
    return this.httpClient.get<Tag>(API.getById(id))
  }

  create(body:TagPost): Observable<any> {
    return this.httpClient.post<Tag>(API.add,body)
  }

  edit(id:number,body:TagPost): Observable<any> {
    return this.httpClient.put<Tag>(API.update(id),body)
  }

  delete(id: number): Observable<Tag> {
    return this.httpClient.delete<Tag>(API.delete(id))
  }

}
