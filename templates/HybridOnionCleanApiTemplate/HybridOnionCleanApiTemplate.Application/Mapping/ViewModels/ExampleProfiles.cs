using AutoMapper;
using HybridOnionCleanApiTemplate.Application.ViewModels.Example;
using HybridOnionCleanApiTemplate.Domain.Entities;

namespace HybridOnionCleanApiTemplate.Application.Mapping.ViewModels
{
    public class ExampleProfiles : Profile
    {
        public ExampleProfiles()
        {
            CreateMap<ExampleEntity, GetExample>();
        }
    }
}


