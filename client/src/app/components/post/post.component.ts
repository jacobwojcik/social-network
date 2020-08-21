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
  @Output('editPost') editPost: EventEmitter<any> = new EventEmitter();
  @Output('deletePost') deletePost: EventEmitter<any> = new EventEmitter();
  isEditorOpen: boolean = false;

  constructor(private _post: PostsService) {}

  ngOnInit(): void {}

  editOnClick() {
    this.isEditorOpen = !this.isEditorOpen;
  }
  editThisPost() {
    this.editOnClick();
    this.editPost.emit(this.post);
  }
  deleteThisPost() {
    this.deletePost.emit(this.post);
  }
}
