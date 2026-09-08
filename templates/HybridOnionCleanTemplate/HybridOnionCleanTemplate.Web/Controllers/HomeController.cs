using Resources.Controllers.Mvc.Base;
using HybridOnionCleanTemplate.Application.Abstractions.Services;
using Microsoft.AspNetCore.Mvc;

namespace HybridOnionCleanTemplate.Controllers
{
    public class HomeController : BaseController<HomeController>
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IExampleService _exampleService;
        public HomeController(IServiceProvider serviceProvider, ILogger<HomeController> logger,IExampleService exampleService)
            :base(serviceProvider)
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