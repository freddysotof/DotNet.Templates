using AutoMapper;
using SingleProjectWebTemplate.Application.ViewModels.Example;
using SingleProjectWebTemplate.Domain.Entities;

namespace SingleProjectWebTemplate.Application.Mappings.ViewModels
{
    public class ExampleProfiles : Profile
    {
        public ExampleProfiles()
        {
            CreateMap<ExampleEntity, GetExampleViewModel>();
        }
    }
}


