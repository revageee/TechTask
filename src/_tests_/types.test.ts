import {
  UnifiedCharacter,
  CharacterInfo,
  CharacterDetailResponse,
  CharacterSearchResponse,
  CharacterListResponse,
} from '../interfaces/person';

describe('Type Definitions', () => {
  describe('CharacterInfo', () => {
    it('should have all required properties', () => {
      const character: CharacterInfo = {
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
      };

      expect(character.name).toBe('Luke Skywalker');
      expect(character.birth_year).toBe('19BBY');
      expect(character.eye_color).toBe('blue');
      expect(character.gender).toBe('male');
      expect(character.hair_color).toBe('blond');
      expect(character.height).toBe('172');
      expect(character.mass).toBe('77');
      expect(character.skin_color).toBe('fair');
      expect(character.homeworld).toBe('Tatooine');
      expect(character.films).toEqual(['A New Hope']);
      expect(character.species).toEqual(['Human']);
      expect(character.starships).toEqual(['X-wing']);
      expect(character.vehicles).toEqual(['Snowspeeder']);
      expect(character.url).toBe('https://swapi.tech/api/people/1');
    });

    it('should allow optional description property', () => {
      const characterWithDescription: CharacterInfo = {
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
        description: 'A Jedi Knight',
      };

      expect(characterWithDescription.description).toBe('A Jedi Knight');
    });
  });

  describe('UnifiedCharacter', () => {
    it('should have correct structure', () => {
      const unifiedCharacter: UnifiedCharacter = {
        uid: '1',
        name: 'Luke Skywalker',
        url: 'https://swapi.tech/api/people/1',
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
      };

      expect(unifiedCharacter.uid).toBe('1');
      expect(unifiedCharacter.name).toBe('Luke Skywalker');
      expect(unifiedCharacter.url).toBe('https://swapi.tech/api/people/1');
      expect(unifiedCharacter.properties.name).toBe('Luke Skywalker');
    });
  });

  describe('CharacterDetailResponse', () => {
    it('should have correct API response structure', () => {
      const apiResponse: CharacterDetailResponse = {
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

      expect(apiResponse.message).toBe('ok');
      expect(apiResponse.result.uid).toBe('1');
      expect(apiResponse.result._id).toBe('1');
      expect(apiResponse.result.description).toBe('Luke Skywalker');
      expect(apiResponse.result.properties.name).toBe('Luke Skywalker');
    });
  });

  describe('CharacterSearchResponse', () => {
    it('should have correct search response structure', () => {
      const searchResponse: CharacterSearchResponse = {
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

      expect(searchResponse.message).toBe('ok');
      expect(searchResponse.result).toHaveLength(1);
      expect(searchResponse.result[0].uid).toBe('1');
      expect(searchResponse.result[0].properties.name).toBe('Luke Skywalker');
    });
  });

  describe('CharacterListResponse', () => {
    it('should have correct list response structure', () => {
      const listResponse: CharacterListResponse = {
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
            uid: '4',
            name: 'Darth Vader',
            url: 'https://swapi.tech/api/people/4',
          },
        ],
      };

      expect(listResponse.message).toBe('ok');
      expect(listResponse.total_records).toBe(10);
      expect(listResponse.total_pages).toBe(2);
      expect(listResponse.previous).toBeNull();
      expect(listResponse.next).toBe(
        'https://swapi.tech/api/people?page=2&limit=6'
      );
      expect(listResponse.results).toHaveLength(2);
      expect(listResponse.results[0].uid).toBe('1');
      expect(listResponse.results[0].name).toBe('Luke Skywalker');
      expect(listResponse.results[1].uid).toBe('4');
      expect(listResponse.results[1].name).toBe('Darth Vader');
    });
  });

  describe('Type Compatibility', () => {
    it('should allow UnifiedCharacter to be used in arrays', () => {
      const characters: UnifiedCharacter[] = [
        {
          uid: '1',
          name: 'Luke Skywalker',
          url: 'https://swapi.tech/api/people/1',
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
      ];

      expect(characters).toHaveLength(1);
      expect(characters[0].name).toBe('Luke Skywalker');
    });

    it('should allow CharacterInfo to be nullable', () => {
      const character: CharacterInfo | null = null;
      expect(character).toBeNull();
    });

    it('should allow arrays of strings for films, species, starships, vehicles', () => {
      const character: CharacterInfo = {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        eye_color: 'blue',
        gender: 'male',
        hair_color: 'blond',
        height: '172',
        mass: '77',
        skin_color: 'fair',
        homeworld: 'Tatooine',
        films: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
        species: ['Human'],
        starships: ['X-wing', 'Millennium Falcon'],
        vehicles: ['Snowspeeder', 'Landspeeder'],
        url: 'https://swapi.tech/api/people/1',
      };
      expect(character.films).toHaveLength(3);
      expect(character.species).toHaveLength(1);
      expect(character.starships).toHaveLength(2);
      expect(character.vehicles).toHaveLength(2);
    });
  });
});
