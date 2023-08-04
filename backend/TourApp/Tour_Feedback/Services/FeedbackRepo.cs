using Microsoft.EntityFrameworkCore;
using Tour_Feedback.Interfaces;
using Tour_Feedback.Models;

namespace Tour_Feedback.Services
{
    public class FeedbackRepo : IRepo<Feedback, int>
    {
        private readonly FeedbackContext _context;
        public FeedbackRepo(FeedbackContext context)
        {
            _context = context;
        }
        public async Task<Feedback?> Add(Feedback item)
        {

            var fb = _context.Feedbacks.SingleOrDefault(f => f.FeedbackID == item.FeedbackID);
            if (fb == null)
            {
                try
                {
                    _context.Feedbacks.Add(item);
                    await _context.SaveChangesAsync();
                    return item;
                }
                catch (Exception)
                {
                    throw new Exception();
                }

            }
            return null;
        }

        public async Task<Feedback?> Delete(int id)
        {
            try
            {
                var fb = await Get(id);
                if (fb != null)
                {
                    _context.Feedbacks.Remove(fb);
                    await _context.SaveChangesAsync();
                    return fb;
                }
                return null;

            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<Feedback?> Get(int id)
        {
            try
            {
                var user = await _context.Feedbacks.SingleOrDefaultAsync(f => f.FeedbackID == id);
                if (user == null)
                {
                    return null;
                }
                return user;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<ICollection<Feedback>?> GetAll()
        {
            try
            {
                var fb = await _context.Feedbacks.ToListAsync();
                if (fb != null)
                {
                    return fb;
                }
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<Feedback?> Update(Feedback item)
        {
            var fb = _context.Feedbacks.SingleOrDefault(f => f.FeedbackID == item.FeedbackID);
            if (fb != null)
            {
                try
                {
                    fb.TravelerID = item.TravelerID;
                    fb.TourPackageId = item.TourPackageId;
                    fb.Ratings = item.Ratings;
                    fb.Comment = item.Comment;
                    await _context.SaveChangesAsync();
                    return fb;
                }
                catch (Exception)
                {
                    throw new Exception();
                }
            }
            return null;
        }
    }
}
