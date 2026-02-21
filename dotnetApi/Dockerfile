# ---------- Build stage ----------
FROM mcr.microsoft.com/dotnet/sdk:10.0-preview AS build
WORKDIR /App

# Copy both projects
COPY tradeItApi/tradeItApi.csproj tradeItApi/
COPY testing/testing.csproj testing/

# Restore dependencies for main project
RUN dotnet restore tradeItApi/tradeItApi.csproj

# Copy the rest ? needed at all ?
COPY . .

# Publish ONLY the API project
RUN dotnet publish tradeItApi/tradeItApi.csproj -c Release -o /app/publish

# ---------- Runtime stage ----------
FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview AS runtime
WORKDIR /App

# Copy published output from build stage
COPY --from=build /app/publish .

EXPOSE 8080

# Configure ASP.NET Core to listen on port 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "tradeItApi.dll"]