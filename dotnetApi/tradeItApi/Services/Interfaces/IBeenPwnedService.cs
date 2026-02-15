namespace tradeItApi.Services.Interfaces
{
    public interface IBeenPwnedService
    {
        Task<bool> IsCompromised(string fullHash);
    }
}
