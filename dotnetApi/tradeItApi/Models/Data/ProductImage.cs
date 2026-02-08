using Riok.Mapperly.Abstractions;
using System;
using System.Collections.Generic;

namespace tradeItApi.Models.Data;

public partial class ProductImage
{
    public int id { get; set; }

    public int fk_product_id { get; set; }

    public string imagepath { get; set; } = null!;

    [MapperIgnore]
    public virtual Product fk_product { get; set; } = null!;
}
