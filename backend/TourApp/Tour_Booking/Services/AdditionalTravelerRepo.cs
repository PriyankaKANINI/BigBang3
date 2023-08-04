using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tour_Booking.Models;
using Tour_Booking.Interfaces;

namespace Tour_Booking.Services
{
    public class AdditionalTravelerRepo : IRepo<int, AdditionalTraveler>
    {
        private readonly BookingContext _context;
        private readonly ILogger<AdditionalTraveler> _logger;

        public AdditionalTravelerRepo(BookingContext context, ILogger<AdditionalTraveler> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<AdditionalTraveler?> Add(AdditionalTraveler item)
        {
            try
            {
                _context.AdditionalTravelers.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<AdditionalTraveler?> Delete(int key)
        {
            try
            {
                var traveler = await Get(key);
                if (traveler != null)
                {
                    _context.AdditionalTravelers.Remove(traveler);
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

        public async Task<AdditionalTraveler?> Get(int key)
        {
            try
            {
                var traveler = await _context.AdditionalTravelers
                    .FirstOrDefaultAsync(at => at.AdditionalTravelerId == key);
                return traveler;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<AdditionalTraveler>?> GetAll()
        {
            try
            {
                var travelers = await _context.AdditionalTravelers.ToListAsync();
                if (travelers.Count > 0)
                    return travelers;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<AdditionalTraveler?> Update(AdditionalTraveler item)
        {
            try
            {
                var existingTraveler = await _context.AdditionalTravelers
                    .FirstOrDefaultAsync(at => at.AdditionalTravelerId == item.AdditionalTravelerId);

                if (existingTraveler != null)
                {
                    existingTraveler.PackageId = item.PackageId;
                    existingTraveler.TravelerId = item.TravelerId;
                    existingTraveler.BookingId = item.BookingId;
                    existingTraveler.AdditionalTravelerName = item.AdditionalTravelerName;
                    existingTraveler.AdditionalTravelerAge = item.AdditionalTravelerAge;
                    existingTraveler.AdditionalTravelerPhone = item.AdditionalTravelerPhone;

                    await _context.SaveChangesAsync();
                    return existingTraveler;
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
