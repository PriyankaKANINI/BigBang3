//using Microsoft.EntityFrameworkCore;
//using Tour_Booking.Interfaces;
//using Tour_Booking.Models;
//using TourUsers.Models;

//namespace Tour_Booking.Services
//{
//    public class BookingRepo : IRepo<int, Booking>
//    {
//        private readonly Context _context;
//        private readonly ILogger<BookingRepo> _logger;

//        public BookingRepo(Context context, ILogger<BookingRepo> logger)
//        {
//            _context = context;
//            _logger = logger;
//        }

//        public async Task<Booking?> Add(Booking item)
//        {
//            try
//            {
//                _context.Bookings.Add(item);
//                await _context.SaveChangesAsync();
//                return item;
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex.Message);
//            }
//            return null;
//        }

//        public async Task<Booking?> Delete(int key)
//        {
//            try
//            {
//                var booking = await Get(key);
//                if (booking != null)
//                {
//                    _context.Bookings.Remove(booking);
//                    await _context.SaveChangesAsync();
//                    return booking;
//                }
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex.Message);
//            }
//            return null;
//        }

//        public async Task<Booking?> Get(int key)
//        {
//            try
//            {
//                var booking = await _context.Bookings
//                    .Include(b => b.Package)
//                    .Include(b => b.Customer)
//                    .Include(b => b.Guests)
//                    .Include(b => b.Agent)
//                    .Include(b => b.Traveler)
//                    .FirstOrDefaultAsync(b => b.BookingId == key);

//                return booking;
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex.Message);
//            }
//            return null;
//        }

//        public async Task<ICollection<Booking>?> GetAll()
//        {
//            try
//            {
//                var bookingList = await _context.Bookings
//                    .Include(b => b.Package)
//                    .Include(b => b.Customer)
//                    .Include(b => b.Guests)
//                    .Include(b => b.Agent)
//                    .Include(b => b.Traveler)
//                    .ToListAsync();

//                if (bookingList.Count > 0)
//                    return bookingList;
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex.Message);
//            }
//            return null;
//        }

//        public async Task<Booking?> Update(Booking item)
//        {
//            try
//            {
//                var booking = await Get(item.BookingId);
//                if (booking != null)
//                {
//                    booking.PackageId = item.PackageId;
//                    booking.CustomerId = item.CustomerId;
//                    booking.Guests = item.Guests;
//                    booking.AgentId = item.AgentId;
//                    booking.TravelerId = item.TravelerId;
//                    booking.BookingDate = item.BookingDate;
//                    booking.StartDate = item.StartDate;
//                    booking.EndDate = item.EndDate;
//                    booking.TotalAmount = item.TotalAmount;
//                    booking.PaymentMethod = item.PaymentMethod;
//                    booking.BookingStatus = item.BookingStatus;
//                    booking.AdditionalDetails = item.AdditionalDetails;

//                    await _context.SaveChangesAsync();
//                    return booking;
//                }
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex.Message);
//            }
//            return null;
//        }
//    }
//}
