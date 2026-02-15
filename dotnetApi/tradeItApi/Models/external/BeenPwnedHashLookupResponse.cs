namespace tradeItApi.Models.external
{
    public class BeenPwnedHashLookupResponse
    {
        public HashSet<string> Suffixes { get; set; } = new(StringComparer.OrdinalIgnoreCase);

        public bool ContainsFullHash(string fullHash)
        {
            var suffix = fullHash.Substring(5);
            return Suffixes.Contains(suffix);
        }

        public static BeenPwnedHashLookupResponse FromRaw(string raw)
        {
            var dto = new BeenPwnedHashLookupResponse();

            var lines = raw.Split('\n', StringSplitOptions.RemoveEmptyEntries);

            foreach (var line in lines)
            {
                var parts = line.Split(':');
                var suffix = parts[0].Trim();
                dto.Suffixes.Add(suffix);
            }

            return dto;
        }
    }
}
