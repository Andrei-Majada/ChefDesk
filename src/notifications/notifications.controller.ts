import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('whatsapp')
  @ApiOperation({ summary: 'Generate WhatsApp link for a quote' })
  @ApiBody({
    schema: {
      properties: { quoteId: { type: 'string' }, quote: { type: 'object' } },
    },
  })
  @ApiOkResponse({
    schema: {
      properties: {
        whatsappHref: { type: 'string' },
        message: { type: 'string' },
      },
    },
  })
  async whatsapp(@Body() body: { quoteId?: string; quote?: any }) {
    return this.notificationsService.generateWhatsapp(body.quoteId, body.quote);
  }
}
