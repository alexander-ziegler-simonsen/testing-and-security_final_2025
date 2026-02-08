using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;

namespace tradeItApi.Services.Interfaces
{
    public interface IProductCategoryService
    {
        Task<List<ProductCategoryOutput>> GetAllAsync();
        Task<ProductCategoryOutput?> GetByIdAsync(int id);
        Task<ProductCategoryOutput?> CreateAsync(ProductCategoryInput productCategory);
        Task<bool> UpdateAsync(int id, ProductCategoryInput productCategory);
        Task<bool> DeleteAsync(int id);
    }
}
