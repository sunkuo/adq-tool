import { Controller, Get, Query } from '@midwayjs/core';
import axios from 'axios';

@Controller('/')
export class ClickController {
  @Get('/click')
  async click(
    @Query('click_id') clickId: string,
    @Query('ip') ip: string
  ): Promise<string> {
    if (!ip) return 'done';
    const { data } = await axios.get('https://api.ip138.com/ip/', {
      headers: {
        token: '3d972ae9903b5111282f8c45b46eda10',
      },
      params: {
        ip,
      },
    });
    console.log('clickId:', clickId, 'ip: ', ip, 'region: ', data.data);
    return 'done';
  }
}
