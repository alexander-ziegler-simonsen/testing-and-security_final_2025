using System;
using System.Collections.Generic;

namespace tradeItApi.Models.InputDto;

public partial class ProductFavoriteInput
{
    public int id { get; set; }

    public int? fk_user_id { get; set; }

    public int? fk_product_id { get; set; }
}
