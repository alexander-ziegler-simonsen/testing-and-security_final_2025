using Microsoft.AspNetCore.Mvc;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;
using tradeItApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace tradeItApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductImageController : ControllerBase
    {
        private readonly ProductImageService _ProductImageService;

        public ProductImageController(ProductImageService ProductImageService)
        {
            _ProductImageService = ProductImageService;
        }

        // GET: api/<ProductImageController>
        [HttpGet]
        public async Task<IEnumerable<ProductImageOutput>> Get()
        {
            List<ProductImageOutput> outputs = await _ProductImageService.GetAllAsync();

            return outputs;
        }

        // GET api/<ProductImageController>/5
        [HttpGet("{id}")]
        public async Task<ProductImageOutput> Get(int id)
        {
            ProductImageOutput output = await _ProductImageService.GetByIdAsync(id);

            return output;
        }

        // POST api/<ProductImageController>
        [HttpPost]
        public async Task<ProductImageOutput> Post([FromBody] ProductImageInput newProductImage)
        {
            ProductImageOutput output = await _ProductImageService.CreateAsync(newProductImage);

            return output; 
        }

        // PUT api/<ProductImageController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put(int id, [FromBody] ProductImageInput value)
        {
            bool didItWork = await _ProductImageService.UpdateAsync(id, value);

            return didItWork;
        }

        // DELETE api/<ProductImageController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            bool didItWork = await _ProductImageService.DeleteAsync(id);

            return didItWork;
        }
    }
}
