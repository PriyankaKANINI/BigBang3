﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Tour_packages.Models;

#nullable disable

namespace Tour_packages.Migrations
{
    [DbContext(typeof(TourPackageContext))]
    [Migration("20230805123529_dbpackages")]
    partial class dbpackages
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Tour_packages.Models.ContactDetails", b =>
                {
                    b.Property<int>("ContactId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ContactId"), 1L, 1);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TravelAgentName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ContactId");

                    b.HasIndex("PackageId")
                        .IsUnique();

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("Tour_packages.Models.Itinerary", b =>
                {
                    b.Property<int>("ItineraryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ItineraryId"), 1L, 1);

                    b.Property<string>("DayandVisit")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DestinationDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DestinationName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.HasKey("ItineraryId");

                    b.HasIndex("PackageId");

                    b.ToTable("Itineraries");
                });

            modelBuilder.Entity("Tour_packages.Models.Package", b =>
                {
                    b.Property<int>("PackageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PackageId"), 1L, 1);

                    b.Property<string>("ArrivalPoint")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("AvailablityCount")
                        .HasColumnType("int");

                    b.Property<string>("DeparturePoint")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Destination")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EndDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PackageName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Rate")
                        .HasColumnType("float");

                    b.Property<string>("StartDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TotalDays")
                        .HasColumnType("int");

                    b.Property<string>("Transportation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TravelAgencyName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PackageId");

                    b.ToTable("Packages");
                });

            modelBuilder.Entity("Tour_packages.Models.ContactDetails", b =>
                {
                    b.HasOne("Tour_packages.Models.Package", "Package")
                        .WithOne("ContactDetails")
                        .HasForeignKey("Tour_packages.Models.ContactDetails", "PackageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Package");
                });

            modelBuilder.Entity("Tour_packages.Models.Itinerary", b =>
                {
                    b.HasOne("Tour_packages.Models.Package", "Package")
                        .WithMany("Itinerary")
                        .HasForeignKey("PackageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Package");
                });

            modelBuilder.Entity("Tour_packages.Models.Package", b =>
                {
                    b.Navigation("ContactDetails");

                    b.Navigation("Itinerary");
                });
#pragma warning restore 612, 618
        }
    }
}
