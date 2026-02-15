using tradeItApi.Models.external;
using tradeItApi.Services.Interfaces;

namespace tradeItApi.Services
{
    public class BeenPwnedService : IBeenPwnedService
    {
        private readonly HttpClient _httpClient;

        public BeenPwnedService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<bool> IsCompromised(string fullHash)
        {
            // takes only the fist 5 characters of the hash (k-Anonymity)
            var prefix = fullHash.Substring(0, 5);
            var suffix = fullHash.Substring(5);


            var raw = await _httpClient.GetStringAsync($"range/{prefix}");

            // cleans up the data, so we better cdan work with it
            var dto = BeenPwnedHashLookupResponse.FromRaw(raw);

            bool output = dto.ContainsFullHash(fullHash);

            return output;
        }
    }
}