-- Adminer 4.8.0 PostgreSQL 15.1 dump

DROP TABLE IF EXISTS "migrations";
DROP SEQUENCE IF EXISTS migrations_id_seq;
/*CREATE SEQUENCE migrations_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."migrations" (
    "id" integer DEFAULT nextval('migrations_id_seq') NOT NULL,
    "timestamp" bigint NOT NULL,
    "name" character varying NOT NULL,
    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "migrations" ("id", "timestamp", "name") VALUES
(1,	1678303702054,	'CreateProducts1678303702054'),
(2,	1678505225817,	'CreateUsers1678505225817'),
(3,	1678728473113,	'CreateUserTokens1678728473113'),
(4,	1679025682333,	'CreateOrders1679025682333'),
(5,	1679029281691,	'CreateOrdersProducts1679029281691');
*/

DROP TABLE IF EXISTS "orders";
CREATE TABLE "public"."orders" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "orders_products";
CREATE TABLE "public"."orders_products" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "price" character varying NOT NULL,
    "quantity" integer NOT NULL,
    "order_id" uuid,
    "product_id" uuid,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_4945c6758fd65ffacda760b4ac9" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "products";
CREATE TABLE "public"."products" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "name" character varying NOT NULL,
    "price" numeric(10,2) NOT NULL,
    "quantity" integer NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "user_tokens";
CREATE TABLE "public"."user_tokens" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "token" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_63764db9d9aaa4af33e07b2f4bf" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "users";
CREATE TABLE "public"."users" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "name" character varying NOT NULL,
    "email" character varying NOT NULL,
    "password" character varying NOT NULL,
    "avatar" character varying,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"),
    CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
) WITH (oids = false);


ALTER TABLE ONLY "public"."orders" ADD CONSTRAINT "OrdersUser" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL NOT DEFERRABLE;

ALTER TABLE ONLY "public"."orders_products" ADD CONSTRAINT "OrdersProductsOrder" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL NOT DEFERRABLE;
ALTER TABLE ONLY "public"."orders_products" ADD CONSTRAINT "OrdersProductsProduct" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL NOT DEFERRABLE;

ALTER TABLE ONLY "public"."user_tokens" ADD CONSTRAINT "TokenUser" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

-- 2023-04-24 04:55:38.44932+00
