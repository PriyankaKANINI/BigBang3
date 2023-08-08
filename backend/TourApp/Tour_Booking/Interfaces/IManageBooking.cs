using Tour_Booking.Models;

namespace Tour_Booking.Interfaces
{
    public interface IManageBooking
    {
        double CalculateTotalAmount(double amount, int? addTravelerCount);
    }
}
