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
    const { data: ret } = await axios.post(
      'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=694be766-47a0-4b10-b903-bc9759d5b298',
      {
        msgtype: 'text',
        text: {
          content: 'hello',
        },
      }
    );
    return ret;
  }
}
