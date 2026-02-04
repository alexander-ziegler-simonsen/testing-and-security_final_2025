using Riok.Mapperly.Abstractions;
using System;
using System.Collections.Generic;

namespace tradeItApi.Models.Data;

public partial class Comment
{
    public int id { get; set; }

    public string content { get; set; } = null!;

    public int? fk_user_id { get; set; }

    public bool _public { get; set; }

    public int fk_product_id { get; set; }

    [MapperIgnore]
    public virtual Product fk_product { get; set; } = null!;

    [MapperIgnore]
    public virtual User? fk_user { get; set; }
}
