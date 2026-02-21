using Microsoft.EntityFrameworkCore;
using tradeItApi.Data;
using tradeItApi.Mapper;
using tradeItApi.Models.Data;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;
using tradeItApi.Services.Interfaces;

namespace tradeItApi.Services
{
    public class ProductFavoriteService : IProductFavoriteService
    {
        private readonly AppDbContext _context;
        private ProductFavoriteMapper _mapper;

        public ProductFavoriteService(AppDbContext context)
        {
            _context = context;
            _mapper = new ProductFavoriteMapper();
        }

        public async Task<List<ProductFavoriteOutput>> GetAllAsync()
        {
            List<ProductFavorite> output = await _context.ProductFavorites.AsNoTracking().ToListAsync();

            return _mapper.ProductFavoriteListToProductFavoriteOutputList(output);
        }

        public async Task<ProductFavoriteOutput?> GetByIdAsync(int id)
        {
            ProductFavorite output = await _context.ProductFavorites.FindAsync(id);

            if (output == null)
                return null;
            else
                return _mapper.ProductFavoriteToProductFavoriteOutput(output);
        }

        public async Task<List<ProductFavoriteOutput>> GetByFkUserIdAsync(int userId)
        {
            List<ProductFavorite> outputs = await _context.ProductFavorites
                .Where(c => c.fk_user_id == userId).ToListAsync();


            return _mapper.ProductFavoriteListToProductFavoriteOutputList(outputs);
        }

        public async Task<ProductFavoriteOutput?> CreateAsync(ProductFavoriteInput ProductFavorite)
        {
            ProductFavorite newProductFavorite = _mapper.ProductFavoriteInputToProductFavorite(ProductFavorite);

            Console.WriteLine("output id", newProductFavorite.id);

            await _context.ProductFavorites.AddAsync(newProductFavorite);
            bool didItWork = _context.SaveChangesAsync().IsCompletedSuccessfully;

            Console.WriteLine("output id - after", newProductFavorite.id);

            return _mapper.ProductFavoriteToProductFavoriteOutput(newProductFavorite);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            ProductFavorite dbProductFavorite = await _context.ProductFavorites.FindAsync(id);

            // can't find anything on that id
            if (dbProductFavorite == null)
                return false;

            _context.ProductFavorites.Remove(dbProductFavorite);

            int didItWork = await _context.SaveChangesAsync();

            if (didItWork >= 1)
                return true;
            else
                return false;
        }
    }
}
