import { saveCharacter, getSavedCharacter } from '../utils/localStorageUtils';
import { CharacterInfo } from '../interfaces/person';

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('localStorage Utils', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  describe('saveCharacter', () => {
    it('should save character data to localStorage', () => {
      const mockCharacter: CharacterInfo = {
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

      saveCharacter('1', mockCharacter);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'character_1',
        JSON.stringify(mockCharacter)
      );
    });

    it('should save character with description', () => {
      const mockCharacter: CharacterInfo = {
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

      saveCharacter('1', mockCharacter);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'character_1',
        JSON.stringify(mockCharacter)
      );
    });
  });

  describe('getSavedCharacter', () => {
    it('should retrieve character data from localStorage', () => {
      const mockCharacter: CharacterInfo = {
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

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockCharacter));

      const result = getSavedCharacter('1');

      expect(localStorageMock.getItem).toHaveBeenCalledWith('character_1');
      expect(result).toEqual(mockCharacter);
    });

    it('should return null when character is not found', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = getSavedCharacter('999');

      expect(localStorageMock.getItem).toHaveBeenCalledWith('character_999');
      expect(result).toBeNull();
    });

    it('should handle invalid JSON data', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');

      const result = getSavedCharacter('1');

      expect(localStorageMock.getItem).toHaveBeenCalledWith('character_1');
      expect(result).toBeNull();
    });
  });

  describe('Integration', () => {
    it('should save and retrieve character data correctly', () => {
      const mockCharacter: CharacterInfo = {
        name: 'Darth Vader',
        birth_year: '41.9BBY',
        eye_color: 'yellow',
        gender: 'male',
        hair_color: 'none',
        height: '202',
        mass: '136',
        skin_color: 'white',
        homeworld: 'Tatooine',
        films: ['A New Hope', 'The Empire Strikes Back'],
        species: ['Human'],
        starships: ['TIE Advanced x1'],
        vehicles: ['AT-AT'],
        url: 'https://swapi.tech/api/people/4',
      };

      saveCharacter('4', mockCharacter);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'character_4',
        JSON.stringify(mockCharacter)
      );

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockCharacter));

      const retrievedCharacter = getSavedCharacter('4');

      expect(retrievedCharacter).toEqual(mockCharacter);
      expect(retrievedCharacter?.name).toBe('Darth Vader');
      expect(retrievedCharacter?.birth_year).toBe('41.9BBY');
    });
  });
});
