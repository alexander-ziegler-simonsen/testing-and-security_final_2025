import { pgTable, foreignKey, serial, varchar, integer, unique, timestamp, numeric, text, boolean, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const productState = pgEnum("product_state", ['Open', 'Sold', 'Deactivated'])
export const userType = pgEnum("user_type", ['user', 'admin'])


export const productCategories = pgTable("ProductCategories", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	fkPcParantId: integer("fk_pc_parant_id"),
}, (table) => [
	foreignKey({
			columns: [table.fkPcParantId],
			foreignColumns: [table.id],
			name: "ProductCategories_fk_pc_parant_id_fkey"
		}).onDelete("set null"),
]);

export const users = pgTable("Users", {
	id: serial().primaryKey().notNull(),
	username: varchar({ length: 255 }).notNull(),
	hashedpassword: varchar({ length: 64 }).notNull(),
	salt: varchar({ length: 36 }).notNull(),
	firstname: varchar({ length: 255 }).notNull(),
	lastname: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	phone: varchar({ length: 8 }).notNull(),
	signedup: timestamp({ mode: 'string' }).defaultNow().notNull(),
	userRole: userType("user_role").default('user').notNull(),
}, (table) => [
	unique("Users_username_key").on(table.username),
	unique("Users_email_key").on(table.email),
]);

export const products = pgTable("Products", {
	id: serial().primaryKey().notNull(),
	fkUserId: integer("fk_user_id"),
	title: varchar({ length: 255 }).notNull(),
	price: numeric({ precision: 10, scale:  2 }).notNull(),
	description: text(),
	state: productState().default('Open').notNull(),
	fkProductcategoriesId: integer("fk_productcategories_id"),
}, (table) => [
	foreignKey({
			columns: [table.fkUserId],
			foreignColumns: [users.id],
			name: "Products_fk_user_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.fkProductcategoriesId],
			foreignColumns: [productCategories.id],
			name: "Products_fk_productcategories_id_fkey"
		}).onDelete("set null"),
]);

export const productImages = pgTable("ProductImages", {
	id: serial().primaryKey().notNull(),
	fkProductId: integer("fk_product_id").notNull(),
	imagepath: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.fkProductId],
			foreignColumns: [products.id],
			name: "ProductImages_fk_product_id_fkey"
		}),
]);

export const comments = pgTable("Comments", {
	id: serial().primaryKey().notNull(),
	content: text().notNull(),
	fkUserId: integer("fk_user_id"),
	public: boolean().default(true).notNull(),
	fkProductId: integer("fk_product_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.fkUserId],
			foreignColumns: [users.id],
			name: "Comments_fk_user_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.fkProductId],
			foreignColumns: [products.id],
			name: "Comments_fk_product_id_fkey"
		}),
]);

export const productFavorite = pgTable("ProductFavorite", {
	id: serial().primaryKey().notNull(),
	fkUserId: integer("fk_user_id"),
	fkProductId: integer("fk_product_id"),
}, (table) => [
	foreignKey({
			columns: [table.fkUserId],
			foreignColumns: [users.id],
			name: "ProductFavorite_fk_user_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.fkProductId],
			foreignColumns: [products.id],
			name: "ProductFavorite_fk_product_id_fkey"
		}),
	unique("ProductFavorite_fk_user_id_fk_product_id_key").on(table.fkUserId, table.fkProductId),
]);
