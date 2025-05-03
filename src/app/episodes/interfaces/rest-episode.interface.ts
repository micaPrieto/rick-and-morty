export interface RESTEpisode {
  info:    Info;
  results: Episode[];
}

export interface Info {
  count: number;
  pages: number;
  next:  string | null;
  prev:  string| null;
}

export interface Episode {
  id:         number;
  name:       string;
  air_date:   string;
  episode:    string;
  characters: string[];
  url:        string;
  created:    Date;
}

//? Esta respuesta de la api, tambien hay que separarla en distintos archivos?
/*export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created:    Date;
}
 */
