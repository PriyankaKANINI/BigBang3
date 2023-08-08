using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Tour_Feedback.Interfaces;
using Tour_Feedback.Models;

namespace Tour_Feedback.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly FeedbackContext _dbContext;

        public FeedbackService(FeedbackContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Feedback> AddFeedback(Feedback item)
        {
            try
            {
                _dbContext.Feedbacks.Add(item);
                await _dbContext.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding feedback: " + ex.Message);
            }
        }

        public async Task<ICollection<Feedback>?> GetAllFeedback()
        {
            try
            {
                var feedback = await _dbContext.Feedbacks.ToListAsync();
                return feedback;
            }
            catch (Exception ex)
            {
                throw new Exception("Error retrieving feedback: " + ex.Message);
            }
        }

        public async Task<Feedback> GetFeedback(int id)
        {
            try
            {
                var feedback = await _dbContext.Feedbacks.FindAsync(id);
                return feedback;
            }
            catch (Exception ex)
            {
                throw new Exception("Error retrieving feedback: " + ex.Message);
            }
        }
    }
}
