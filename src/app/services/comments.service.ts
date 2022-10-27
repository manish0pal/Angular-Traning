import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private url = "http://localhost:3000/comments";

  constructor(private http: HttpClient) { }

  getComments() {
    return this.http.get(this.url);
  }

  insertComment(comment: any) {
    return this.http.post<any>(this.url, comment)
  }
  deleteComment(id: any) {
    return this.http.delete<any>(this.url + "/" + id)
  } 
  updateComment(comment: any) {
    return this.http.put<any>(this.url + "/" + comment.id,comment)
  }
}
