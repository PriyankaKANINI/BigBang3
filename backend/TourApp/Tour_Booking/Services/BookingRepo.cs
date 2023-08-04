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
    public class BookingRepo : IRepo<int, Booking>
    {
        private readonly BookingContext _context;
        private readonly ILogger<BookingRepo> _logger;

        public BookingRepo(BookingContext context, ILogger<BookingRepo> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Booking?> Add(Booking item)
        {
            try
            {
                _context.Bookings.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Booking?> Delete(int key)
        {
            try
            {
                var booking = await Get(key);
                if (booking != null)
                {
                    _context.Bookings.Remove(booking);
                    await _context.SaveChangesAsync();
                    return booking;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Booking?> Get(int key)
        {
            try
            {
                var booking = await _context.Bookings
                    .Include(b => b.AdditionalTravelers)
                    .FirstOrDefaultAsync(b => b.BookingId == key);
                return booking;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<Booking>?> GetAll()
        {
            try
            {
                var bookings = await _context.Bookings
                    .Include(b => b.AdditionalTravelers)
                    .ToListAsync();
                if (bookings.Count > 0)
                    return bookings;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Booking?> Update(Booking item)
        {
            try
            {
                var existingBooking = await _context.Bookings.FindAsync(item.BookingId);
                if (existingBooking != null)
                {
                    existingBooking.PackageId = item.PackageId;
                    existingBooking.AddTravelerCount = item.AddTravelerCount;
                    existingBooking.AgentID = item.AgentID;
                    existingBooking.TravelerID = item.TravelerID;
                    existingBooking.Amount = item.Amount;
                    existingBooking.TotalAmount = item.TotalAmount;
                    // You may need to handle AdditionalTravelers updates here as well.

                    await _context.SaveChangesAsync();

                    return existingBooking;
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
