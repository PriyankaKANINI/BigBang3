using Microsoft.EntityFrameworkCore;
using Tour_Images.Interfaces;
using Tour_Images.Models;

namespace Tour_Images.Services
{
    public class TourImageRepo : IRepo<int, TourImage>
    {
        private readonly TourImageContext _context;
        public TourImageRepo(TourImageContext context)
        {
            _context = context;
        }
        public async Task<TourImage?> Add(TourImage item)
        {
            _context.TourImages.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public Task<TourImage?> Delete(TourImage item)
        {
            throw new NotImplementedException();
        }

        public async Task<TourImage?> Get(int id)
        {
            return await _context.TourImages.FindAsync(id);
        }

        public async Task<ICollection<TourImage>?> GetAll()
        {
            return await _context.TourImages.ToListAsync();
        }

        public Task<TourImage?> Update(TourImage item)
        {
            throw new NotImplementedException();
        }
    }
}
