import axios from 'axios';
import {
  CharacterDetailResponse,
  CharacterInfo,
  UnifiedCharacter,
  CharacterSearchResponse,
  CharacterListResponse,
} from '../interfaces/person';

const BASE_URL = 'https://swapi.tech/api';

export const getCharacters = async (
  page: number,
  limit: number,
  name?: string
): Promise<{
  results: UnifiedCharacter[];
  totalPages: number;
}> => {
  const url = name
    ? `${BASE_URL}/people?name=${name}`
    : `${BASE_URL}/people?page=${page}&limit=${limit}`;

  if (name) {
    const res = await axios.get<CharacterSearchResponse>(url);
    const mapped: UnifiedCharacter[] = res.data.result.map((item) => ({
      uid: item.uid,
      name: item.properties.name,
      url: item.properties.url,
      properties: item.properties,
    }));
    return {
      results: mapped,
      totalPages: 1,
    };
  }

  const res = await axios.get<CharacterListResponse>(url);
  const mapped: UnifiedCharacter[] = res.data.results.map((item) => ({
    uid: item.uid,
    name: item.name,
    url: item.url,
    properties: {} as CharacterInfo,
  }));

  return {
    results: mapped,
    totalPages: Math.ceil(res.data.total_records / limit),
  };
};

export const getCharacterById = async (id: string) => {
  const res = await axios.get<CharacterDetailResponse>(
    `${BASE_URL}/people/${id}`
  );
  return res.data.result;
};
