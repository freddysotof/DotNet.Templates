using AutoMapper;
using HybridOnionCleanTemplate.Application.ViewModels.Example;
using HybridOnionCleanTemplate.Domain.Entities;

namespace HybridOnionCleanTemplate.Application.Mapping.ViewModels
{
    public class ExampleProfiles : Profile
    {
        public ExampleProfiles()
        {
            CreateMap<ExampleEntity, GetExampleViewModel>();
        }
    }
}


