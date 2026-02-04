using tradeItApi.Data;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;
using tradeItApi.Services.Interfaces;

namespace tradeItApi.Services
{
    public class ProductCategoryService : IProductCategoryService
    {
        private readonly AppDbContext _context;

        public ProductCategoryService(AppDbContext context)
        {
            _context = context;
        }
        public Task<List<ProductCategoryOutput>> GetAllAsync()
        {
            return null;
        }
        public Task<ProductCategoryOutput?> GetByIdAsync(int id)
        {
            return null;
        }
        public Task<ProductCategoryOutput?> CreateAsync(ProductCategoryInput productCategory)
        {
            return null;
        }
        public Task<bool> UpdateAsync(int id, ProductCategoryInput productCategory)
        {
            return null;
        }
        public Task<bool> DeleteAsync(int id)
        {
            return null;
        }
    }
}
