using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;
using tradeItApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace tradeItApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly CommentService _commentService;

        public CommentController(CommentService commentService)
        {
            _commentService = commentService;
        }

        // GET: api/<CommentController>
        [HttpGet]
        public async Task<IEnumerable<CommentOutput>> Get()
        {
            List<CommentOutput> outputs = await _commentService.GetAllAsync();

            return outputs;
        }

        // GET api/<CommentController>/5
        [HttpGet("{id}")]
        public async Task<CommentOutput> Get(int id)
        {
            CommentOutput output = await _commentService.GetByIdAsync(id);

            return output;
        }

        // POST api/<CommentController>
        [HttpPost]
        public async Task<CommentOutput> Post([FromBody] CommentInput newComment)
        {
            CommentOutput result = await _commentService.CreateAsync(newComment);

            return result; 
        }

        // PUT api/<CommentController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put(int id, [FromBody] CommentInput value)
        {
            bool didItWork = await _commentService.UpdateAsync(id, value);

            return didItWork;
        }

        // DELETE api/<CommentController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            bool didItWork = await _commentService.DeleteAsync(id);

            return didItWork;
        }
    }
}
