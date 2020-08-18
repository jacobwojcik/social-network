import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private _postUrl = 'http://localhost:3000/post';
  private _postsUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  newPost(post) {
    return this.http.post<any>(this._postUrl, post);
  }
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this._postsUrl);
  }
}
