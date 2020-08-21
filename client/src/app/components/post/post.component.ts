import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  public username: string = localStorage.getItem('username');
  @Input() post: any;
  @Output('deletePost') deletePost: EventEmitter<any> = new EventEmitter();
  constructor(private _post: PostsService) {}

  ngOnInit(): void {}

  editPost() {
    console.log('edit');
  }
  deleteThisPost() {
    this.deletePost.emit(this.post);
  }
}
