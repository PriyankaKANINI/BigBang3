using Microsoft.EntityFrameworkCore;
using Tour_packages.Interfaces;
using Tour_packages.Models;

namespace Tour_packages.Services
{
    public class ItineraryRepo : IRepo<int, Itinerary>
    {
        private readonly TourPackageContext _context;
        private readonly ILogger _logger;

        public ItineraryRepo(TourPackageContext tourPackageContext, ILogger<Itinerary> logger)
        {
            _context = tourPackageContext;
            _logger = logger;
        }
        public async Task<Itinerary?> Add(Itinerary item)
        {

            try
            {
                _context.Itineraries.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Itinerary?> Delete(int key)
        {
            try
            {
                var pack = await Get(key);
                if (pack != null)
                {
                    _context.Itineraries.Remove(pack);
                    await _context.SaveChangesAsync();
                    return pack;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Itinerary?> Get(int key)
        {
            try
            {
                var pack = await _context.Itineraries.FirstOrDefaultAsync(i => i.ItineraryId == key);
                return pack;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<Itinerary>?> GetAll()
        {
            try
            {
                var pack = await _context.Itineraries.ToListAsync();
                if (pack.Count > 0)
                    return pack;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Itinerary?> Update(Itinerary item)
        {
            try
            {
                var existingItinerary = await _context.Itineraries.FindAsync(item.ItineraryId);
                if (existingItinerary != null)
                {
                    existingItinerary.DayandVisit = item.DayandVisit;
                    existingItinerary.DestinationName = item.DestinationName;

                    await _context.SaveChangesAsync();

                    return existingItinerary;
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
