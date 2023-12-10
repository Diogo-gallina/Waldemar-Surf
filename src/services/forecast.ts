import { StormGlass } from '@src/clients/stormGlass'

export enum BeachPosition {
    S = 'S',
    E = 'E',
    W = 'W',
    N = 'N'
}

export interface Beach {
    name: string;
    position: BeachPosition;
    lat: number;
    lng: number;
    user: string;
}

export class Forecast {
    constructor(protected stormGlass = StormGlass()) {}

    public async processForecastForBeach(beaches: Beach[]): Promise<[]> {
        const pointsWithCorrectSources = [];
        for(const beach of beaches){
            const points = await this.stormGlass.fetchPoints(beach.lat, beach.lng);
            const enrichedBeachData = points.map((e) => ({
                ...{
                    lat: beach.lat,
                    lng: beach.lng,
                    name: beach.name,
                    position: beach.position,
                    rating: 1
                },
                ...e,
            }))
        }
    }
}