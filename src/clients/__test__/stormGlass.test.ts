import { StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';

jest.mock('axios');

describe('StormGlass Client', () => {
  it('should return the normalized forecast from the StormGlass service', async () => {
    const latitude = -33.792726;
    const longitude = 151.289824;

axios.get = jest.fn().mockResolvedValue({});

    const stormGlass = new StormGlass(axios);
    const response = await stormGlass.fetchPoints(latitude, longitude);
    
    expect(response).toEqual({})
  });
})