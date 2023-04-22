### Api restful de ecommerce com Typescript, Express, Typeorm, Banco Relacional, Cache e mais 

### Workflow

...

### Routes doc
se quiser ver a documentação com mais detalhes, importe o arquivo swagger.json para o Swagger Editor https://editor.swagger.io/

![routes](https://github.com/geleiaa/ApiTypescript/blob/main/images/routes.png)

### O que tem de SOLID:

* Single-responsibility -> cada classe deve ter uma responsabilidade
* Interface-segregation-principle -> muitas interfaces especificas é melhor do q uma interface global, para poder tipar varias coisas diferentes
* Dependency-inversion-priciple -> uma classe depender de uma abstração e não de uma implementação( ou uma lib/tool )

### O que tem de DDD:

#### Seguindo algumas práticas do DDD como **desacoplamento** e **abstração**, a aplicação foi dividida em duas camadas principais, a camada de infra e a camada de domínio.

#### A **Camada de Infra** tem todo o código relacionado a infraestrutura da aplicação como:

* Definição das **Rotas**.
* Os **Controllers** que recebem as requests.
* As **Entities** e **Repositories** que manipulam os dados e tem um vinculo direto com o Banco de Dados.

![infra](https://github.com/geleiaa/ApiTypescript/blob/main/images/camada_infra.png)

#### **A Camada de Domínio** tem todo o código do **modelo de dados** definido por:

* **Interfaces** que padronizam os métodos dos *Repositories* a serem usados nos *Services* e também padronizam as *Entities* com os dados que serão recebidos na aplicação.
* **Services** com toda a **lógica/regra de negócio** necessaria.

![domain](https://github.com/geleiaa/ApiTypescript/blob/main/images/camada_domain.png)


Dev Notes: docker e datasource para prod ...