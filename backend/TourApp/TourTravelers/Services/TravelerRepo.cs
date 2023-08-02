using Microsoft.EntityFrameworkCore;
using TourUsers.Interfaces;
using TourUsers.Models;

namespace TourUsers.Services
{
    public class TravelerRepo : IRepo<int, Traveler>
    {
        private readonly Context _context;
        private readonly ILogger<TravelerRepo> _logger;
        public TravelerRepo(Context context, ILogger<TravelerRepo> logger) 
        {
            _context = context;
            _logger = logger;
        }
        public async Task<Traveler?> Add(Traveler item)
        {
            try
            {
                _context.Travelers.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Traveler?> Delete(int key)
        {
            try
            {
                var traveler = await Get(key);
                if (traveler != null)
                {
                    _context.Travelers.Remove(traveler);
                    await _context.SaveChangesAsync();
                    return traveler;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Traveler?> Get(int key)
        {
            try
            {
                var traveler = await _context.Travelers.FirstOrDefaultAsync(c => c.TravelerID == key);
                return traveler;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<Traveler>?> GetAll()
        {
            try
            {
                var travelers = await _context.Travelers.ToListAsync();
                if (travelers.Count > 0)
                    return travelers;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Traveler?> Update(Traveler item)
        {
            try
            {
                var traveler = await Get(item.TravelerID);
                if (traveler != null)
                {
                    traveler.TravelerName = traveler.TravelerName;
                    traveler.DateOfBirth = item.DateOfBirth;
                    traveler.Age = item.Age;
                    traveler.Gender = item.Gender;
                    traveler.Phone = item.Phone;
                    traveler.Email = item.Email;
                    traveler.Address = item.Address;
                    traveler.Nationality = item.Nationality;
                    await _context.SaveChangesAsync();
                    return traveler;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }
    }
}
