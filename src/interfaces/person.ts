export interface UnifiedCharacter extends CharacterDetailResponse {
  uid: string;
  name: string;
  url: string;
  properties: CharacterInfo;
}

export interface CharacterDetailResponse {
  message: string;
  result: {
    uid: string;
    _id: string;
    description: string;
    properties: CharacterInfo;
  };
}

export interface CharacterInfo {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  description?: string;
}
