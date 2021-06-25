import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { DurationInterceptor } from '@lib/common/interceptors/duration-interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseInterceptors(DurationInterceptor)
  @Get('getid')
  async findOne(@Query('id', ParseIntPipe) id: number) {
    return id;
  }
}
