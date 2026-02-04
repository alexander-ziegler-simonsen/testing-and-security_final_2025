using Riok.Mapperly.Abstractions;
using System;
using System.Collections.Generic;

namespace tradeItApi.Models.Data;

public partial class User
{
    public int id { get; set; }

    public string username { get; set; } = null!;

    public string hashedpassword { get; set; } = null!;

    public string salt { get; set; } = null!;

    public string firstname { get; set; } = null!;

    public string lastname { get; set; } = null!;

    public string email { get; set; } = null!;

    public string phone { get; set; } = null!;

    public DateTime signedup { get; set; }

    [MapperIgnore]
    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    [MapperIgnore]
    public virtual ICollection<ProductFavorite> ProductFavorites { get; set; } = new List<ProductFavorite>();

    [MapperIgnore]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
