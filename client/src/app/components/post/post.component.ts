import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() username: string;
  @Input() post: any;
  constructor() {}

  ngOnInit(): void {}

  editPost() {
    console.log('edit');
  }
  deletePost() {
    console.log('delete');
  }
}
