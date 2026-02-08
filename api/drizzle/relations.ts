import { relations } from "drizzle-orm/relations";
import { productCategories, users, products, productImages, comments, productFavorite } from "./schema";

export const productCategoriesRelations = relations(productCategories, ({one, many}) => ({
	productCategory: one(productCategories, {
		fields: [productCategories.fkPcParantId],
		references: [productCategories.id],
		relationName: "productCategories_fkPcParantId_productCategories_id"
	}),
	productCategories: many(productCategories, {
		relationName: "productCategories_fkPcParantId_productCategories_id"
	}),
	products: many(products),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	user: one(users, {
		fields: [products.fkUserId],
		references: [users.id]
	}),
	productCategory: one(productCategories, {
		fields: [products.fkProductcategoriesId],
		references: [productCategories.id]
	}),
	productImages: many(productImages),
	comments: many(comments),
	productFavorites: many(productFavorite),
}));

export const usersRelations = relations(users, ({many}) => ({
	products: many(products),
	comments: many(comments),
	productFavorites: many(productFavorite),
}));

export const productImagesRelations = relations(productImages, ({one}) => ({
	product: one(products, {
		fields: [productImages.fkProductId],
		references: [products.id]
	}),
}));

export const commentsRelations = relations(comments, ({one}) => ({
	user: one(users, {
		fields: [comments.fkUserId],
		references: [users.id]
	}),
	product: one(products, {
		fields: [comments.fkProductId],
		references: [products.id]
	}),
}));

export const productFavoriteRelations = relations(productFavorite, ({one}) => ({
	user: one(users, {
		fields: [productFavorite.fkUserId],
		references: [users.id]
	}),
	product: one(products, {
		fields: [productFavorite.fkProductId],
		references: [products.id]
	}),
}));