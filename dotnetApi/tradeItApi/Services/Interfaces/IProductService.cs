using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;

namespace tradeItApi.Services.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductOutput>> GetAllAsync();
        Task<ProductOutput?> GetByIdAsync(int id);
        Task<ProductOutput?> CreateAsync(ProductInput product);
        Task<bool> UpdateAsync(int id, ProductInput product);
        Task<bool> DeleteAsync(int id);
    }
}
