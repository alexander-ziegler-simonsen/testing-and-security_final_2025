using Microsoft.EntityFrameworkCore;
using tradeItApi.Data;
using tradeItApi.Mapper;
using tradeItApi.Models.Data;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;
using tradeItApi.Services.Interfaces;

namespace tradeItApi.Services
{
    public class ProductImageService : IProductImageService
    {
        private readonly AppDbContext _context;
        private ProductImageMapper _mapper;

        public ProductImageService(AppDbContext context)
        {
            _context = context;
            _mapper = new ProductImageMapper();
        }
        public async Task<List<ProductImageOutput>> GetAllAsync()
        {
            List<ProductImage> output = await _context.ProductImages.AsNoTracking().ToListAsync();

            return _mapper.ProductImageListToProductImageOutputList(output);
        }
        public async Task<ProductImageOutput?> GetByIdAsync(int id)
        {
            ProductImage output = await _context.ProductImages.FindAsync(id);

            if(output == null)
                return null;
            else
                return _mapper.ProductImageToProductImageOutput(output);
        }
        public async Task<ProductImageOutput?> CreateAsync(ProductImageInput productImage)
        {
            ProductImage newProductImage = _mapper.ProductImageInputToProductImage(productImage);

            Console.WriteLine("output id", newProductImage.id);

            await _context.ProductImages.AddAsync(newProductImage);
            bool didItWork = _context.SaveChangesAsync().IsCompletedSuccessfully;

            Console.WriteLine("output id - after", newProductImage.id);

            return _mapper.ProductImageToProductImageOutput(newProductImage);
        }
        public async Task<bool> UpdateAsync(int id, ProductImageInput productImage)
        {
            ProductImage dbProductImage = await _context.ProductImages.SingleAsync(c => c.id == id);

            // can't find anything on that id
            if (dbProductImage == null)
                return false;

            // same value as it is in the database
            if(dbProductImage.imagepath == productImage.imagepath)
                return false;

            // set values
            dbProductImage.imagepath = productImage.imagepath;

            int didItWork = await _context.SaveChangesAsync();

            if (didItWork >= 1)
                return true;
            else
                return false;;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            ProductImage dbProductImage = await _context.ProductImages.SingleAsync(c => c.id == id);

            // can't find anything on that id
            if (dbProductImage == null)
                return false;

            _context.Remove(dbProductImage);

            int didItWork = await _context.SaveChangesAsync();

            if (didItWork >= 1)
                return true;
            else
                return false;
        }
    }
}
