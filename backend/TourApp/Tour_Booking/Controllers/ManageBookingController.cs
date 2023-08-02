//using Microsoft.AspNetCore.Mvc;
//using Tour_Booking.Models;
//using Tour_Booking.Services;

//namespace Tour_Booking.Controllers
//{
//    [ApiController]
//    [Route("api/bookings")]
//    public class BookingController : ControllerBase
//    {
//        private readonly ManageBookingService _bookingService;

//        public BookingController(ManageBookingService bookingService)
//        {
//            _bookingService = bookingService;
//        }

//        [HttpPost]
//        public async Task<IActionResult> CreateBooking(int packageId, int customerId, int agentId, int travelerId, List<Customer> guests)
//        {
//            var booking = await _bookingService.AddBooking(packageId, customerId, agentId, travelerId, guests);
//            if (booking != null)
//            {
//                return CreatedAtAction(nameof(GetBooking), new { id = booking.BookingId }, booking);
//            }
//            return BadRequest("Failed to create booking.");
//        }

//        [HttpGet("{id}")]
//        public async Task<IActionResult> GetBooking(int id)
//        {
//            var booking = await _bookingService.GetBooking(id);
//            if (booking != null)
//            {
//                return Ok(booking);
//            }
//            return NotFound();
//        }

//        [HttpPut("{id}")]
//        public async Task<IActionResult> UpdateBooking(int id, Booking updatedBooking)
//        {
//            if (id != updatedBooking.BookingId)
//            {
//                return BadRequest("Invalid booking ID.");
//            }

//            var booking = await _bookingService.UpdateBooking(updatedBooking);
//            if (booking != null)
//            {
//                return Ok(booking);
//            }
//            return NotFound();
//        }

//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteBooking(int id)
//        {
//            var booking = await _bookingService.DeleteBooking(id);
//            if (booking != null)
//            {
//                return Ok(booking);
//            }
//            return NotFound();
//        }

//        [HttpGet]
//        public async Task<IActionResult> GetAllBookings()
//        {
//            var bookings = await _bookingService.GetAllBookings();
//            if (bookings != null)
//            {
//                return Ok(bookings);
//            }
//            return NotFound();
//        }
//    }
//}
