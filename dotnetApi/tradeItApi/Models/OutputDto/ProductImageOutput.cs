using System;
using System.Collections.Generic;

namespace tradeItApi.Models.OutputDto;

public partial class ProductImageOutput
{
    public int id { get; set; }

    public int fk_product_id { get; set; }

    public string imagepath { get; set; } = null!;
}
