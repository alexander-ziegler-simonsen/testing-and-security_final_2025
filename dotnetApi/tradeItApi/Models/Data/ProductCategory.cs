using Riok.Mapperly.Abstractions;
using System;
using System.Collections.Generic;

namespace tradeItApi.Models.Data;

public partial class ProductCategory
{
    public int id { get; set; }

    public string name { get; set; } = null!;

    public int? fk_pc_parant_id { get; set; }

    [MapperIgnore]
    public virtual ICollection<ProductCategory> Inversefk_pc_parant { get; set; } = new List<ProductCategory>();

    [MapperIgnore]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    [MapperIgnore]
    public virtual ProductCategory? fk_pc_parant { get; set; }
}
