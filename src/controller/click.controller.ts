import { Controller, Get, Query } from '@midwayjs/core';
import axios from 'axios';

@Controller('/')
export class ClickController {
  @Get('/click')
  async click(
    @Query('click_id') clickId: string,
    @Query('ip') ip: string,
    @Query('adgroup_id') adId: string
  ): Promise<string> {
    if (!ip) {
      console.log('无 IP，跳过');
      return 'done';
    }
    const { data } = await axios.get('https://api.ip138.com/ip/', {
      headers: {
        token: '3d972ae9903b5111282f8c45b46eda10',
      },
      params: {
        ip,
      },
    });
    if (!data || !data.data) {
      console.log('没有获取到 IP 信息');
      return 'done';
    }
    console.log(`准备推送 adId = ${adId} IP = ${ip} 到企业微信`);
    const { data: ret } = await axios.post(
      'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=694be766-47a0-4b10-b903-bc9759d5b298',
      {
        msgtype: 'text',
        text: {
          content: `AdId：${adId}，Ip = ${JSON.stringify(data.data)}`,
        },
      }
    );
    return ret;
  }
}
