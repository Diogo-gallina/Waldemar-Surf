import { AxiosStatic } from 'axios';

export interface StormGlassPointSource {
  [key: string]: number;
}

export interface StormGlassPoint {
  readonly time: string;
  readonly swellDirection: StormGlassPointSource;
  readonly swellHeight: StormGlassPointSource;
  readonly swellPeriod: StormGlassPointSource;
  readonly waveDirection: StormGlassPointSource;
  readonly waveHeight: StormGlassPointSource;
  readonly windDirection: StormGlassPointSource;
  readonly windSpeed: StormGlassPointSource;
}

export interface StormGlassForecastResponse {
  hours: StormGlassPoint[];
}

export interface ForecastPoint {
  time: string;
  swellDirection: number;
  swellHeight: number;
  swellPeriod: number;
  waveDirection: number;
  waveHeight: number;
  windDirection: number;
  windSpeed: number;
}

export class StormGlass {
  readonly stormGlassAPIParams =
    'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed';
  readonly stormGlassAPISource = 'noaaa';
  
  constructor(protected request: AxiosStatic) {}

  public async fetchPoints(latitude: number, longitude: number): Promise<{}> {
    const response = this.request.get<StormGlassForecastResponse>(
      `https://api.stormglass.io/v2/weather/point?lat=${latitude}&lng=${longitude}&params=${this.stormGlassAPIParams}&source=${this.stormGlassAPISource}`
    );
  }

  private normalizeResponse(points: StormGlassForecastResponse): ForecastPoint{

  }
}
