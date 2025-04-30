export interface RESTEpisode {
  info:    Info;
  results: ApiEpisode[];
}

export interface Info {
  count: number;
  pages: number;
  next:  string | null;
  prev:  string| null;
}

export interface ApiEpisode {
  id:         number;
  name:       string;
  air_date:   string;
  episode:    string;
  characters: string[];
  url:        string;
  created:    Date;
}
