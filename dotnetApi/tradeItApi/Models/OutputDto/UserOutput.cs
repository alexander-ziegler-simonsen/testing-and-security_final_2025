using System;
using System.Collections.Generic;

namespace tradeItApi.Models.OutputDto;

public partial class UserOutput
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
}
