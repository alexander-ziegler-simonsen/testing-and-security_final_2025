using Microsoft.AspNetCore.Mvc;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;
using tradeItApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace tradeItApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _ProductService;

        public ProductController(ProductService ProductService)
        {
            _ProductService = ProductService;
        }

        // GET: api/<ProductController>
        [HttpGet]
        public async Task<IEnumerable<ProductOutput>> Get()
        {
            List<ProductOutput> outputs = await _ProductService.GetAllAsync();

            return outputs;
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public async Task<ProductOutput> Get(int id)
        {
            ProductOutput output = await _ProductService.GetByIdAsync(id);

            return output;
        }

        // GET api/<ProductController>/random
        [HttpGet("random/")]
        public async Task<IEnumerable<ProductCardOuput>> GetRandomsProductsAsync()
        {
            List<ProductCardOuput> output = await _ProductService.get6RandomProductsAsync();

            return output;
        }

        // GET api/<ProductController>/5
        [HttpGet("user/{id}")]
        public async Task<IEnumerable<ProductOutput>> GetAllByUserId(int id)
        {
            List<ProductOutput> output = await _ProductService.GetByFkUserIdAsync(id);

            return output;
        }

        // POST api/<ProductController>
        [HttpPost]
        public async Task<ProductOutput> Post([FromBody] ProductInput newProduct)
        {
            ProductOutput output = await _ProductService.CreateAsync(newProduct);

            return output; 
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put(int id, [FromBody] ProductInput value)
        {
            bool didItWork = await _ProductService.UpdateAsync(id, value);

            return didItWork;
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            bool didItWork = await _ProductService.DeleteAsync(id);

            return didItWork;
        }
    }
}
