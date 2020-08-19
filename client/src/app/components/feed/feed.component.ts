import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  public posts: any = [];
  public username = localStorage.getItem('username');

  newPost = new FormGroup({
    author: new FormControl(this.username),
    body: new FormControl(''),
    comments: new FormControl([]),
    date: new FormControl(),
    votes: new FormGroup({
      upvotes: new FormControl(0),
      downvotes: new FormControl(0),
    }),
  });

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
  createPost() {
    this.newPost.patchValue({
      date: Date.now(),
    });
    this._posts.newPost(this.newPost.value).subscribe(
      (res) => {
        this.posts.push(this.newPost.value);
        this.newPost.patchValue({
          body: '',
        });
      },
      (err) => console.log(err)
    );
  }
}
