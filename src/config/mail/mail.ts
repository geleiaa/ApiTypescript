interface IMailConfig {
  driver: 'ethereal' | 'other email service';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'equipeapi@geleia.com',
      name: 'Equipe Geleia Api',
    },
  },
} as IMailConfig;
