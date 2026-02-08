using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;

namespace tradeItApi.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<UserOutput>> GetAllAsync();
        Task<UserOutput?> GetByIdAsync(int id);
        Task<UserOutput?> CreateAsync(UserInput user);
        Task<bool> UpdateInfoAsync(int id, UserInput user);
        Task<bool> DeleteAsync(int id);
    }
}
