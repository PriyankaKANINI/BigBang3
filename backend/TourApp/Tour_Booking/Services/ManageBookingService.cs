using Tour_Booking.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tour_Booking.Interfaces;

namespace Tour_Booking.Services
{
    public class ManageBookingService : IManageBooking
    {
        private readonly IRepo<int, Booking> _bookingRepo;

        public ManageBookingService(IRepo<int, Booking> bookingRepo)
        {
            _bookingRepo = bookingRepo;
        }
        public double CalculateTotalAmount(double amount, int? addTravelerCount)
        {
            if (addTravelerCount.HasValue && addTravelerCount.Value > 0)
            {
                return amount * addTravelerCount.Value;
            }

            return amount;
        }
    }
}
