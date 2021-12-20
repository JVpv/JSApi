import nodemailer from 'nodemailer';
import handlebarsMailTemplate from '@config/mail/handlebarsMailTemplate';

interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe Api JS JV',
        address: from?.email || 'no-reply@apijsjv.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject: subject,
      text: await handlebarsMailTemplate.parse(templateData),
    });

    console.log('Mensagem enviada: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
