export interface AllCharacters {
  uid: string;
  name: string;
  url: string;
}

export interface GetCharactersResponse {
  results: AllCharacters[];
  total_records: number;
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
