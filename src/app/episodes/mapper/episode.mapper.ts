import { Episode } from "../interfaces/episode.interface";
import { ApiEpisode } from "../interfaces/rest-episode.interface";

export class EpisodeMapper{

  static mapApiEpisodeToEpisode(apiItem: ApiEpisode): Episode{

    return{
      id: apiItem.id,
      name: apiItem.name,
      air_date: apiItem.air_date,
      episode: apiItem.episode,
      characters: apiItem.characters,
      url: apiItem.url,
      created:   apiItem.created,
    }
  } //Esto es innecesario, no? Es igual que la interface ApiEpisode


  static mapApiEpisodeToEpisodeArray(apiItems: ApiEpisode[]): Episode[]{
    return apiItems.map(this.mapApiEpisodeToEpisode);
  }
}

