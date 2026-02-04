using System;
using System.Collections.Generic;

namespace tradeItApi.Models.InputDto;

public partial class ProductInput
{
    public int id { get; set; }

    public int? fk_user_id { get; set; }

    public string title { get; set; } = null!;

    public decimal price { get; set; }

    public string? description { get; set; }

    public int? fk_productcategories_id { get; set; }
}
