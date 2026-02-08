using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using tradeItApi.Models.Data;

namespace tradeItApi.Data;

public partial class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductCategory> ProductCategories { get; set; }

    public virtual DbSet<ProductFavorite> ProductFavorites { get; set; }

    public virtual DbSet<ProductImage> ProductImages { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .HasPostgresEnum("product_state", new[] { "Open", "Sold", "Deactivated" })
            .HasPostgresEnum("user_type", new[] { "user", "admin" });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.id).HasName("Comments_pkey");

            entity.Property(e => e._public)
                .HasDefaultValue(true)
                .HasColumnName("public");

            entity.HasOne(d => d.fk_product).WithMany(p => p.Comments)
                .HasForeignKey(d => d.fk_product_id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Comments_fk_product_id_fkey");

            entity.HasOne(d => d.fk_user).WithMany(p => p.Comments)
                .HasForeignKey(d => d.fk_user_id)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("Comments_fk_user_id_fkey");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.id).HasName("Products_pkey");

            entity.Property(e => e.price).HasPrecision(10, 2);
            entity.Property(e => e.title).HasMaxLength(255);

            entity.HasOne(d => d.fk_productcategories).WithMany(p => p.Products)
                .HasForeignKey(d => d.fk_productcategories_id)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("Products_fk_productcategories_id_fkey");

            entity.HasOne(d => d.fk_user).WithMany(p => p.Products)
                .HasForeignKey(d => d.fk_user_id)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("Products_fk_user_id_fkey");
        });

        modelBuilder.Entity<ProductCategory>(entity =>
        {
            entity.HasKey(e => e.id).HasName("ProductCategories_pkey");

            entity.Property(e => e.name).HasMaxLength(255);

            entity.HasOne(d => d.fk_pc_parant).WithMany(p => p.Inversefk_pc_parant)
                .HasForeignKey(d => d.fk_pc_parant_id)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("ProductCategories_fk_pc_parant_id_fkey");
        });

        modelBuilder.Entity<ProductFavorite>(entity =>
        {
            entity.HasKey(e => e.id).HasName("ProductFavorite_pkey");

            entity.ToTable("ProductFavorite");

            entity.HasIndex(e => new { e.fk_user_id, e.fk_product_id }, "ProductFavorite_fk_user_id_fk_product_id_key").IsUnique();

            entity.HasOne(d => d.fk_product).WithMany(p => p.ProductFavorites)
                .HasForeignKey(d => d.fk_product_id)
                .HasConstraintName("ProductFavorite_fk_product_id_fkey");

            entity.HasOne(d => d.fk_user).WithMany(p => p.ProductFavorites)
                .HasForeignKey(d => d.fk_user_id)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("ProductFavorite_fk_user_id_fkey");
        });

        modelBuilder.Entity<ProductImage>(entity =>
        {
            entity.HasKey(e => e.id).HasName("ProductImages_pkey");

            entity.HasOne(d => d.fk_product).WithMany(p => p.ProductImages)
                .HasForeignKey(d => d.fk_product_id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ProductImages_fk_product_id_fkey");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.id).HasName("Users_pkey");

            entity.HasIndex(e => e.email, "Users_email_key").IsUnique();

            entity.HasIndex(e => e.username, "Users_username_key").IsUnique();

            entity.Property(e => e.email).HasMaxLength(255);
            entity.Property(e => e.firstname).HasMaxLength(255);
            entity.Property(e => e.hashedpassword).HasMaxLength(64);
            entity.Property(e => e.lastname).HasMaxLength(255);
            entity.Property(e => e.phone).HasMaxLength(8);
            entity.Property(e => e.salt).HasMaxLength(36);
            entity.Property(e => e.signedup)
                .HasDefaultValueSql("now()")
                .HasColumnType("timestamp without time zone");
            entity.Property(e => e.username).HasMaxLength(255);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
