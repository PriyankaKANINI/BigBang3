using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Tour_Feedback.Models
{
    public class FeedbackContext : DbContext
    {
        public FeedbackContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Feedback>? Feedbacks { get; set; }
    }
}
