import { StormGlass } from '@src/clients/stormGlass'

export enum BeachPosition {
    S = 'S',
    E = 'E',
    W = 'W',
    N = 'N'
}

export interface Beach {
    name: string;
    positiron: BeachPosition;
    lat: number;
    lng: number;
    user: string;
}

export class Forecast {
    constructor(protected stormGlass: StormGlass()){}

    public async processForecastForBeach(beaches: )
}