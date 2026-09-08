using Logger;
using Resources.Controllers.Mvc.Base;
using Microsoft.AspNetCore.Mvc;
using SingleProjectWebTemplate.Application.Abstractions.Services;

namespace SingleProjectWebTemplate.Controllers
{
    public class HomeController : BaseController<HomeController>
    {
        private readonly ILoggerManager<HomeController> _logger;
        private readonly IExampleService _exampleService;
        public HomeController(ILoggerManager<HomeController> logger,IExampleService exampleService)
        {
            _logger = logger;
            _exampleService = exampleService;
        }

        public async Task<IActionResult> Index()
        {
    
            return View();
        }

    }
}