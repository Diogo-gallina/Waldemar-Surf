import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Beach } from '@src/models/beach.model';
import { ForecastService } from '@src/services/forecast.service';
import { authMiddleware } from '@src/middlewares/auth.middleware';
import { BaseController } from './index';
import logger from '@src/logger';

const forecastService = new ForecastService();

@Controller('forecast')
@ClassMiddleware(authMiddleware)
export class ForecastController extends BaseController {
  @Get('')
  public async getForecastForgeLoggedUser(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const beaches = await Beach.find({ user: req.decoded?.id });
      const forecastData =
        await forecastService.processForecastForBeach(beaches);
      res.status(200).send(forecastData);
    } catch (error) {
      logger.error(error);
      res.status(500).send({ error: 'Something went wrong' });
    }
  }
}
