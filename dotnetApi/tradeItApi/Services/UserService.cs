using Microsoft.EntityFrameworkCore;
using tradeItApi.Data;
using tradeItApi.Mapper;
using tradeItApi.Models.Data;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.OutputDto;
using tradeItApi.Services.Interfaces;

namespace tradeItApi.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        private UserMapper _mapper;


        public UserService(AppDbContext context)
        {
            _context = context;
            _mapper = new UserMapper();
        }
        public async Task<List<UserOutput>> GetAllAsync()
        {
            List<User> output = await _context.Users.AsNoTracking().ToListAsync();

            return _mapper.UserListToUserOutputList(output);
        }
        public async Task<UserOutput?> GetByIdAsync(int id)
        {
            User output = await _context.Users.FindAsync(id);

            if(output == null)
                return null;
            else
                return _mapper.UserToUserOutput(output);
        }
        public async Task<UserOutput?> CreateAsync(UserInput user)
        {
            User newUser = _mapper.UserInputToUser(user);

            Console.WriteLine("output id", newUser.id);

            await _context.Users.AddAsync(newUser);
            bool didItWork = _context.SaveChangesAsync().IsCompletedSuccessfully;

            Console.WriteLine("output id - after", newUser.id);

            return _mapper.UserToUserOutput(newUser);
        }
        public async Task<bool> UpdateInfoAsync(int id, UserInput user)
        {
            User dbUser = await _context.Users.SingleAsync(c => c.id == id);

            // can't find anything on that id
            if (dbUser == null)
                return false;

            // same value as it is in the database
            if(dbUser.firstname == user.firstname && 
                dbUser.lastname == user.lastname && 
                dbUser.email == user.email && 
                dbUser.phone == user.phone)
                return false;

            // set values
            dbUser.firstname = user.firstname;
            dbUser.lastname = user.lastname;
            dbUser.email = user.email;
            dbUser.phone = user.phone;

            int didItWork = await _context.SaveChangesAsync();

            if (didItWork >= 1)
                return true;
            else
                return false;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            User dbUser = await _context.Users.SingleAsync(c => c.id == id);

            // can't find anything on that id
            if (dbUser == null)
                return false;

            _context.Remove(dbUser);

            int didItWork = await _context.SaveChangesAsync();

            if (didItWork >= 1)
                return true;
            else
                return false;
        }
    }
}
