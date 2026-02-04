using tradeItApi.Data;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;
using tradeItApi.Services.Interfaces;

namespace tradeItApi.Services
{
    public class CommentService : ICommentService
    {
        private readonly AppDbContext _context;

        public CommentService(AppDbContext context)
        {
            _context = context;
        }
        public Task<List<CommentOutput>> GetAllAsync()
        {
            return null;
        }
        public Task<CommentOutput?> GetByIdAsync(int id)
        {
            return null;
        }
        public Task<CommentOutput?> CreateAsync(CommentInput comment)
        {
            return null;
        }
        public Task<bool> UpdateAsync(int id, CommentInput comment)
        {
            return null;
        }
        public Task<bool> DeleteAsync(int id)
        {
            return null;
        }
    }
}
