import { Character } from "../interfaces/character.interface";
import { ApiItem } from "../interfaces/rest-characters.interface";


export class CharacterMapper{

  static mapApiItemToCharacter(apiItem: ApiItem): Character{

    return{
       id:  apiItem.id,
       name: apiItem.name ,
       status: apiItem.status,
       species:  apiItem.species,
       gender:  apiItem.gender,
       origin:   apiItem.origin,
       location: apiItem.location,
       image:    apiItem.image,
       episode: apiItem.episode
    }
  }

  static mapApiItemToCharacterArray(apiItems: ApiItem[]): Character[]{
    return apiItems.map(this.mapApiItemToCharacter);
  }
}

