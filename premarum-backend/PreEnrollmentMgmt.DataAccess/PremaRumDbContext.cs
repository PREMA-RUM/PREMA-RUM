using Microsoft.EntityFrameworkCore;
using PreEnrollmentMgmt.Core.Entities;

namespace PreEnrollmentMgmt.DataAccess;

public partial class PremaRumDbContext : DbContext
{
    public PremaRumDbContext()
    {
    }

    public PremaRumDbContext(DbContextOptions<PremaRumDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Course> Courses { get; set; } = null!;
    public virtual DbSet<CoursesTaken> CoursesTakens { get; set; } = null!;
    public virtual DbSet<Day> Days { get; set; } = null!;
    public virtual DbSet<Department> Departments { get; set; } = null!;
    public virtual DbSet<PreEnrollment> PreEnrollments { get; set; } = null!;
    public virtual DbSet<Professor> Professors { get; set; } = null!;
    public virtual DbSet<Semester> Semesters { get; set; } = null!;
    public virtual DbSet<SemesterOffer> SemesterOffers { get; set; } = null!;
    public virtual DbSet<Student> Students { get; set; } = null!;
    public virtual DbSet<Term> Terms { get; set; } = null!;
    public virtual DbSet<TimeSlot> TimeSlots { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            // TODO: Get Connection String from app settings.
            optionsBuilder.UseNpgsql("Host=localhost:9000;Database=premadb;Username=postgres;Password=1234");
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.Id)
                .HasName("course_pk");

            entity.ToTable("Course");

            entity.Property(e => e.Id).HasColumnName("c_id");

            entity.Property(e => e.CourseCode)
                .HasMaxLength(10)
                .HasColumnName("c_code");

            entity.Property(e => e.CourseCorequisites)
                .HasMaxLength(100)
                .HasColumnName("c_coreq");

            entity.Property(e => e.CourseCredit).HasColumnName("c_credit");

            entity.Property(e => e.CourseDescription)
                .HasMaxLength(100)
                .HasColumnName("c_desc");

            entity.Property(e => e.CourseName)
                .HasMaxLength(30)
                .HasColumnName("c_name");

            entity.Property(e => e.CoursePrerequisites)
                .HasMaxLength(100)
                .HasColumnName("c_prereq");

            entity.Property(typeof(int), "DeptId")
                .HasColumnName("dept_id");

            entity.HasOne(d => d.Department)
                .WithMany(p => p.Courses)
                .HasForeignKey("DeptId")
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("dept_id");
        });

        modelBuilder.Entity<CoursesTaken>(entity =>
        {
            entity.ToTable("CoursesTaken");
            
            entity.Property(e => e.StudentId)
                .HasColumnName("st_id");
            entity.Property(e => e.CourseId)
                .HasColumnName("c_id");
            entity.Property(e => e.SemesterId)
                .HasColumnName("s_id");

            entity.HasKey("StudentId", "CourseId");

            entity.HasOne(d => d.Course)
                .WithMany()
                .HasForeignKey(e => e.CourseId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("c_id");

            entity.HasOne(d => d.SemesterTaken)
                .WithMany()
                .HasForeignKey(e => e.SemesterId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("s_id");

            entity.HasOne<Student>()
                .WithMany(st => st.CoursesTaken)
                .HasForeignKey(e => e.StudentId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("st_id");
        });

        modelBuilder.Entity<Day>(entity =>
        {
            entity.HasKey(e => e.Id)
                .HasName("Day_pkey");

            entity.ToTable("Day");

            entity.HasIndex(e => e.Name, "Day_d_name_key")
                .IsUnique();

            entity.Property(e => e.Id).HasColumnName("d_id");

            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("d_name");
        });

        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasKey(e => e.DepartmentId)
                .HasName("department_pk");

            entity.ToTable("Department");

            entity.HasIndex(e => e.DepartmentName, "Department_dept_name_key")
                .IsUnique();

            entity.Property(e => e.DepartmentId).HasColumnName("dept_id");

            entity.Property(e => e.DepartmentName)
                .HasMaxLength(100)
                .HasColumnName("dept_name");
        });

        modelBuilder.Entity<PreEnrollment>(entity =>
        {
            entity.HasKey(e => e.Id)
                .HasName("preenrollment_pk");

            entity.ToTable("PreEnrollment");

            entity.Property(e => e.Id).HasColumnName("pe_id");
            
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("pe_name");

            entity
                .Property(e => e.SemesterId)
                .HasColumnName("s_id");
            
            entity
                .Property(e => e.StudentId)
                .HasColumnName("st_id");

            entity
                .HasOne(d => d.Semester)
                .WithMany()
                .HasForeignKey(e => e.SemesterId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("s_id");

            entity.HasOne<Student>()
                .WithMany(p => p.PreEnrollments)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("st_id");

            entity.HasMany(d => d.Selections)
                .WithMany(p => p.PreEnrollments)
                .UsingEntity<Dictionary<string, object>>(
                    "PreEnrollmentSelection",
                    l => l.HasOne<SemesterOffer>().WithMany().HasForeignKey("SoId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("so_id"),
                    r => r.HasOne<PreEnrollment>().WithMany().HasForeignKey("PeId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("pe_id"),
                    j =>
                    {
                        j.HasKey("PeId", "SoId").HasName("PreEnrollmentSelection_pkey");

                        j.ToTable("PreEnrollmentSelection");

                        j.IndexerProperty<int>("PeId").HasColumnName("pe_id");

                        j.IndexerProperty<int>("SoId").HasColumnName("so_id");
                    });
        });

        modelBuilder.Entity<Professor>(entity =>
        {
            entity.HasKey(e => e.Id)
                .HasName("professor_pk");

            entity.ToTable("Professor");

            entity.Property(e => e.Id).HasColumnName("p_id");

            entity.Property(e => e.DepartmentId).HasColumnName("dept_id");

            entity.Property(e => e.Name)
                .HasMaxLength(30)
                .HasColumnName("p_name");

            entity.HasOne(d => d.Department)
                .WithMany(p => p.Professors)
                .HasForeignKey(d => d.DepartmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("dept_id");
        });

        modelBuilder.Entity<Semester>(entity =>
        {
            entity.HasKey(e => e.Id)
                .HasName("semester_pk");

            entity.ToTable("Semester");

            entity.Property(e => e.Id).HasColumnName("s_id");

            entity.Property(e => e.Year).HasColumnName("s_year");

            entity.Property(typeof(int), "TermId")
                .HasColumnName("t_id");

            entity.HasOne(d => d.Term)
                .WithMany()
                .HasForeignKey("TermId")
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("t_id");
        });

        modelBuilder.Entity<SemesterOffer>(entity =>
        {
            entity.HasKey(e => e.Id)
                .HasName("semesteroffer_pk");

            entity.ToTable("SemesterOffer");

            entity.Property(e => e.Id).HasColumnName("so_id");

            entity.Property(e => e.SectionName)
                .HasColumnName("so_section_name");

            entity.Property(typeof(int), "CourseId").HasColumnName("c_id");

            entity.Property(typeof(int), "SemesterId").HasColumnName("s_id");

            entity.Property(e => e.Capacity).HasColumnName("so_capacity");

            entity.HasOne(d => d.Course)
                .WithMany()
                .HasForeignKey("CourseId")
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("c_id");

            entity.HasOne(d => d.Semester)
                .WithMany()
                .HasForeignKey("SemesterId")
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("s_id");

            entity.HasMany(d => d.Professors)
                .WithMany(p => p.OffersTeached)
                .UsingEntity<Dictionary<string, object>>(
                    "ProfessorTeach",
                    l => l.HasOne<Professor>().WithMany().HasForeignKey("PId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("p_id"),
                    r => r.HasOne<SemesterOffer>().WithMany().HasForeignKey("SoId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("so_id"),
                    j =>
                    {
                        j.HasKey("SoId", "PId").HasName("professorteaches_pk");

                        j.ToTable("ProfessorTeaches");

                        j.IndexerProperty<int>("SoId").HasColumnName("so_id");

                        j.IndexerProperty<int>("PId").HasColumnName("p_id");
                    });
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.Id)
                .HasName("student_pk");

            entity.ToTable("Student");

            entity.HasIndex(e => e.Email, "st_email_unique")
                .IsUnique();

            entity.Property(e => e.Id).HasColumnName("st_id");

            entity.Property(e => e.DepartmentId).HasColumnName("dept_id");

            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("st_email");

            entity.HasOne(d => d.Department)
                .WithMany(p => p.Students)
                .HasForeignKey(d => d.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("dept_id");
        });

        modelBuilder.Entity<Term>(entity =>
        {
            entity.HasKey(e => e.Id)
                .HasName("term_pk");

            entity.ToTable("Term");

            entity.HasIndex(e => e.TermName, "term_name_unique")
                .IsUnique();

            entity.Property(e => e.Id).HasColumnName("t_id");

            entity.Property(e => e.TermName)
                .HasMaxLength(50)
                .HasColumnName("t_name");
        });

        modelBuilder.Entity<TimeSlot>(entity =>
        {
            entity.ToTable("TimeSlot");

            entity.Property(e => e.EndTime).HasColumnName("ts_end_time");

            entity.Property(e => e.StartTime).HasColumnName("ts_start_time");

            entity.Property(typeof(int), "SoId")
                .HasColumnName("so_id");

            entity.Property(typeof(int), "DId")
                .HasColumnName("d_id");
            
            entity.HasKey("EndTime", "StartTime", "SoId", "DId")
                .HasName("timeslot_pk");

            entity.HasOne<SemesterOffer>()
                .WithMany(so => so.TimeSlots)
                .HasForeignKey("SoId")
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("so_id");
            
            entity.HasOne(d => d.WeekDay)
                .WithMany()
                .HasForeignKey("DId")
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("d_id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}