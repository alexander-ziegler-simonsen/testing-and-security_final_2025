namespace tradeItApi.Models.OutputDto;

public partial class ProductCardOuput
{
    public int id { get; set; }

    public string title { get; set; } = null!;

    public decimal price { get; set; }

    public string? url { get; set; }
}
