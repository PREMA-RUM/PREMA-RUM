using Microsoft.EntityFrameworkCore;
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

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();