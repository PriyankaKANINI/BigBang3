using Tour_Booking.Models;
//using Tour_packages.Models;
//using Tour_LoginRegister.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Tour_Booking.Interfaces;
//using Tour_packages.Services;

namespace Tour_Booking.Services
{
    public class ManageBookingService : IManageBooking
    {
        private readonly IRepo<int, Booking> _bookingRepo;
        private readonly IRepo<int, AdditionalTraveler> _additionalTravelersRepo;

        public ManageBookingService(IRepo<int, Booking> bookingRepo, IRepo<int, AdditionalTraveler> additionalTravelersRepo)
        {
            _bookingRepo = bookingRepo;
            _additionalTravelersRepo = additionalTravelersRepo;
        }

        public async Task<Booking> AddBooking(Booking booking)
        {
            booking.TotalAmount = booking.Amount * booking.AddTravelerCount;
            booking = await _bookingRepo.Add(booking);

            if (booking != null && booking.AdditionalTravelers != null)
            {
                foreach (var traveler in booking.AdditionalTravelers)
                {
                    traveler.BookingId = booking.BookingId;
                    await _additionalTravelersRepo.Add(traveler);
                }
            }
            return booking;
        }


        public async Task<Booking> DeleteBooking(int bookingId)
        {
            var booking = await _bookingRepo.Get(bookingId);
            if (booking != null)
            {
                return await _bookingRepo.Delete(bookingId);
            }
            return null;
        }

        public async Task<ICollection<Booking>> GetAll()
        {
            return await _bookingRepo.GetAll();
        }

        public async Task<Booking> GetById(int bookingId)
        {
            return await _bookingRepo.Get(bookingId);
        }

        public async Task<Booking> UpdateBooking(Booking booking)
        {
            var existingBooking = await _bookingRepo.Get(booking.BookingId);
            if (existingBooking != null)
            {
                if (existingBooking.Amount != booking.Amount || existingBooking.AddTravelerCount != booking.AddTravelerCount)
                {
                    int totalTravelersCount = booking.AddTravelerCount + 1;
                    booking.TotalAmount = booking.Amount * totalTravelersCount;
                }

                existingBooking.Amount = booking.Amount;
                existingBooking.AddTravelerCount = booking.AddTravelerCount;
                existingBooking.TotalAmount = booking.TotalAmount;

                await _bookingRepo.Update(existingBooking);

                if (booking.AdditionalTravelers != null)
                {
                    foreach (var traveler in booking.AdditionalTravelers)
                    {
                        var existingTraveler = await _additionalTravelersRepo.Get(traveler.AdditionalTravelerId);
                        if (existingTraveler != null)
                        {
                            existingTraveler.AdditionalTravelerName = traveler.AdditionalTravelerName;
                            existingTraveler.AdditionalTravelerAge = traveler.AdditionalTravelerAge;
                            existingTraveler.AdditionalTravelerPhone = traveler.AdditionalTravelerPhone;
                        
                            await _additionalTravelersRepo.Update(existingTraveler);
                        }
                        else
                        {
                            traveler.BookingId = booking.BookingId;
                            await _additionalTravelersRepo.Add(traveler);
                        }
                    }
                }
            }
            return existingBooking;
        }
    }
}
