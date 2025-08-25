import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Comment } from "../interfaces/commet.interface";
import { environment } from "../../../environments/environment";
import { MatSnackBar } from "@angular/material/snack-bar";




@Injectable({ providedIn: 'root' })
export class CommentsService {

  private urlBase = environment.commentsUrl; //'http://localhost:3000/comments'

  comments = new BehaviorSubject<Comment[]>([]);
  isLoading = new BehaviorSubject<boolean>(false);
  isError = new BehaviorSubject<string | null>(null);
  commentsEnabled = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient,private snackBar : MatSnackBar,) {}

  // Cargar comentarios de un episodio
  getComments(episodeId: number): void {
    this.isLoading.next(true);
    this.isError.next(null);
    this.comments.next([]);

    this.http.get<Comment[]>(`${this.urlBase}/episode/${episodeId}`)
      .subscribe({
        next: (data) => {
          this.comments.next(data);
          localStorage.setItem('comments', JSON.stringify(data));
          console.log("Comentarios del episodio recibidos::", data);
          this.isLoading.next(false);
        },
        error: (err) => {
          console.error('Error al cargar comentarios:', err);
          this.comments.next([]);
          this.isError.next('No se pudieron cargar los comentarios');
          this.isLoading.next(false);
        }
      });
  }


  addComment(comment: string, episodeId: string): void {
    this.isError.next(null);

    const token = localStorage.getItem('token');

    if (!token || token === 'null' || token.trim() === '') {
      this.isError.next('Token inválido o ausente');
      console.error('Token inválido:', token);
      return;
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)   // <- aquí el cambio
      .set('Content-Type', 'application/json');

    const body = {
      episodeId,
      comment: comment
    };

    this.http.post<Comment>(this.urlBase, body, { headers })
      .subscribe({
        next: (newComment) => {
          const updated = [...this.comments.value, newComment];
          this.comments.next(updated);
          localStorage.setItem('comments', JSON.stringify(updated));
          console.log('Comentario agregado correctamente: ', comment);
           this.openSnackBar('Comentario agregado correctamente', 'Cerrar','snackbar-success');
        },
        error: (err) => {
          console.error('Error al agregar comentario:', err);
          this.isError.next('No se pudo agregar el comentario');
          this.openSnackBar('Error al agregar comentario', 'Cerrar','snackbar-error');
        }
      });
  }

  pdateComment(commentId: string, updateData: Partial<{ comment: string; state: boolean }>): void {
    this.isError.next(null);

    const token = localStorage.getItem('token');
    if (!token || token === 'null' || token.trim() === '') {
      this.isError.next('Token inválido o ausente');
      return;
    }

    const headers = new HttpHeaders()
      .set('auth-token', token)
      .set('Content-Type', 'application/json');

    this.http.patch<Comment>(`${this.urlBase}/${commentId}`, updateData, { headers })
      .subscribe({
        next: (updatedComment) => {
          const updated = this.comments.value.map(c =>
            c.id === commentId ? { ...c, ...updatedComment } : c
          );
          this.comments.next(updated);
        },
        error: (err) => {
          console.error('Error al actualizar comentario:', err);
          this.isError.next('No se pudo actualizar el comentario');
        }
      });
  }


  deleteComment(commentId: string): void {
    this.isError.next(null);

    const token = localStorage.getItem('token');
    if (!token || token === 'null' || token.trim() === '') {
      this.isError.next('Token inválido o ausente');
      return;
    }

    const headers = new HttpHeaders().set('auth-token', token);

    this.http.delete(`${this.urlBase}/${commentId}`, { headers })
      .subscribe({
        next: () => {
          const updated = this.comments.value.filter(c => c.id !== commentId);
          this.comments.next(updated);
        },
        error: (err) => {
          console.error('Error al eliminar comentario:', err);
          this.isError.next('No se pudo eliminar el comentario');
        }
      });
  }

  // Admin: desactivar comentarios nuevos en un episodio
  disableCommentsForEpisode(episodeId: number): void {
    this.http.patch<{ commentsEnabled: boolean }>(
      `http://localhost:3000/episodes/${episodeId}/comments-enabled`,
      { commentsEnabled: false }
    )
    .subscribe({
      next: () => {
        this.commentsEnabled.next(false);
      },
      error: (err) => {
        console.error('Error al desactivar comentarios:', err);
        this.isError.next('No se pudo desactivar los comentarios');
      }
    });
  }

  // Admin: activar comentarios nuevos en un episodio
  enableCommentsForEpisode(episodeId: number): void {
    this.http.patch<{ commentsEnabled: boolean }>(
      `http://localhost:3000/episodes/${episodeId}/comments-enabled`,
      { commentsEnabled: true }
    )
    .subscribe({
      next: () => {
        this.commentsEnabled.next(true);
      },
      error: (err) => {
        console.error('Error al activar comentarios:', err);
        this.isError.next('No se pudo activar los comentarios');
      }
    });
  }


  updateComment(commentId: string, updateData: Partial<{ comment: string; state: boolean }>): void {
    this.isError.next(null);

    const token = localStorage.getItem('token');
    if (!token || token === 'null' || token.trim() === '') {
      this.isError.next('Token inválido o ausente');
      return;
    }

    const headers = new HttpHeaders()
      .set('auth-token', token)
      .set('Content-Type', 'application/json');

    this.http.patch<Comment>(`${this.urlBase}/${commentId}`, updateData, { headers })
      .subscribe({
        next: (updatedComment) => {
          const updated = this.comments.value.map(c =>
            c.id === commentId ? { ...c, ...updatedComment } : c
          );
          this.comments.next(updated);
        },
        error: (err) => {
          console.error('Error al actualizar comentario:', err);
          this.isError.next('No se pudo actualizar el comentario');
        }
      });
  }

    openSnackBar(message: string, action: string, panelClass: string) {
      this.snackBar.open(message, action, {
       duration: 3000,
       panelClass: panelClass
      });
  }


  /*
  editComment(commentId: string, comment: string): void {
    this.isError.next(null);

    const token = localStorage.getItem('token');
    if (!token || token === 'null' || token.trim() === '') {
      this.isError.next('Token inválido o ausente');
      return;
    }

    const headers = new HttpHeaders()
      .set('auth-token', token)
      .set('Content-Type', 'application/json');

    this.http.patch<Comment>(`${this.urlBase}/${commentId}`, { comment }, { headers })
      .subscribe({
        next: (updatedComment) => {
          const updated = this.comments.value.map(c =>
            c.id === commentId ? { ...c, comment: updatedComment.comment } : c
          );
          this.comments.next(updated);
        },
        error: (err) => {
          console.error('Error al editar comentario:', err);
          this.isError.next('No se pudo editar el comentario');
        }
      });
  }
*/

}
