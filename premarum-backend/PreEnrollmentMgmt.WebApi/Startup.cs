using PreEnrollmentMgmt.Application.Repositories;
using PreEnrollmentMgmt.Core.Repositories;
using PreEnrollmentMgmt.Core.Services;

namespace PreEnrollmentMgmt.WebApi;

public static class Startup
{
    public static void ConfigureProgramServices(WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IPreEnrollmentRepository, PreEnrollmentRepository>();
        builder.Services.AddScoped<IStudentRepository, StudentRepository>();
        builder.Services.AddScoped<ISemesterOfferRepository, SemesterOfferRepository>();
        builder.Services.AddScoped<ITransactionManager, TransactionManager>();
        builder.Services.AddScoped<PreEnrollmentService, PreEnrollmentService>();
        builder.Services.AddScoped<StudentValidationService, StudentValidationService>();
        builder.Services.AddScoped<StudentService, StudentService>();
        builder.Services.AddScoped<SemesterValidationService, SemesterValidationService>();
    }
}