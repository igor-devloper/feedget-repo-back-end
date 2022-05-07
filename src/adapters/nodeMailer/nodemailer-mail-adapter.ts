import { MailAdapter, sendMailData } from "../mail-adapter"
import nodemailer from 'nodemailer';


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "da9aeb331ebed0",
    pass: "63e1df37dc203e"
  }   
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: sendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Igor Wagner <wagnerigor9@gmail.com>',
      subject,
      html: body,
    })
  }
}