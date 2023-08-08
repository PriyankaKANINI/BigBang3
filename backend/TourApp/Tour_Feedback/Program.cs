using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Tour_Feedback.Interfaces;
using Tour_Feedback.Models;
using Tour_Feedback.Services;
namespace Tour_Feedback
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<FeedbackContext>(opts =>
            {
                opts.UseSqlServer(builder.Configuration.GetConnectionString("Conn"));
            });

            builder.Services.AddScoped<IRepo<int, Feedback>, FeedbackRepo>();
            builder.Services.AddScoped<IFeedbackService, FeedbackService>();
            // Configure CORS
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

            // Use CORS middleware
            app.UseCors("AngularCORS");

            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
