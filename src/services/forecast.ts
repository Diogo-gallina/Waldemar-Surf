import { StormGlass } from '@src/clients/stormGlass'

export interface Beach {
    name: string;
    positiron: string;
    lat: number;
    lng: number;
    user: string;
}

export class Forecast {
    constructor(protected stormGlass: StormGlass()){}

    public async processForecastForBeach(beaches: )
}