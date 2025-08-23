import { Component, Input } from '@angular/core';
import { CommentFormComponent } from "../../components/comment-form/comment-form.component";
import { CommentsEpisodeListComponent } from "../../components/comments-episode-list/comments-episode-list.component";

@Component({
  selector: 'app-comments-page',
  imports: [CommentFormComponent, CommentsEpisodeListComponent],
  templateUrl: './comments-page.component.html',
  styleUrl: './comments-page.component.css'
})
export class CommentsPageComponent {

    @Input() episodeId!: number;

}
