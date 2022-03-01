using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;
using PreEnrollmentMgmt.DataAccess;
using PreEnrollmentMgmt.WebApi;
using PreEnrollmentMgmt.WebApi.Controllers.DTOS;

var builder = WebApplication.CreateBuilder(args);

// Application Services
Startup.ConfigureProgramServices(builder);

// Framework Services
builder.Services.AddControllers();
builder.Services.AddDbContext<PremaRumDbContext>(opt =>
{
    opt.UseNpgsql(
        Environment.GetEnvironmentVariable("ConnectionString") ?? throw new InvalidOperationException());
});
builder.Services.AddAutoMapper(typeof(DTOMapping));

// Authentication Configurations
builder.Services
    .AddMicrosoftIdentityWebApiAuthentication(builder.Configuration);
builder.Services.AddAuthorization(options => 
{
    options.DefaultPolicy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme)
        .RequireAuthenticatedUser()
        .Build();
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,

            },
            new List<string>()
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();