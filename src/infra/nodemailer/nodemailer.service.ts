import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NodemailerService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(email: string, mensagem: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome!!!',
      html: `<h3 style="color: red">${mensagem}</h3>`,
    });
  }
}
