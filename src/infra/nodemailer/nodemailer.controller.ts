import { Controller, Post, Request } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Controller('email')
export class NodemailerController {
  constructor(private nodemailerService: NodemailerService) {}

  @Post('send')
  enviarEmail(@Request() req) {
    return this.nodemailerService.sendEmail(req.body.email, req.body.mensagem);
  }
}
