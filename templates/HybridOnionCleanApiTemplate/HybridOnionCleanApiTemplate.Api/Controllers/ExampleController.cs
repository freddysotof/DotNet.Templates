using Logger;
using Models.Handlers;
using Resources.Controllers.Api.Base;
using HybridOnionCleanApiTemplate.Application.Abstractions.Services;
using HybridOnionCleanApiTemplate.Application.ViewModels.Example;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Drawing.Imaging;

namespace HybridOnionCleanApiTemplate.Api.Controllers;

public class ExampleController : ApiBaseController<ExampleController>
{

    private readonly ILoggerManager<ExampleController> _logger;
    private readonly IExampleService _exampleService;
    public ExampleController(ILoggerManager<ExampleController> logger,IExampleService exampleService)
    {
        _logger = logger;
        _exampleService = exampleService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(ResponseHandler<GetExample>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    //[Authorize(Policy = "ReadScope")]
    public IActionResult GetExamples()
    {
        var result = Enumerable.Range(1, 5).Select(index => new GetExample())
        .ToArray();
        return Ok(result);
    }

}
