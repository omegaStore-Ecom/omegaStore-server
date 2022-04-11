import { Injectable } from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) { }
  getHello(): string {
    return 'Hello World!';
  }
  public example2(): void {
    this
        .mailerService
        .sendMail({
          to: 'user@gmail.com', // List of receivers email address
          from: 'user@outlook.com', // Senders email address
          subject: 'Testing Nest Mailermodule with template ✔',
          template: 'index', // The `.pug` or `.hbs` extension is appended automatically.
          context: {  // Data to be sent to template engine.
            code: 'cf1a3f828287',
            username: 'john doe',
          },
        })
        .then((success) => {
          console.log(success)
        })
        .catch((err) => {
          console.log(err)
        });
  }
}
