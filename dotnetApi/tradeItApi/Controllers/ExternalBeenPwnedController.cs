using Microsoft.AspNetCore.Mvc;
using tradeItApi.Models.InputDto;
using tradeItApi.Services;
using tradeItApi.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace tradeItApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExternalBeenPwnedController : ControllerBase
    {
        private readonly IBeenPwnedService _beenPwnedService;

        public ExternalBeenPwnedController(IBeenPwnedService beenPwnedService)
        {
            _beenPwnedService = beenPwnedService;
        }

        // POST api/<ExternalBeenPwnedController>
        [HttpPost]
        public async Task<bool> checkPassword([FromBody] BeenPwnedInput hashed)
        {
            bool output = await _beenPwnedService.IsCompromised(hashed.HashedValue);

            return output;
        }
    }
}
