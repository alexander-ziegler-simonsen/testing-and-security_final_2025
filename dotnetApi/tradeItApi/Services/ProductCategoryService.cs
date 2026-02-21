using Microsoft.EntityFrameworkCore;
using tradeItApi.Data;
using tradeItApi.Mapper;
using tradeItApi.Models.Data;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;
using tradeItApi.Services.Interfaces;

namespace tradeItApi.Services
{
    public class ProductCategoryService : IProductCategoryService
    {
        private readonly AppDbContext _context;
        private ProductCategoryMapper _mapper;

        public ProductCategoryService(AppDbContext context)
        {
            _context = context;
            _mapper = new ProductCategoryMapper();
        }
        public async Task<List<ProductCategoryOutput>> GetAllAsync()
        {
            List<ProductCategory> output = await _context.ProductCategories.AsNoTracking().ToListAsync();

            return _mapper.ProductCategoryListToProductCategoryOutputList(output);
        }
        public async Task<ProductCategoryOutput?> GetByIdAsync(int id)
        {
            ProductCategory output = await _context.ProductCategories.FindAsync(id);

            if(output == null)
                return null;
            else
                return _mapper.ProductCategoryToProductCategoryOutput(output);
        }
        public async Task<ProductCategoryOutput?> CreateAsync(ProductCategoryInput productCategory)
        {
            ProductCategory newProductCategory = _mapper.ProductCategoryInputToProductCategory(productCategory);

            Console.WriteLine("output id", newProductCategory.id);

            await _context.ProductCategories.AddAsync(newProductCategory);
            bool didItWork = _context.SaveChangesAsync().IsCompletedSuccessfully;

            Console.WriteLine("output id - after", newProductCategory.id);

            return _mapper.ProductCategoryToProductCategoryOutput(newProductCategory);
        }
        public async Task<bool> UpdateAsync(int id, ProductCategoryInput productCategory)
        {
            ProductCategory dbProductCategory = await _context.ProductCategories.FindAsync(id);

            // can't find anything on that id
            if (dbProductCategory == null)
                return false;

            // same value as it is in the database
            if(dbProductCategory.name == productCategory.name)
                return false;

            // set values
            dbProductCategory.name = productCategory.name;

            int didItWork = await _context.SaveChangesAsync();

            if (didItWork >= 1)
                return true;
            else
                return false;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            ProductCategory dbProductCategory = await _context.ProductCategories.FindAsync(id);

            // can't find anything on that id
            if (dbProductCategory == null)
                return false;

            _context.ProductCategories.Remove(dbProductCategory);

            int didItWork = await _context.SaveChangesAsync();

            if (didItWork >= 1)
                return true;
            else
                return false;
        }
    }
}
