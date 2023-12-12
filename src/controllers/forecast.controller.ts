import { Controller, Get } from '@overnightjs/core';
import { Beach } from '@src/models/beach.model';
import { ForecastService } from '@src/services/forecast.service';
import { Request, Response } from 'express';

const forecastService = new ForecastService()
@Controller('forecast')
export class ForecastController {
  @Get('')
  public async getForecastForLoggedUser(_: Request, res: Response): Promise<void> {
    try {
    const beaches = await Beach.find({})
    const forecastData = await forecastService.processForecastForBeach(beaches);
    res.status(200).send(forecastData);
    } catch (err) {
      res.status(500).send({ error: 'Something went wrong'});
    }
  }
}
