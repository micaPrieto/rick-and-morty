import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent implements OnInit{

  @Input() episodeId!: number;

  commentForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  onSubmit(): void {
    if (this.commentForm.invalid || this.isLoading) return;

    const content = this.commentForm.value.content;
    this.isLoading = true;
    this.errorMessage = null;

    console.log('ID DEL EPISODIOOOO: ', this.episodeId);

    if(!this.episodeId){
       console.log('Error enviar comentario: id del episodio falso');
       return;
    }

    this.commentsService.addComment(content, this.episodeId.toString());

    this.commentForm.reset();
    this.isLoading = false;
  }


}

