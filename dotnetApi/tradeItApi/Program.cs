using Microsoft.EntityFrameworkCore;
using tradeItApi.Data;
using tradeItApi.Mapper;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// swagger
builder.Services.AddSwaggerGen();

// adding mappers to scope
builder.Services.AddScoped<CommentMapper>();
builder.Services.AddScoped<UserMapper>();
builder.Services.AddScoped<ProductMapper>();
builder.Services.AddScoped<ProductFavoriteMapper>();
builder.Services.AddScoped<ProductImageMapper>();
builder.Services.AddScoped<ProductMapper>();



// dbcontext 
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseNpgsql( builder.Configuration.GetConnectionString("DefaultConnection") ) 
);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "TradeIt API v1");
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
