import { Component, Input } from '@angular/core';
import { CommentFormComponent } from "../../components/comment-form/comment-form.component";
import { CommentsEpisodeListComponent } from "../../components/comments-episode-list/comments-episode-list.component";
import { CommentDatePipe } from '../../pipes/comment-date.pipe';

@Component({
  selector: 'app-comments-page',
  imports: [CommentFormComponent, CommentsEpisodeListComponent,CommentDatePipe],
  templateUrl: './comments-page.component.html',
  styleUrl: './comments-page.component.css'
})
export class CommentsPageComponent {

    @Input() episodeId!: number;

}
