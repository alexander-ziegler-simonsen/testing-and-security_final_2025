using tradeItApi.Models.OutputDto;
using tradeItApi.Models.InputDto;
using tradeItApi.Models.Data;
using Riok.Mapperly.Abstractions;

namespace tradeItApi.Mapper;

[Mapper]
public partial class UserMapper
{
    public partial UserOutput UserToUserOutput(User user);

    //public partial User UserInputToUser(UserInput user);

}