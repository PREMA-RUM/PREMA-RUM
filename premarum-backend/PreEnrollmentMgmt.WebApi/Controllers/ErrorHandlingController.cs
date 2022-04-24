using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using PreEnrollmentMgmt.Core.Exceptions;

namespace PreEnrollmentMgmt.WebApi.Controllers;

[ApiExplorerSettings(IgnoreApi = true)]
[ApiController]
[Route("api/Error")]
public class ErrorHandlingController: ControllerBase
{
    [Route("")]
    public IActionResult HandleError([FromServices] IHostEnvironment hostEnvironment)
    {
        var exceptionHandlerFeature = HttpContext.Features.Get<IExceptionHandlerFeature>()!;
        if (exceptionHandlerFeature.Error is CoreException)
        {
            return Problem(
                title: "Core Exception",
                detail: exceptionHandlerFeature.Error.Message,
                statusCode: 409
            );
        }
        return Problem(
            title: "Unhandled Exception",
            statusCode: 500
        );
    }
    
    [Route("Development")]
    public IActionResult HandleErrorDevelopment(
        [FromServices] IHostEnvironment hostEnvironment)
    {
        if (!hostEnvironment.IsDevelopment())
        {
            return NotFound();
        }

        var exceptionHandlerFeature =
            HttpContext.Features.Get<IExceptionHandlerFeature>()!;

        return Problem(
            detail: exceptionHandlerFeature.Error.StackTrace,
            title: exceptionHandlerFeature.Error.Message);
    }
}

