using tradeItApi.Data;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;
using tradeItApi.Services.Interfaces;

namespace tradeItApi.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }
        public Task<List<UserOutput>> GetAllAsync()
        {
            return null;
        }
        public Task<UserOutput?> GetByIdAsync(int id)
        {
            return null;
        }
        public Task<UserOutput?> CreateAsync(UserInput user)
        {
            return null;
        }
        public Task<bool> UpdateAsync(int id, UserInput user)
        {
            return null;
        }
        public Task<bool> DeleteAsync(int id)
        {
            return null;
        }
    }
}
