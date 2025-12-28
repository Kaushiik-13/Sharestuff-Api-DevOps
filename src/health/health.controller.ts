import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  health() {
    return { status: 'ok' };
  }

  @Get()
  healthv1() {
    return { status: 'v1-ok' };
  }
}
