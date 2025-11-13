using Microsoft.EntityFrameworkCore;
using Project.Data;
using Project.Repositories;
using Project.Services;
using Project.Validators;
using FluentValidation.AspNetCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Post Management API",
        Version = "v1",
        Description = "API for managing posts with name, description, and image"
    });
});

// Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

// Repositories
builder.Services.AddScoped<IPostRepository, PostRepository>();

// Services
builder.Services.AddScoped<IPostService, PostService>();

// AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

// FluentValidation
builder.Services.AddFluentValidation(fv =>
{
    fv.RegisterValidatorsFromAssemblyContaining<CreatePostDtoValidator>();
});

// CORS
var allowedOrigins = new List<string>();

// Read from configuration (appsettings.json)
var configOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>();
if (configOrigins != null)
{
    allowedOrigins.AddRange(configOrigins);
}

// Read from environment variables (for production deployment)
// Format: Cors__AllowedOrigins__0, Cors__AllowedOrigins__1, etc.
var envIndex = 0;
while (true)
{
    var envOrigin = builder.Configuration[$"Cors:AllowedOrigins:{envIndex}"];
    if (string.IsNullOrEmpty(envOrigin))
    {
        // Also check alternative format: Cors__AllowedOrigins__0
        envOrigin = builder.Configuration[$"Cors__AllowedOrigins__{envIndex}"];
        if (string.IsNullOrEmpty(envOrigin))
            break;
    }
    if (!allowedOrigins.Contains(envOrigin))
    {
        allowedOrigins.Add(envOrigin);
    }
    envIndex++;
}

// Default to localhost if no origins configured
if (allowedOrigins.Count == 0)
{
    allowedOrigins.Add("http://localhost:3000");
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigins.ToArray())
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
// Enable Swagger for both Development and Production
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Post Management API v1");
});

// Only use HTTPS redirection in production
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

// Ensure database is created
using (var scope = app.Services.CreateScope())
{
    try
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        logger.LogInformation("Checking database connection...");
        dbContext.Database.EnsureCreated();
        logger.LogInformation("Database ready.");
    }
    catch (Exception ex)
    {
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Failed to create or connect to database. Please check your connection string.");
    }
}

app.Run();
