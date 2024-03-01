import { Controller, Get, Query } from "@midwayjs/core";

@Controller('/')
export class ClickController {
  @Get('/click')
  async click(@Query('click_id') clickId: string): Promise<string> {
    console.log('clickId:', clickId);
    return 'done';
  }
}
