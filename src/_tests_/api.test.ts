jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

import axios from 'axios';
import { getCharacters, getCharacterById } from '../services/api';
import {
  CharacterSearchResponse,
  CharacterListResponse,
  CharacterDetailResponse,
} from '../interfaces/person';

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCharacters', () => {
    it('should fetch characters with search', async () => {
      const mockSearchResponse: CharacterSearchResponse = {
        message: 'ok',
        result: [
          {
            uid: '1',
            _id: '1',
            description: 'Luke Skywalker',
            properties: {
              name: 'Luke Skywalker',
              birth_year: '19BBY',
              eye_color: 'blue',
              gender: 'male',
              hair_color: 'blond',
              height: '172',
              mass: '77',
              skin_color: 'fair',
              homeworld: 'Tatooine',
              films: ['A New Hope'],
              species: ['Human'],
              starships: ['X-wing'],
              vehicles: ['Snowspeeder'],
              url: 'https://swapi.tech/api/people/1',
            },
          },
        ],
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockSearchResponse });

      const result = await getCharacters(1, 6, 'Luke');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://swapi.tech/api/people?name=Luke'
      );
      expect(result.results).toHaveLength(1);
      expect(result.results[0].name).toBe('Luke Skywalker');
      expect(result.results[0].uid).toBe('1');
      expect(result.totalPages).toBe(1);
    });

    it('should fetch characters without search', async () => {
      const mockListResponse: CharacterListResponse = {
        message: 'ok',
        total_records: 10,
        total_pages: 2,
        previous: null,
        next: 'https://swapi.tech/api/people?page=2&limit=6',
        results: [
          {
            uid: '1',
            name: 'Luke Skywalker',
            url: 'https://swapi.tech/api/people/1',
          },
          {
            uid: '2',
            name: 'Darth Vader',
            url: 'https://swapi.tech/api/people/2',
          },
        ],
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockListResponse });

      const result = await getCharacters(1, 6);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://swapi.tech/api/people?page=1&limit=6'
      );
      expect(result.results).toHaveLength(2);
      expect(result.results[0].name).toBe('Luke Skywalker');
      expect(result.results[1].name).toBe('Darth Vader');
      expect(result.totalPages).toBe(2);
    });

    it('should handle API errors', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(getCharacters(1, 6)).rejects.toThrow('API Error');
    });
  });

  describe('getCharacterById', () => {
    it('should fetch character by ID', async () => {
      const mockDetailResponse: CharacterDetailResponse = {
        message: 'ok',
        result: {
          uid: '1',
          _id: '1',
          description: 'Luke Skywalker',
          properties: {
            name: 'Luke Skywalker',
            birth_year: '19BBY',
            eye_color: 'blue',
            gender: 'male',
            hair_color: 'blond',
            height: '172',
            mass: '77',
            skin_color: 'fair',
            homeworld: 'Tatooine',
            films: ['A New Hope'],
            species: ['Human'],
            starships: ['X-wing'],
            vehicles: ['Snowspeeder'],
            url: 'https://swapi.tech/api/people/1',
          },
        },
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockDetailResponse });

      const result = await getCharacterById('1');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://swapi.tech/api/people/1'
      );
      expect(result.uid).toBe('1');
      expect(result.properties.name).toBe('Luke Skywalker');
      expect(result.description).toBe('Luke Skywalker');
    });

    it('should handle API errors for character by ID', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Character not found'));

      await expect(getCharacterById('999')).rejects.toThrow(
        'Character not found'
      );
    });
  });
});
