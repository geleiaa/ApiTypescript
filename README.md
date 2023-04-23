### Api restful feita com Typescript, Express, Typeorm, Banco Relacional, Cache e mais 

### Workflow

...

### Routes doc
se quiser ver a documentação com mais detalhes, importe o arquivo swagger.json para o Swagger Editor https://editor.swagger.io/

![routes](https://github.com/geleiaa/ApiTypescript/blob/main/images/routes.png)

### O que tem de SOLID:

#### A aplicação segue 3 princípios do SOLID que ajudaram a manter o código bem dividido e fácil de ler. Os princípios seguidos são: 

* **Single-responsibility** --> esse princípio é o mais presente na aplicação, com a divisão de responsabilidade nos arquivos dos **Controllers**, **Services** e **Rotas**. Cada arquivo e sua implementação tem funções bem definidas e isoladas, que dependem apenas de uma abstração das classes de **Repository**. Você pode ver um exemplo no diretório de services de usuários, com cada arquivo tendo um responsabilidade diferente: 
![solid1](https://github.com/geleiaa/ApiTypescript/blob/main/images/users_services.png)


* **Interface-segregation** --> esse princípio foi aplicado da seguinte forma... como é usado o **Typeorm** de ORM para interação com o banco de dados, então foi implementado uma **Interface** para cada **Entity** e cada **Repository** do Typeorm, com isso tudo fica mais "padronizado".

1. As *Interfaces* padronizam os tipos e os dados que devem ser usados nas *Entities*, como no exemplo a seguir:

Typeorm Entity ![solid2](https://github.com/geleiaa/ApiTypescript/blob/main/images/entity.png) Interface ![solid3](https://github.com/geleiaa/ApiTypescript/blob/main/images/usrInterface.png)
e também padroniza os métodos usados nos *Repositories*

2. E os *Repositories* tem os seus métodos padronizados pelas *Intefaces* como nesse exemplo: 

Typeorm Repository ![solid2](https://github.com/geleiaa/ApiTypescript/blob/main/images/repository.png) Interface ![solid3](https://github.com/geleiaa/ApiTypescript/blob/main/images/repoInterface.png)



* **Dependency-inversion** -> para finalizar, esse princípio tem ligação com DDD, foi usado nos **Serivces**, nos **Repositories** e nas **Entities** para abstrair o máximo possível e evitar a dependência do Typeorm ou de qualquer ORM. Para exemplifcar deixo um Service de usuários, você pode ver que ele recebe interfaces como tipo e como dependência:

```typecript
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { IUsers } from '../domain/models/IUsers';
import { IUsersRepository } from '../domain/models/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class UserCreateService {
  constructor(private userRepo: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<IUsers> {
    const emailexists = await this.userRepo.findByEmail(email);

    if (emailexists) {
      throw new AppError('Esse email ja está cadastrado!!');
    }

    const hashedPass = await hash(password, 10); // hasheia a senha

    const user = await this.userRepo.create({
      name,
      email,
      password: hashedPass,
    });

    return user;
  }
}
```



### O que tem de DDD:

#### Seguindo algumas práticas do DDD como *desacoplamento* e *abstração*, a aplicação foi dividida em duas camadas principais, a camada de infra e a camada de domínio.

> #### A *Camada de Infra* tem todo o código relacionado a infraestrutura da aplicação como:

* Definição das **Rotas**.
* Os **Controllers** que recebem as requests.
* As **Entities** e **Repositories** que manipulam os dados e tem um vinculo direto com o Banco de Dados.

![infra](https://github.com/geleiaa/ApiTypescript/blob/main/images/camada_infra.png)

> #### *A Camada de Domínio* tem todo o código do *modelo de dados* definido por:

* **Interfaces** que padronizam os métodos dos *Repositories* a serem usados nos *Services* e também padronizam as *Entities* com os dados que serão recebidos na aplicação.
* **Services** com toda a **lógica/regra de negócio** necessaria.

![domain](https://github.com/geleiaa/ApiTypescript/blob/main/images/camada_domain.png)


Dev Notes: docker e datasource para prod ...