-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."product_state" AS ENUM('Open', 'Sold', 'Deactivated');--> statement-breakpoint
CREATE TYPE "public"."user_type" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "ProductCategories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"fk_pc_parant_id" integer
);
--> statement-breakpoint
CREATE TABLE "Users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"hashedpassword" varchar(64) NOT NULL,
	"salt" varchar(36) NOT NULL,
	"firstname" varchar(255) NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(8) NOT NULL,
	"signedup" timestamp DEFAULT now() NOT NULL,
	"user_role" "user_type" DEFAULT 'user' NOT NULL,
	CONSTRAINT "Users_username_key" UNIQUE("username"),
	CONSTRAINT "Users_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "Products" (
	"id" serial PRIMARY KEY NOT NULL,
	"fk_user_id" integer,
	"title" varchar(255) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"description" text,
	"state" "product_state" DEFAULT 'Open' NOT NULL,
	"fk_productcategories_id" integer
);
--> statement-breakpoint
CREATE TABLE "ProductImages" (
	"id" serial PRIMARY KEY NOT NULL,
	"fk_product_id" integer NOT NULL,
	"imagepath" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"fk_user_id" integer,
	"public" boolean DEFAULT true NOT NULL,
	"fk_product_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ProductFavorite" (
	"id" serial PRIMARY KEY NOT NULL,
	"fk_user_id" integer,
	"fk_product_id" integer,
	CONSTRAINT "ProductFavorite_fk_user_id_fk_product_id_key" UNIQUE("fk_user_id","fk_product_id")
);
--> statement-breakpoint
ALTER TABLE "ProductCategories" ADD CONSTRAINT "ProductCategories_fk_pc_parant_id_fkey" FOREIGN KEY ("fk_pc_parant_id") REFERENCES "public"."ProductCategories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Products" ADD CONSTRAINT "Products_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "public"."Users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Products" ADD CONSTRAINT "Products_fk_productcategories_id_fkey" FOREIGN KEY ("fk_productcategories_id") REFERENCES "public"."ProductCategories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProductImages" ADD CONSTRAINT "ProductImages_fk_product_id_fkey" FOREIGN KEY ("fk_product_id") REFERENCES "public"."Products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "public"."Users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_fk_product_id_fkey" FOREIGN KEY ("fk_product_id") REFERENCES "public"."Products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProductFavorite" ADD CONSTRAINT "ProductFavorite_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "public"."Users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProductFavorite" ADD CONSTRAINT "ProductFavorite_fk_product_id_fkey" FOREIGN KEY ("fk_product_id") REFERENCES "public"."Products"("id") ON DELETE no action ON UPDATE no action;
*/