using Microsoft.EntityFrameworkCore;
using Tour_Images.Interfaces;
using Tour_Images.Models;
using Tour_Images.Services;

namespace Tour_Images
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<TourImageContext>(opts =>
            {
                opts.UseSqlServer(builder.Configuration.GetConnectionString("Conn"));
            });

            builder.Services.AddScoped<IRepo<int, TourImage>, TourImageRepo>();
            builder.Services.AddScoped<ITourImageService, TourImageService>();



            builder.Services.AddCors(opts =>
            {
                opts.AddPolicy("AngularCORS", options =>
                {
                    options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseAuthentication();
            app.UseCors("AngularCORS");
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}

