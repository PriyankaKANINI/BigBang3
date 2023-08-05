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

        public FeedbackRepo(FeedbackContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Feedback?> Add(Feedback item)
        {
            try
            {
                _dbContext.Feedbacks.Add(item);
                await _dbContext.SaveChangesAsync();
                return item;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Feedback?> Update(Feedback item)
        {
            try
            {
                _dbContext.Entry(item).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return item;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Feedback?> Delete(int id)
        {
            try
            {
                var feedback = await _dbContext.Feedbacks.FindAsync(id);
                if (feedback == null)
                    return null;

                _dbContext.Feedbacks.Remove(feedback);
                await _dbContext.SaveChangesAsync();
                return feedback;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Feedback?> Get(int id)
        {
            try
            {
                return await _dbContext.Feedbacks.FindAsync(id);
            }
            catch
            {
                return null;
            }
        }

        public async Task<ICollection<Feedback>?> GetAll()
        {
            try
            {
                return await _dbContext.Feedbacks.ToListAsync();
            }
            catch
            {
                return null;
            }
        }
    }
}
