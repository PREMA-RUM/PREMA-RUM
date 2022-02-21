using Microsoft.AspNetCore.Mvc;

namespace PreEnrollmentMgmt.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class HealthController : ControllerBase
{
    [HttpGet]
    public string HealthCheck()
    {
        return "I am good";
    }
}