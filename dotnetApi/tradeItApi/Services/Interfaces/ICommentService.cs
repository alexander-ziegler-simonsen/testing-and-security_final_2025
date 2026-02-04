using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;

namespace tradeItApi.Services.Interfaces
{
    public interface ICommentService
    {
        Task<List<CommentOutput>> GetAllAsync();
        Task<CommentOutput?> GetByIdAsync(int id);
        Task<CommentOutput?> CreateAsync(CommentInput comment);
        Task<bool> UpdateAsync(int id, CommentInput comment);
        Task<bool> DeleteAsync(int id);
    }
}
