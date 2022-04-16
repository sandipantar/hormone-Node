import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Student } from '../student/student.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(std: Student, token: string) {
    const url = `kolkatahormonefoundation.org/auth/confirm?token=${token}`;

    return await this.mailerService.sendMail({
      to: std.studentEmail,
      // from: '"Support Team" <support@kolkatahormonefoundation.com>', // override default from
      subject: 'Welcome to Kolkata Hormone Foundation! Confirm your Email',
      template: './confirmation',
      context: {
        name: std.studentName,
        url,
      },
    });
  }
}
