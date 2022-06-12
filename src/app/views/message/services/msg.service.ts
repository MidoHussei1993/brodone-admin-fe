import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { END_POINTS } from "src/app/core/Http/globals/global-config";
import { MessageFilter, ReplyMassage_, SentMassage_ } from "../models";

const API = END_POINTS.message;

@Injectable({
  providedIn: "root",
})
export class MsgService {
  constructor(private httpClient: HttpClient) {}

  delete(id: number): Observable<any> {
    return this.httpClient.delete(API.delete(id));
  }

  view(id: number): Observable<any> {
    return this.httpClient.get(API.view(id));
  }

  getAll(filter: MessageFilter): Observable<any> {
    return this.httpClient.get(API.getAll, {
      params: {
        ...(filter.page && { page: filter.page - 1 }),
        ...(filter.size && { size: filter.size }),
        ...(filter.id && { id: filter.id }),
        ...(filter.sort && { sort: filter.sort }),
      },
    });
  }

  getAllReceived(filter: MessageFilter): Observable<any> {
    return this.httpClient.get(API.getAllReceived, {
      params: {
        ...(filter.page && { page: filter.page - 1 }),
        ...(filter.size && { size: filter.size }),
        ...(filter.id && { id: filter.id }),
        ...(filter.sort && { sort: filter.sort }),
      },
    });
  }

  getAllSent(filter: MessageFilter): Observable<any> {
    return this.httpClient.get(API.getAllSent, {
      params: {
        ...(filter.page && { page: filter.page - 1 }),
        ...(filter.size && { size: filter.size }),
        ...(filter.id && { id: filter.id }),
        ...(filter.sort && { sort: filter.sort }),
      },
    });
  }

  getCountOfUnRead(): Observable<any> {
    return this.httpClient.get(API.getCountOfUnRead);
  }

  sent(body: SentMassage_): Observable<any> {
    return this.httpClient.post(API.sent, body);
  }

  reply(body: ReplyMassage_): Observable<any> {
    return this.httpClient.post(API.reply, body);
  }
}
