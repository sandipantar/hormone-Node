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
