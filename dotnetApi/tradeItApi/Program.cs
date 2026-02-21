using Microsoft.EntityFrameworkCore;
using tradeItApi.Data;
using tradeItApi.Mapper;
using tradeItApi.Services;
using tradeItApi.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);


// cors 
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowedClient",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//builder.Services.AddOpenApi();

// swagger
builder.Services.AddSwaggerGen();

// adding mappers to scope
builder.Services.AddScoped<CommentMapper>();
builder.Services.AddScoped<UserMapper>();
builder.Services.AddScoped<ProductMapper>();
builder.Services.AddScoped<ProductFavoriteMapper>();
builder.Services.AddScoped<ProductImageMapper>();
builder.Services.AddScoped<ProductMapper>();

// adding services to scope
builder.Services.AddScoped<CommentService>();
builder.Services.AddScoped<ProductCategoryService>();
builder.Services.AddScoped<ProductFavoriteService>();
builder.Services.AddScoped<ProductImageService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<AuthService>();

// external api - service
builder.Services.AddHttpClient<IBeenPwnedService, BeenPwnedService>(client =>
{
    client.BaseAddress = new Uri("https://api.pwnedpasswords.com/");
    client.DefaultRequestHeaders.Add("User-Agent", "TradeItApi");
});

// swagger 
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.OpenApiInfo
    {
        Title = "TradeIt api",
        Version = "v1",
        Description = "This is the api connected to the TradeIt website"
    });
});


// dbcontext 
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseNpgsql( builder.Configuration.GetConnectionString("Default") ) 
);


var app = builder.Build();

// add cores
app.UseCors("AllowedClient");

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    //app.MapOpenApi();

    app.UseSwagger();
    app.UseSwaggerUI();
    //app.UseSwaggerUI(options =>
    //{
    //    options.SwaggerEndpoint("/openapi/v1.json", "TradeIt API v1");
    //});
//}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
