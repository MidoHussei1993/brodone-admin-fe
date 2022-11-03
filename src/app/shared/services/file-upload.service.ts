import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { END_POINTS } from "src/app/core/Http/globals/global-config";

const API = END_POINTS.fileUpload;

@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  constructor(private httpClient: HttpClient) {}

  UploadImage(file: any): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    return this.httpClient.post<any>(API.upload, formData);
  }

  delete(fileKey: string): Observable<any> {
    return this.httpClient.delete<any>(API.delete(fileKey));
  }
}
