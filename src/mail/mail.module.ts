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
        secure: true,
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