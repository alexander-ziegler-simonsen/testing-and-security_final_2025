using Microsoft.AspNetCore.Mvc;
using tradeItApi.Models.OutputDto;
using tradeItApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace tradeItApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductFavoriteController : ControllerBase
    {

        private readonly ProductFavoriteService _productFavoriteService;

        public ProductFavoriteController(ProductFavoriteService productFavoriteService)
        {
            _productFavoriteService = productFavoriteService;
        }

        // GET: api/<ProductFavoriteController>
        [HttpGet]
        public async Task<IEnumerable<ProductFavoriteOutput>> Get()
        {
            List<ProductFavoriteOutput> outputs = await _productFavoriteService.GetAllAsync();

            return outputs;
        }

        // GET api/<ProductFavoriteController>/5
        [HttpGet("{id}")]
        public async Task<ProductFavoriteOutput> Get(int id)
        {
            ProductFavoriteOutput output = await _productFavoriteService.GetByIdAsync(id);
            return output;
        }

        // GET all by userId
        [HttpGet("user/{id}")]
        public async Task<IEnumerable<ProductFavoriteOutput>> GetAllByUserId(int id)
        {
            List<ProductFavoriteOutput> outputs = await _productFavoriteService.GetByFkUserIdAsync(id);
            return outputs;
        }

        // POST api/<ProductFavoriteController>
        [HttpPost]
        public void Post([FromBody] string value)
        {

        }

        // PUT api/<ProductFavoriteController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProductFavoriteController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
