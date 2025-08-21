import { Component, computed, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommentDatePipe } from '../../pipes/comment-date.pipe';
import { CommonModule } from '@angular/common';
import { CommentsService } from '../../services/comments.service';
import { Subscription } from 'rxjs';
import { Comment } from '../../interfaces/commet.interface';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../auth/services/user.service';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-comments-episode-list',
  imports: [CommentDatePipe, CommonModule,FormsModule],
  templateUrl: './comments-episode-list.component.html',
  styleUrl: './comments-episode-list.component.css'
})
export class CommentsEpisodeListComponent implements OnChanges, OnInit{

  @Input() episodeId!: number;

  comments: Comment[] = [];
  isError: string | null = null;

  editingCommentId: string | null = null;  // Para saber cuál comentario estoy editando
  editedContent: string = '';

  currentUserId = '';  // Id del usuario logueado


  private sub = new Subscription();

  constructor(
    private commentsService: CommentsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUserId = JSON.parse(localStorage.getItem('user')!)?.id ?? 0; //! TRAER DERL SERVICE

    this.sub.add(
      this.commentsService.comments.subscribe((comments) => {
        this.comments = comments;
      })
    );

    this.sub.add(
      this.commentsService.isError.subscribe((err) => {
        this.isError = err;
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['episodeId'] && this.episodeId != null) {
      this.commentsService.getComments(this.episodeId);
      this.commentsService.comments.next([]);
    }
  }

  get currentUser(): User | null {
    return this.userService.user();
  }

  get isAdmin(): boolean { //! MOVER AL SERVICE
    return this.currentUser?.roles?.includes('admin') ?? false;
  }


  // Verifica si puede editar/eliminar el comentario segun rol
  canEditOrDelete(comment: Comment): boolean {
    const user = this.currentUser;
    return user?.roles?.includes('admin') || user?.id === comment.userId;
  }

  delete(commentId: string): void {
    if (confirm('¿Seguro que querés eliminar este comentario?')) {
      this.commentsService.deleteComment(commentId);
    }
  }

  toggleCommentState(comment: Comment): void {
    this.commentsService.updateComment(comment.id, { state: !comment.state });
  }


  startEdit(comment: Comment) {
    if (comment.userId === this.currentUserId) {
      this.editingCommentId = comment.id;
      this.editedContent = comment.comment;
    }
  }

  cancelEdit() {
    this.editingCommentId = null;
    this.editedContent = '';
  }

  saveEdit() {
    if (!this.editingCommentId) return;

    this.commentsService.updateComment(this.editingCommentId, { comment: this.editedContent });
    this.editingCommentId = null;
    this.editedContent = '';
  }

  trackByCommentId(index: number, comment: Comment): string {
    return comment.id;
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

