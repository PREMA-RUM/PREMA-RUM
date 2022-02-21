using AutoMapper;
using PreEnrollmentMgmt.Core.Entities;

namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS;

public class DTOMapping : Profile

{
    public DTOMapping()
    {
        CreateMap<PreEnrollment, PreEnrollmentDTO>();
        CreateMap<Course, CourseDTO>();
        CreateMap<Professor, ProfessorDTO>();
        CreateMap<TimeSlot, TimeSlotDTO>()
            .ForMember(dest => dest.Day,
                opt =>
                {
                    opt.MapFrom(src => src.WeekDay.Name);
                });
        CreateMap<SemesterOffer, PreEnrollmentSemesterOfferDTO>();
        CreateMap<Semester, SemesterDTO>()
            .ForMember(dest => dest.Term, opt =>
            {
                opt.MapFrom(src => src.Term.TermName);
            });
    }
}