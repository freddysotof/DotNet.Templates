// #endif
// #if (Company == "Company")
using Components;
using Core.Context;
using Middlewares;
using Middlewares.Extensions;
using Logger.Extensions;
using Notifications;
using Models.Configurations;
using Models.MapperProfiles.Admin;
//using ReportingServices;
using Resources;
using Resources.Helpers.Methods;
// #if (Company == "Company")
//using SharedComponents;
//using SharedServices.Context;
using SingleProjectWebTemplate.Application;
using SingleProjectWebTemplate.Infrastructure;
// #endif

var builder = WebApplication.CreateBuilder(args);

// AddControllersWithViews, AddNewtonsoftJson, AddMicrosoftIdentityUI, AddRazorRuntimeCompilation
builder.Services.ConfigureMvcControllers();
builder.Services.AddRazorPages().AddRazorRuntimeCompilation();

builder.Services.AddHttpContextAccessor();

#if (EnableLogger)
builder.Services.ConfigureLoggerService(builder.Configuration, builder.Logging);
#endif

builder.Services.ConfigureSession(builder.Environment, builder.Configuration);

#if (EnableRoutingLowerCase)
builder.Services.AddRouting(options => options.LowercaseUrls = true);
#else
builder.Services.AddRouting(options => options.LowercaseUrls = false);
#endif

if (builder.Environment.IsDevelopment()) {
    builder.Services.ConfigureDevAuthentication(builder.Environment, builder.Configuration);
    // Enable Downstream API desactivado porque no utiliza Azure Auth
#if (IsCatador)
    builder.Services.AddSharedComponents(builder.Configuration,enableDownstreamApis: false);
#endif
#if (IsBona)
    builder.Services.AddSharedComponents(builder.Configuration,configureHubBonaService: true, enableDownstreamApis: false);
#endif

}
else
{
    builder.Services.ConfigureAuthentication<AdmDbContext>(builder.Environment, builder.Configuration);
    builder.Services.ConfigureAuthorization<AdmDbContext>(builder.Configuration);
#if (IsCatador)
    builder.Services.AddSharedComponents(builder.Configuration, enableDownstreamApis: true);
#endif
#if (IsBona)
    builder.Services.AddSharedComponents(builder.Configuration,configureHubBonaService: true, enableDownstreamApis: true);
#endif
#if (EnableMicrosoftGraph)
        builder.Services.AddGraphService();
#endif
}


#if (EnableAutoMapper)
#region AutoMapper
builder.Services.AddAutoMapper(
    cfg => { }                   
    //,typeof(AppProfile).Assembly,  // scan this assembly for all Profile classes
);
#endregion
#endif

builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplication();

#if (EnableGlobalErrorHandler)
builder.Services.ConfigureCustomModelStateValidation();
#endif


#if (EnableHashEncryptionValidation)
builder.Services.AddEncryptionValidator(builder.Configuration);
#endif

#if (EnableHttpClientApi)
// Configurar conexiones a API HTTP CLIENT
builder.Services.AddApiHttpClient(builder.Configuration, "clientName", "baseAddress", hashKey: null, true);
#endif


#if (EnableResponseWrapper)
builder.Services.AddResponseWrapper();
#endif

#if (EnableMailServices)
builder.Services.AddMailService(builder.Configuration.GetConnectionString("MailDbConnection"));
#endif

#if (EnableReportingServices)
builder.Services.AddReportingServices(builder.Configuration);
#endif

#if (EnableFileServer || EnableReportingServices)
builder.Services.Configure<List<FileServer>>(builder.Configuration.GetSection("FileServers"));
#endif


var middlewareSettings = builder.Configuration.GetSection("MiddlewareSettings").Get<MiddlewareSettings>();

var app = builder.Build();
// Set ServiceValues
AppServicesHelper.Services = app.Services;

// The order of the pipelines is important
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{

    app.UseExceptionHandler("/Error/500");

    // 🔹 This handles *status codes* (like 404, 400)
    app.UseStatusCodePagesWithReExecute("/Error/{0}");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
}

#if (EnableRequestResponseLogger)
app.UseLoggingMiddleware();
#endif

#if (EnableGlobalErrorHandler)
app.UseGlobalErrorHandlerMiddleware();
#endif

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();


app.UseSession();


//! SE DEBE PONER EL DBCONTEXT DE LA LIBRERIA SharedServices de la compa�ia del proyecto
// Catador: AdmCatadorDbContext
// Bona: AdmBonaDbContext
if (app.Environment.IsDevelopment())
{
    app.UseAuthenticationMiddleware<AdmDbContext>();
}

app.UseAuthentication();

#if (EnableHashEncryptionValidation)
if(!builder.Environment.IsDevelopment())
app.UseHashAuthorizationValidator();
#endif

app.UseAuthorization();

#if (EnableGlobalErrorHandler)
app.UseModelStateValidationMiddleware();
#endif


if (app.Environment.IsDevelopment())
{
    _ = bool.TryParse(app.Configuration["AppInfo:SingleSignOut"], out bool handleSingleSignOut);
    app.UseSignOutMiddleware<AdmDbContext>(handleSingleSignOut);
}

#if (EnableFileServer || EnableReportingServices)
app.ConfigureFileServer(builder.Environment, builder.Configuration.GetSection("FileServers"));
#endif


#if (EnableResponseWrapper)
if (middlewareSettings.UsePaginationResponseWrapperMiddleware)
    app.UsePaginationResponseWrapperMiddleware();
else
    app.UseResponseWrapperMiddleware();
#endif



app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
   );


app.Run();
