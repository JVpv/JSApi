interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER,

  defaults: {
    from: {
      email: 'email@email.com', //E-mail da API
      name: 'José Vítor', //Nome da empresa
    },
  },
} as IMailConfig;
