using Riok.Mapperly.Abstractions;
using System.Runtime.ConstrainedExecution;
using tradeItApi.Models.Data;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;

namespace tradeItApi.Mapper;

[Mapper]
public partial class ProductCardMapper
{
    private string? mapFirstImage(Product product) => product.ProductImages.FirstOrDefault()?.imagepath;

    // when map product to ProductCardOutput, when url, use 'mapFirstImage'
    [MapProperty(nameof(Product), nameof(ProductCardOuput.url), Use = nameof(mapFirstImage))]

    public partial ProductCardOuput ProductToProductCardOutput(Product product);
    public partial List<ProductCardOuput> ProductListToProductCardOutputList(List<Product> products);

}