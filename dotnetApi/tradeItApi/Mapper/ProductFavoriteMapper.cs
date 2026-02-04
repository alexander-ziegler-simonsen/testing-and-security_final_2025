using tradeItApi.Models.OutputDto;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.Data;
using Riok.Mapperly.Abstractions;

namespace tradeItApi.Mapper;

[Mapper]
public partial class ProductFavoriteMapper
{
    public partial ProductFavoriteOutput ProductFavoriteToProductFavoriteOutput(ProductFavorite productFavorite);
}