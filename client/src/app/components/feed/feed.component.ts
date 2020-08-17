import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  public posts: any = [];

  constructor(
    private _posts: PostsService,
    private router: Router,
    private _auth: AuthService
  ) {}

  ngOnInit() {
    this._posts.getPosts().subscribe(
      (res) => (this.posts = res),
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this._auth.logout();
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
