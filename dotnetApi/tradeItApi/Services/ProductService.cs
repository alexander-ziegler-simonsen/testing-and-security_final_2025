using Microsoft.EntityFrameworkCore;
using tradeItApi.Data;
using tradeItApi.Mapper;
using tradeItApi.Models.Data;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;
using tradeItApi.Services.Interfaces;

namespace tradeItApi.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;
        private ProductMapper _mapper;

        public ProductService(AppDbContext context)
        {
            _context = context;
            _mapper = new ProductMapper();
        }
        public async Task<List<ProductOutput>> GetAllAsync()
        {
            List<Product> output = await _context.Products.AsNoTracking().ToListAsync();

            return _mapper.ProductListToProductOutputList(output);
        }
        public async Task<ProductOutput?> GetByIdAsync(int id)
        {
            Product output = await _context.Products.FindAsync(id);

            if(output == null)
                return null;
            else
                return _mapper.ProductToProductOutput(output);
        }

        public async Task<List<ProductOutput>> GetByFkUserIdAsync(int userId)
        {
            List<Product> outputs = await _context.Products
                .Where(c => c.fk_user_id == userId).ToListAsync();


            return _mapper.ProductListToProductOutputList(outputs);
        }

        public async Task<ProductOutput?> CreateAsync(ProductInput product)
        {
            Product newProduct = _mapper.ProductInputToProduct(product);

            Console.WriteLine("output id", newProduct.id);

            await _context.Products.AddAsync(newProduct);
            bool didItWork = _context.SaveChangesAsync().IsCompletedSuccessfully;

            Console.WriteLine("output id - after", newProduct.id);

            return _mapper.ProductToProductOutput(newProduct);
        }
        public async Task<bool> UpdateAsync(int id, ProductInput product)
        {
            Product dbProduct = await _context.Products.FindAsync(id);

            // can't find anything on that id
            if (dbProduct == null)
                return false;

            // same value as it is in the database
            if(dbProduct.price == product.price && dbProduct.description == product.description)
                return false;

            // set values
            dbProduct.price = product.price;
            dbProduct.description = product.description;

            int didItWork = await _context.SaveChangesAsync();

            if (didItWork >= 1)
                return true;
            else
                return false;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            Product dbProduct = await _context.Products.FindAsync(id);

            // can't find anything on that id
            if (dbProduct == null)
                return false;

            _context.Products.Remove(dbProduct);

            int didItWork = await _context.SaveChangesAsync();

            if (didItWork >= 1)
                return true;
            else
                return false;
        }
    }
}
