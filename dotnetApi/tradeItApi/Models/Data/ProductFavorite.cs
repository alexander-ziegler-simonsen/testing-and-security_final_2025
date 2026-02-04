using Riok.Mapperly.Abstractions;
using System;
using System.Collections.Generic;

namespace tradeItApi.Models.Data;

public partial class ProductFavorite
{
    public int id { get; set; }

    public int? fk_user_id { get; set; }

    public int? fk_product_id { get; set; }

    [MapperIgnore]
    public virtual Product? fk_product { get; set; }

    [MapperIgnore]
    public virtual User? fk_user { get; set; }
}
