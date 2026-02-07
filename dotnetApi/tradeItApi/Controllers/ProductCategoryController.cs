using Microsoft.AspNetCore.Mvc;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;
using tradeItApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace tradeItApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoryController : ControllerBase
    {
        private readonly ProductCategoryService _ProductCategoryService;

        public ProductCategoryController(ProductCategoryService ProductCategoryService)
        {
            _ProductCategoryService = ProductCategoryService;
        }

        // GET: api/<ProductCategoryController>
        [HttpGet]
        public async Task<IEnumerable<ProductCategoryOutput>> Get()
        {
            List<ProductCategoryOutput> outputs = await _ProductCategoryService.GetAllAsync();

            return outputs;
        }

        // GET api/<ProductCategoryController>/5
        [HttpGet("{id}")]
        public async Task<ProductCategoryOutput> Get(int id)
        {
            ProductCategoryOutput output = await _ProductCategoryService.GetByIdAsync(id);

            return output;
        }

        // POST api/<ProductCategoryController>
        [HttpPost]
        public async Task<ProductCategoryOutput> Post([FromBody] ProductCategoryInput newProductCategory)
        {
            ProductCategoryOutput output = await _ProductCategoryService.CreateAsync(newProductCategory);

            return output;
        }

        // PUT api/<ProductCategoryController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put(int id, [FromBody] ProductCategoryInput value)
        {
            bool didItWork = await _ProductCategoryService.UpdateAsync(id, value);

            return didItWork;
        }

        // DELETE api/<ProductCategoryController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            bool didItWork = await _ProductCategoryService.DeleteAsync(id);

            return didItWork;
        }
    }
}
