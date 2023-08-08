using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Tour_Feedback.Interfaces;
using Tour_Feedback.Models;

namespace Tour_Feedback.Services
{
    public class FeedbackRepo : IRepo<int, Feedback>
    {
        private readonly FeedbackContext _dbContext;
        private readonly ILogger<FeedbackRepo> _logger;

        public FeedbackRepo(FeedbackContext dbContext, ILogger<FeedbackRepo> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<Feedback?> Add(Feedback item)
        {
            try
            {
                _dbContext.Feedbacks.Add(item);
                await _dbContext.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }


        public async Task<Feedback?> Get(int id)
        {
            try
            {
                return await _dbContext.Feedbacks.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<Feedback>?> GetAll()
        {
            try
            {
                return await _dbContext.Feedbacks.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }
    }
}
