import { Episode } from "./episode.interface";

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

