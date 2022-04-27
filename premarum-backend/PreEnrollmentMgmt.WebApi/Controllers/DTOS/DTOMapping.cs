using System.Globalization;
using AutoMapper;
using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Entities.ComputedEntities;

namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS;

public class DTOMapping : Profile
{
    public DTOMapping()
    {
        CreateMap<PreEnrollment, PreEnrollmentDTO>();
        CreateMap<Course, CourseDTO>();
        CreateMap<Student, StudentDTO>();
        CreateMap<Professor, ProfessorDTO>();
        CreateMap<TimeSlot, TimeSlotDTO>()
            .ForMember(dest => dest.StartTime, opt => 
            {
                opt.MapFrom(src => src.StartTime.ToString(
                new CultureInfo("en-US")
                ));
            })
            .ForMember(dest => dest.EndTime, opt =>
            {
                opt.MapFrom(src => src.EndTime.ToString(
                    new CultureInfo("en-US")
                ));
            })
            .ForMember(dest => dest.Day,
                opt => { opt.MapFrom(src => src.WeekDay.Name); });
        CreateMap<SemesterOffer, PreEnrollmentSemesterOfferDTO>();
        CreateMap<Semester, SemesterDTO>()
            .ForMember(dest => dest.Term, opt => { opt.MapFrom(src => src.Term.TermName); });
        CreateMap<OverlappingPreEnrollmentSelections, ConflictingSelectionDTO>()
            .ForMember(dest => dest.StartTimeA, opt =>
                {
                    opt.MapFrom(src => src.StartTimeA.ToString(
                        new CultureInfo("en-US")
                    ));
                })
            .ForMember(dest => dest.StartTimeB,
                opt =>
                {
                    opt.MapFrom(src => src.StartTimeB.ToString(
                        new CultureInfo("en-US")
                    ));
                })
            .ForMember(dest => dest.EndTimeA, opt =>
                {
                    opt.MapFrom(src => src.EndTimeA.ToString(
                        new CultureInfo("en-US")    
                    ));
                })
            .ForMember(dest => dest.EndTimeB,
                opt =>
                {
                    opt.MapFrom(src => src.EndTimeB.ToString(
                        new CultureInfo("en-US")    
                    ));
                });
        CreateMap<Department, DepartmentDTO>();
        CreateMap<CoursesTaken, CoursesTakenDTO>();
    }
}