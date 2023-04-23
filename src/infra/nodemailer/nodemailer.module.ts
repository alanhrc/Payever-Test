import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';
import { NodemailerController } from './nodemailer.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: `${process.env.MAIL_SERVICE}`,
        secure: false,
        port: Number(`${process.env.MAIL_SMTP_PORT}`),
        auth: {
          user: `${process.env.MAIL_EMAIL}`,
          pass: `${process.env.MAIL_PASSWORD}`,
        },
        ignoreTLS: true,
        requireTLS: false,
      },
      defaults: {
        from: `${process.env.MAIL_EMAIL}`,
      },
    }),
  ],
  providers: [NodemailerService],
  exports: [NodemailerService],
  controllers: [NodemailerController],
})
export class NodemailerModule {}
