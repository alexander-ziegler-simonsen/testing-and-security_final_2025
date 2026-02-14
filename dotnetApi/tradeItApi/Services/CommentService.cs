using Microsoft.EntityFrameworkCore;
using tradeItApi.Data;
using tradeItApi.Mapper;
using tradeItApi.Models.Data;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;
using tradeItApi.Services.Interfaces;

namespace tradeItApi.Services
{
    public class CommentService : ICommentService
    {
        private readonly AppDbContext _context;
        private CommentMapper _mapper;

        public CommentService(AppDbContext context)
        {
            _context = context;
            _mapper = new CommentMapper();
        }

        public async Task<List<CommentOutput>> GetAllAsync()
        {
            List<Comment> output = await _context.Comments.AsNoTracking().ToListAsync();

            return _mapper.CommentListToCommentOutputList(output);
        }

        public async Task<CommentOutput?> GetByIdAsync(int id)
        {
            Comment output = await _context.Comments.FindAsync(id);

            if (output == null)
                return null;
            else
                return _mapper.CommentToCommentOutput(output);
        }

        public async Task<List<CommentOutput>> GetByFkUserIdAsync(int userId)
        {
            List<Comment> outputs = await _context.Comments
                .Where(c => c.fk_user_id == userId).ToListAsync();

            
            return _mapper.CommentListToCommentOutputList(outputs);
        }

        public async Task<List<CommentOutput>> GetByFkProductIdAsync(int productId)
        {
            List<Comment> outputs = await _context.Comments
                .Where(c => c.fk_product_id == productId).ToListAsync();


            return _mapper.CommentListToCommentOutputList(outputs);
        }

        public async Task<CommentOutput?> CreateAsync(CommentInput comment)
        {
            Comment newComment = _mapper.CommentInputToComment(comment);

            Console.WriteLine("output id", newComment.id);

            await _context.Comments.AddAsync(newComment);
            bool didItWork = _context.SaveChangesAsync().IsCompletedSuccessfully;

            Console.WriteLine("output id - after", newComment.id);

            return _mapper.CommentToCommentOutput(newComment);
        }

        public async Task<bool> UpdateAsync(int id, CommentInput comment)
        {
            Comment dbComment = await _context.Comments.SingleAsync(c => c.id == id);

            // can't find anything on that id
            if (dbComment == null)
                return false;

            // same value as it is in the database
            if(dbComment.content == comment.content)
                return false;

            // set values
            dbComment.content = comment.content;

            int didItWork = await _context.SaveChangesAsync();

            if (didItWork >= 1)
                return true;
            else
                return false;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            Comment dbComment = await _context.Comments.SingleAsync(c => c.id == id);

            // can't find anything on that id
            if (dbComment == null)
                return false;

            _context.Remove(dbComment);

            int didItWork = await _context.SaveChangesAsync();

            if (didItWork >= 1)
                return true;
            else
                return false;
        }
    }
}
