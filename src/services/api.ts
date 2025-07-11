import axios from 'axios';
import {
  CharacterDetailResponse,
  CharacterInfo,
  UnifiedCharacter,
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

  const res = await axios.get(url);
  const data = res.data;

  if (name) {
    const mapped = data.result.map((item: any) => ({
      ...item.properties,
      uid: item.uid,
      description: item.description,
      _id: item._id,
    }));
    return {
      results: mapped,
      totalPages: 1,
    };
  }

  // Без пошуку - список з uid, name, url
  return {
    results: data.results,
    totalPages: Math.ceil(data.total_records / limit),
  };
};

export const getCharacterById = async (id: string) => {
  const res = await axios.get<CharacterDetailResponse>(
    `${BASE_URL}/people/${id}`
  );
  return res.data.result;
};
