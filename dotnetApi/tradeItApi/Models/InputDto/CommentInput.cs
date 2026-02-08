using System;
using System.Collections.Generic;

namespace tradeItApi.Models.InputDto;

public partial class CommentInput
{
    //public int id { get; set; }

    public string content { get; set; } = null!;

    public int? fk_user_id { get; set; }

    public bool _public { get; set; }

    public int fk_product_id { get; set; }
}
