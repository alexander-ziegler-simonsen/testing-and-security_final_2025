using tradeItApi.Data;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;
using tradeItApi.Services.Interfaces;

namespace tradeItApi.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }
        public Task<List<ProductOutput>> GetAllAsync()
        {
            return null;
        }
        public Task<ProductOutput?> GetByIdAsync(int id)
        {
            return null;
        }
        public Task<ProductOutput?> CreateAsync(ProductInput product)
        {
            return null;
        }
        public Task<bool> UpdateAsync(int id, ProductInput product)
        {
            return null;
        }
        public Task<bool> DeleteAsync(int id)
        {
            return null;
        }
    }
}
