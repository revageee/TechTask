export interface UnifiedCharacter {
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

export interface CharacterSearchResponse {
  message: string;
  result: Array<{
    uid: string;
    _id: string;
    description: string;
    properties: CharacterInfo;
  }>;
}

export interface CharacterListResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: Array<{
    uid: string;
    name: string;
    url: string;
  }>;
}
