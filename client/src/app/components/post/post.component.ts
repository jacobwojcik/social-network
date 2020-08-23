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

  public editedPost: string = '';
  constructor(private _post: PostsService) {}

  ngOnInit(): void {
    this.editedPost = this.post.body;
  }

  editOnClick() {
    this.isEditorOpen = !this.isEditorOpen;
  }
  cancelEditing() {
    this.editedPost = this.post.body;
    this.isEditorOpen = !this.isEditorOpen;
  }
  editThisPost() {
    this.editOnClick();
    this.post.body = this.editedPost;
    this.editPost.emit(this.post);
  }
  deleteThisPost() {
    this.deletePost.emit(this.post);
  }
}
