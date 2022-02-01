using Microsoft.AspNetCore.Mvc;

namespace PreEnrollment.WebApi.Controllers;

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
