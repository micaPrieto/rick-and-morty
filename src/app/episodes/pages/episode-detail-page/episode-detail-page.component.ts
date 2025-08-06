import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CharactersService } from '../../../characters/services/characters-service';
import { EpisodesService } from '../../services/episodes-service';
import { FloatingBarComponent } from "../../../shared/components/floating-bar/floating-bar.component";
import { EpisodeInfoComponent } from "../../components/episode-detail/episode-info/episode-info.component";
import { EpisodeCharactersListComponent } from "../../components/episode-detail/episode-characters-list/episode-characters-list.component";
import { CommentFormComponent } from '../../../comments/components/comment-form/comment-form.component';
import { Episode } from '../../interfaces/episode.interface';
import { ActivatedRoute } from '@angular/router';
import { CommentsPageComponent } from "../../../comments/pages/comments-page/comments-page.component";

@Component({
  selector: 'app-episode-detail-page',
  imports: [FloatingBarComponent, EpisodeInfoComponent, EpisodeCharactersListComponent, CommentsPageComponent],
  templateUrl: './episode-detail-page.component.html'
})
export default class EpisodeDetailPageComponent implements OnInit, OnDestroy {

    isError : any;
    episodeSelected : Episode | null = null;

    sub =new Subscription()

    constructor(
      private episodesService: EpisodesService,
      private activatedRoute : ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.getCharacterById();

      this.sub.add(
        this.episodesService.isError.subscribe(err => {
          this.isError = err;
        })
      )

      this.sub.add(
        this.episodesService.episodeSelected.subscribe((episode) => {
        this.episodeSelected  = episode;
      }))
    }

  getCharacterById(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.episodesService.getEpisodeById(id)
      }
    });
  }

  ngOnDestroy(): void  {
    this.sub.unsubscribe();
  }

}
