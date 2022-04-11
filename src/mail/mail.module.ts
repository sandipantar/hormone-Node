import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: 'smtp.sendgrid.net',
        secure: false,
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@kolkatahormonefoundation.org>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
