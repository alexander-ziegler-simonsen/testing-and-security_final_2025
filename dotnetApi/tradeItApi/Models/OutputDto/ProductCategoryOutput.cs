using System;
using System.Collections.Generic;

namespace tradeItApi.Models.OutputDto;

public partial class ProductCategoryOutput
{
    public int id { get; set; }

    public string name { get; set; } = null!;

    public int? fk_pc_parant_id { get; set; }
}
