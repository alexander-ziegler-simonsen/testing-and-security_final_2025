using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;

namespace tradeItApi.Services.Interfaces
{
    public interface IProductFavoriteService
    {
        Task<List<ProductFavoriteOutput>> GetAllAsync();
        Task<ProductFavoriteOutput?> GetByIdAsync(int id);
        Task<ProductFavoriteOutput?> CreateAsync(ProductFavoriteInput productFavorite);
        Task<bool> DeleteAsync(int id);
    }
}
