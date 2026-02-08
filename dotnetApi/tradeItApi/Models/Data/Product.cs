using Riok.Mapperly.Abstractions;
using System;
using System.Collections.Generic;

namespace tradeItApi.Models.Data;

public partial class Product
{
    public int id { get; set; }

    public int? fk_user_id { get; set; }

    public string title { get; set; } = null!;

    public decimal price { get; set; }

    public string? description { get; set; }

    public int? fk_productcategories_id { get; set; }

    [MapperIgnore]
    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    [MapperIgnore]
    public virtual ICollection<ProductFavorite> ProductFavorites { get; set; } = new List<ProductFavorite>();

    [MapperIgnore]
    public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();

    [MapperIgnore]
    public virtual ProductCategory? fk_productcategories { get; set; }

    [MapperIgnore]
    public virtual User? fk_user { get; set; }
}
