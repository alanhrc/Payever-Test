import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('multer')
export class MulterController {
  @EventPattern('new-user')
  async handleBookCreatedEvent(data: Record<string, unknown>) {
    console.log(data);
  }
}
