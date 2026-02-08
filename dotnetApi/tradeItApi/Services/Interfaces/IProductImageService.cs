using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;

namespace tradeItApi.Services.Interfaces
{
    public interface IProductImageService
    {
        Task<List<ProductImageOutput>> GetAllAsync();
        Task<ProductImageOutput?> GetByIdAsync(int id);
        Task<ProductImageOutput?> CreateAsync(ProductImageInput productImage);
        Task<bool> UpdateAsync(int id, ProductImageInput productImage);
        Task<bool> DeleteAsync(int id);
    }
}
