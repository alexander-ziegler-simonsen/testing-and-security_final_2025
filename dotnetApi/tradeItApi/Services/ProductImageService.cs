using tradeItApi.Data;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;
using tradeItApi.Services.Interfaces;

namespace tradeItApi.Services
{
    public class ProductImageService : IProductImageService
    {
        private readonly AppDbContext _context;

        public ProductImageService(AppDbContext context)
        {
            _context = context;
        }
        public Task<List<ProductImageOutput>> GetAllAsync()
        {
            return null;
        }
        public Task<ProductImageOutput?> GetByIdAsync(int id)
        {
            return null;
        }
        public Task<ProductImageOutput?> CreateAsync(ProductImageInput productImage)
        {
            return null;
        }
        public Task<bool> UpdateAsync(int id, ProductImageInput productImage)
        {
            return null;
        }
        public Task<bool> DeleteAsync(int id)
        {
            return null;
        }
    }
}
