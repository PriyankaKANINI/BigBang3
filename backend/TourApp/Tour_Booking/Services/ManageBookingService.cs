//using Tour_Booking.Models;
//using Tour_packages.Models;
//using TourUsers.Models;
//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;
//using Tour_Booking.Interfaces;

//namespace Tour_Booking.Services
//{
//    public class ManageBookingService
//    {
//        private readonly IRepo<int, Booking> _bookingRepo;
//        private readonly IRepo<int, Customer> _customerRepo;
//        private readonly IRepo<int, Package> _packageRepo;
//        private readonly IRepo<int, Agent> _agentRepo;
//        private readonly IRepo<int, Traveler> _travelerRepo;

//        public ManageBookingService(
//            IRepo<int, Booking> bookingRepo,
//            IRepo<int, Customer> customerRepo,
//            IRepo<int, Package> packageRepo,
//            IRepo<int, Agent> agentRepo,
//            IRepo<int, Traveler> travelerRepo)
//        {
//            _bookingRepo = bookingRepo;
//            _customerRepo = customerRepo;
//            _packageRepo = packageRepo;
//            _agentRepo = agentRepo;
//            _travelerRepo = travelerRepo;
//        }

//        public async Task<Booking?> AddBooking(int packageId, int customerId, int agentId, int travelerId, List<Customer> guests)
//        {
//            try
//            {
//                var package = await _packageRepo.Get(packageId);
//                var customer = await _customerRepo.Get(customerId);
//                var agent = await _agentRepo.Get(agentId);
//                var traveler = await _travelerRepo.Get(travelerId);

//                if (package == null || customer == null || agent == null || traveler == null)
//                {
//                    return null;
//                }

//                var booking = new Booking
//                {
//                    PackageId = packageId,
//                    CustomerId = customerId,
//                    AgentId = agentId,
//                    TravelerId = travelerId,
//                    Guests = guests,
//                    BookingDate = DateTime.Now,
//                    StartDate = DateTime.Now.Date,
//                    EndDate = DateTime.Now.Date.AddDays(7)
//                };

//                booking.CalculateTotalAmount();

//                return await _bookingRepo.Add(booking);
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine(ex.Message);
//            }
//            return null;
//        }

//        public async Task<Booking?> GetBooking(int bookingId)
//        {
//            try
//            {
//                return await _bookingRepo.Get(bookingId);
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine(ex.Message);
//            }
//            return null;
//        }

//        public async Task<Booking?> UpdateBooking(Booking updatedBooking)
//        {
//            try
//            {
//                var existingBooking = await _bookingRepo.Get(updatedBooking.BookingId);
//                if (existingBooking == null)
//                {
//                    return null;
//                }
//                updatedBooking.CalculateTotalAmount();

//                return await _bookingRepo.Update(updatedBooking);
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine(ex.Message);
//            }
//            return null;
//        }

//        public async Task<Booking?> DeleteBooking(int bookingId)
//        {
//            try
//            {
//                var booking = await _bookingRepo.Get(bookingId);
//                if (booking == null)
//                {
//                    return null;
//                }

//                return await _bookingRepo.Delete(bookingId);
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine(ex.Message);
//            }
//            return null;
//        }

//        public async Task<ICollection<Booking>?> GetAllBookings()
//        {
//            try
//            {
//                return await _bookingRepo.GetAll();
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine(ex.Message);
//            }
//            return null;
//        }
//    }
//}