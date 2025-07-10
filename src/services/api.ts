import axios from 'axios';
import { GetCharactersResponse } from '../interfaces/person';

const BASE_URL = 'https://swapi.tech/api';

export const getCharacters = async (
    page: number = 1,
    search: string = '',
    limit: number = 12
) => {
  const res = await axios.get<GetCharactersResponse>(`${BASE_URL}/people`, {
        params: {
            page,
            limit,
        },
    });

    const results = res.data.results;

    const filtered = search
        ? results.filter((char: any) =>
            char.name.toLowerCase().includes(search.toLowerCase())
        )
        : results;

    return {
        results: filtered,
        totalPages: Math.ceil(res.data.total_records / limit),
    };
};

export const getCharacterById = async (id: string) => {
    const res = await axios.get(`${BASE_URL}/people/${id}`);
    return res.data.result;
};
