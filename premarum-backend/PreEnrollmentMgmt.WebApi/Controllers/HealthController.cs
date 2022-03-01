using Microsoft.AspNetCore.Authorization;
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

    [Authorize]
    [HttpGet("Secure")]
    public string SecureHealthCheck()
    {
        return $"{User.Identity?.Name} is checking health";
    }
}