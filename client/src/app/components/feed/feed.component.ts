import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  public posts: any = [];

  constructor(private _posts: PostsService) {}

  ngOnInit() {
    this._posts.getPosts().subscribe(
      (res) => (this.posts = res),
      (err) => console.log(err)
    );
  }
}
