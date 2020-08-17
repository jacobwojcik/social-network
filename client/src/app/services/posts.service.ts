import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postUrl = 'http://localhost:3000/post';
  private postsUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  newPost() {
    console.log('New post');
  }
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.postsUrl);
  }
}
