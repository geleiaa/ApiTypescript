import Handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVars {
  [key: string]: string | number;
}

interface IMailTemplate {
  file: string;
  variables: ITemplateVars;
}

export class handlebarsMailTemplate {
  public async parse({ file, variables }: IMailTemplate): Promise<string> {
    const template = await fs.promises.readFile(file, { encoding: 'utf-8' });

    const parseTemplate = Handlebars.compile(template);

    return parseTemplate(variables);
  }
}
