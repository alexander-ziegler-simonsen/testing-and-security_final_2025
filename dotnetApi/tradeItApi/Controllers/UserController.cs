using Microsoft.AspNetCore.Mvc;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;
using tradeItApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace tradeItApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _UserService;

        public UserController(UserService UserService)
        {
            _UserService = UserService;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<IEnumerable<UserOutput>> Get()
        {
            List<UserOutput> outputs = await _UserService.GetAllAsync();

            return outputs;
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<UserOutput> Get(int id)
        {
            UserOutput output = await _UserService.GetByIdAsync(id);

            return output;
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<UserOutput> Post([FromBody] UserInput newUser)
        {
            UserOutput output = await _UserService.CreateAsync(newUser);

            return output; 
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put(int id, [FromBody] UserInput value)
        {
            bool didItWork = await _UserService.UpdateInfoAsync(id, value);

            return didItWork;
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            bool didItWork = await _UserService.DeleteAsync(id);

            return didItWork;
        }
    }
}
