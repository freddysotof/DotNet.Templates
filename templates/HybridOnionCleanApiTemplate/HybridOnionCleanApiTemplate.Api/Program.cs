using Middlewares;
using Middlewares.Extensions;
using Logger.Extensions;
using Models.Configurations;
using Resources;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;
using HybridOnionCleanApiTemplate.Application;
using HybridOnionCleanApiTemplate.Infrastructure;
using Resources.Helpers.Methods;
using Middlewares.Filters;
using Resources.Extensions;
using Middlewares.Handlers;
using Microsoft.AspNetCore.Authentication;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddHttpContextAccessor();
builder.Services.Configure<AppInfo>(builder.Configuration.GetSection("AppInfo"));
var appInfo = builder.Configuration.GetSection("AppInfo").Get<AppInfo>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo() { Title = $"{(!builder.Environment.IsProduction() ? builder.Environment.EnvironmentName : "")} {appInfo.CompanyKey} {appInfo.SystemTitle}", Version = "v1.0" });
    c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization using Bearer scheme",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    });
    #if (EnableHashEncryptionValidation)
        c.AddSecurityDefinition("x-auth-signature", new OpenApiSecurityScheme
        {
            Description = "HMAC hash of the request for verifying integrity and authenticity.",
            Name = "x-auth-signature",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey
        });
    #endif

    #if (EnableHashEncryptionValidation)
        c.OperationFilter<SwaggerSecurityOperationFilter>(new List<string>() { "Bearer", "x-auth-signature" });
    #else
        c.OperationFilter<SwaggerSecurityOperationFilter>(new List<string>() { "Bearer" });
#endif

    c.CustomSchemaIds(type => GetSchemaId(type));
    static string GetSchemaId(Type type)
    {
        if (!type.IsGenericType)
            return type.Name;

        var genericName = type.Name.Split('`')[0];

        var genericArgs = string.Join(".", type.GetGenericArguments()
            .Select(GetSchemaId));

        return $"{genericName}.{genericArgs}";
    }
});

#if (EnableRoutingLowerCase)
builder.Services.AddRouting(options => options.LowercaseUrls = true);
#endif

// Member casing, API Versioning
builder.Services.ConfigureApiControllers(memberCasing: false, apiVersioning: true);

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = "AzureAd"; // <-- Set default scheme
    options.DefaultChallengeScheme = "AzureAd";
})
     .AddScheme<AuthenticationSchemeOptions, HashAuthenticationHandler>("HMAC", null)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"), jwtBearerScheme: "AzureAd")
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddMicrosoftGraph(options =>
        builder.Configuration.GetSection("DownstreamApis:MicrosoftGraph").Bind(options))
    .ConfigureDownstreamApis(builder.Configuration,builder.Environment)
    .AddInMemoryTokenCaches()
    .AddDistributedTokenCaches()
    .AddSessionTokenCaches();

builder.Services.AddAuthorization(options =>
{
    #if (EnableHashEncryptionValidation)
            options.FallbackPolicy = new AuthorizationPolicyBuilder()
         .AddAuthenticationSchemes("AzureAd", "HMAC")
            .RequireAuthenticatedUser()
            .Build();
    #else
        options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .AddAuthenticationSchemes("AzureAd")
           .RequireAuthenticatedUser()
           .Build();
    #endif
    
    options.AddPolicy("ReadWriteScope", policy =>
      policy.RequireAssertion(ctx =>
            ctx.User.IsHmac() ||
            ctx.User.HasAnyScope("{SystemKey}.ReadWrite") ||
            ctx.User.HasAnyAppRole("{SystemKey}.ReadWrite.All")
        ));

    options.AddPolicy("ReadScope", policy =>
     policy.RequireAssertion(ctx =>
            ctx.User.IsHmac() ||
            ctx.User.HasAnyScope("{SystemKey}.Read", "{SystemKey}.ReadWrite") ||
            ctx.User.HasAnyAppRole("{SystemKey}.Read.All", "{SystemKey}.ReadWrite.All")
        ));
});

#if (EnableMicrosoftGraph)
builder.Services.AddGraphService();
#endif

#if (EnableHashEncryptionValidation)
builder.Services.AddEncryptionValidator(builder.Configuration);
#endif

#if (EnableLogger)
builder.Services.ConfigureLoggerService(builder.Configuration, builder.Logging);
#endif

#if (EnableGlobalErrorHandler)
builder.Services.ConfigureCustomModelStateValidation();
#endif

#if (EnableResponseWrapper)
builder.Services.AddResponseWrapper();
#endif

#if (IsCatador)
builder.Services.ConfigureCatadorSharedServices(builder.Configuration, enableDownstreamApis: true);
#endif


#if (IsBona)
builder.Services.ConfigureBonaSharedServices(builder.Configuration, enableDownstreamApis: true);
#endif

builder.Services.AddCorsPolicy(builder.Configuration);

#if (EnableAutoMapper)
#region AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
#endregion
#endif

#if (EnableHttpClientApi)
// Configurar conexiones a API HTTP CLIENT
builder.Services.AddApiHttpClient(builder.Configuration, "clientName", "baseAddress", hashKey: null, true);
#endif


#if (EnableFileServer)
builder.Services.Configure<List<FileServer>>(builder.Configuration.GetSection("FileServers"));
#endif

builder.Services.AddApplication(builder.Configuration);
builder.Services.AddInfrastructure(builder.Configuration);

var middlewareSettings = builder.Configuration.GetSection("MiddlewareSettings").Get<MiddlewareSettings>();

var app = builder.Build();
// Set ServiceValues
AppServicesHelper.Services = app.Services;

app.UseSwagger(c =>
{
    c.RouteTemplate = "swagger/{documentName}/swagger.json";

});

app.UseSwaggerUI(c => {
    c.DocumentTitle = $"{(builder.Environment.IsProduction() ? "" : builder.Environment.EnvironmentName)} {appInfo.CompanyKey} {appInfo.SystemTitle}";
    c.SwaggerEndpoint($"v1/swagger.json", $"{appInfo.SystemKey} v1");
});


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
}


#if (EnableRequestResponseLogger)
app.UseLoggingMiddleware();
#endif


#if (EnableGlobalErrorHandler)
app.UseGlobalErrorHandlerMiddleware();
#endif


app.UseHttpsRedirection();

#if (EnableFileServer)
app.UseStaticFiles();
#endif

app.UseRouting();

app.UseCors();

app.UseSession();

app.UseAuthentication();

#if (EnableHashEncryptionValidation)
if (!builder.Environment.IsDevelopment())
    app.UseHashAuthorizationValidator();
#endif

app.UseAuthorization();


#if (EnableGlobalErrorHandler)
app.UseModelStateValidationMiddleware();
#endif


#if (EnableFileServer)
app.ConfigureFileServer(builder.Environment, builder.Configuration.GetSection("FileServers"));
#endif

#if (EnableResponseWrapper)
if (middlewareSettings.UsePaginationResponseWrapperMiddleware)
    app.UsePaginationResponseWrapperMiddleware();
else
    app.UseResponseWrapperMiddleware();
#endif

app.MapControllers();

app.Run();

