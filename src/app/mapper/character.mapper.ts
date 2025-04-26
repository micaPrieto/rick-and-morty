
import { Character } from "../interfaces/character.interface";
import { ApiResponse, ApiItem } from "../interfaces/api-item";

export class CharacterMapper{

  static mapApiItemToCharacter(item: ApiItem): Character{

    return{
       id:  item.id,
       name: item.name ,
       status: item.status,
       species:  item.species,
       gender:  item.gender,
       origin:   item.origin,
       location: item.location,
       image:    item.image,
       episodes: item.episode
    }
  }

  static mapApiItemToCharacterArray(items: ApiItem[]): Character[]{
    return items.map(this.mapApiItemToCharacter);
  }
}

