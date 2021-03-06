import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private _postUrl = 'http://localhost:3000/post';
  private _postsUrl = 'http://localhost:3000/posts';
  private _postDelete = 'http://localhost:3000/delete/';
  private _postUpdate = 'http://localhost:3000/update/';
  constructor(private http: HttpClient) {}

  newPost(post) {
    return this.http.post<any>(this._postUrl, post);
  }
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this._postsUrl);
  }
  updatePost(post) {
    return this.http.put<any>(this._postUpdate + post._id, post);
  }
  deletePost(post) {
    return this.http.delete<any>(this._postDelete + post._id);
  }
}
