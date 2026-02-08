using tradeItApi.Models.OutputDto;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.Data;
using Riok.Mapperly.Abstractions;
using tradeItApi.Models;

namespace tradeItApi.Mapper;

[Mapper]
public partial class ProductCategoryMapper
{
    public partial ProductCategoryOutput ProductCategoryToProductCategoryOutput(ProductCategory productCategory);
    public partial ProductCategory ProductCategoryInputToProductCategory(ProductCategoryInput productCategory);
    public partial List<ProductCategoryOutput> ProductCategoryListToProductCategoryOutputList(List<ProductCategory> productCategory);
}