import { StormGlass } from '@src/clients/stormGlass';
import stormGlassWeather3HoursFixture from '@test/fixtures/stormglass_weather_3_hours.json';
import stormGlassNormalized3HoursFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json';
import * as HTTPUtil from '@src/util/request';

jest.mock('@src/util/request');

describe('StormGlass Client', () => {
  const MockedRequestClass = HTTPUtil.Request as jest.Mocked<
    typeof HTTPUtil.Request
  >;

  const mockedRequest = new HTTPUtil.Request() as jest.Mocked<HTTPUtil.Request>;

  it('should return the normalized forecast from the StormGlass service', async () => {
    const latitude = -33.792726;
    const longitude = 151.289824;

    mockedRequest.get.mockResolvedValue({
      data: stormGlassWeather3HoursFixture,
    } as HTTPUtil.Response);

    const stormGlass = new StormGlass(mockedRequest);
    const response = await stormGlass.fetchPoints(latitude, longitude);

    expect(response).toEqual(stormGlassNormalized3HoursFixture);
  });

  it('should exclude incomplete data points', async () => {
    const latitude = -33.792726;
    const longitude = 151.289824;
    const incompleteResponse = {
      hours: [
        {
          windDirection: {
            noaa: 300,
          },
          time: '2023-04-26T00:00:00+00:00',
        },
      ],
    };

    mockedRequest.get.mockResolvedValue({
      data: incompleteResponse,
    } as HTTPUtil.Response);

    const stormGlass = new StormGlass(mockedRequest);
    const response = await stormGlass.fetchPoints(latitude, longitude);

    expect(response).toEqual([]);
  });

  it('should get a generic error from StormGlass service when the request fail before reaching the service', async () => {
    const latitude = -33.792726;
    const longitude = 151.289824;

    mockedRequest.get.mockRejectedValue('Network Error');

    const stormGlass = new StormGlass(mockedRequest);

    await expect(stormGlass.fetchPoints(latitude, longitude)).rejects.toThrow(
      'Unexpected error when trying to communicate to StormGlass: "Network Error"'
    );
  });

  it('should get an StormGlassResponseError when the StormGlass service responds with error', async () => {
    const latitude = -33.792726;
    const longitude = 151.289824;

    class FakeAxiosError extends Error {
      constructor(public response: object) {
        super();
      }
    }

    mockedRequest.get.mockRejectedValue(
      new FakeAxiosError({
        status: 429,
        data: { errors: ['Rate Limit reached'] },
      })
    );

    MockedRequestClass.isRequestError.mockReturnValue(true);

    MockedRequestClass.extractErrorData.mockReturnValue({
      status: 429,
      data: { errors: ['Rate Limit reached'] },
    });

    const stormGlass = new StormGlass(mockedRequest);

    await expect(stormGlass.fetchPoints(latitude, longitude)).rejects.toThrow(
      'Unexpected error returned by the StormGlass service: Error: {"errors":["Rate Limit reached"]} Code: 429'
    );
  });
});
