export interface Comment {
  id: string;
  comment: string;
  userId: string;
  episodeId: string;
  userName: string;
  creationDate: Date;
  updateDate?: string;
  state: boolean;
}
