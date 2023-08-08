//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Logging;
//using Moq;
//using System;
//using System.Collections.Generic;
//using System.Threading.Tasks;
//using Tour_Booking.Interfaces;
//using Tour_Booking.Models;
//using Tour_Booking.Services;
//using Xunit;

//namespace Tour_Booking.Tests
//{
//    public class BookingRepoTests
//    {
//        [Fact]
//        public async Task Add_ValidBooking_ReturnsAddedItem()
//        {
//            var options = new DbContextOptionsBuilder<BookingContext>()
//                .UseInMemoryDatabase(databaseName: "TestDb")
//                .Options;

//            using (var context = new BookingContext(options))
//            {
//                var loggerMock = new Mock<ILogger<BookingRepo>>();
//                var repo = new BookingRepo(context, loggerMock.Object);
//                var booking = new Booking { /* Initialize booking properties */ };

//                var addedBooking = await repo.Add(booking);

//                Assert.NotNull(addedBooking);
//                // Perform additional assertions if needed
//            }
//        }

//        [Fact]
//        public async Task Delete_ExistingBooking_ReturnsDeletedItem()
//        {
//            var options = new DbContextOptionsBuilder<BookingContext>()
//                .UseInMemoryDatabase(databaseName: "TestDb")
//                .Options;

//            using (var context = new BookingContext(options))
//            {
//                var loggerMock = new Mock<ILogger<BookingRepo>>();
//                var repo = new BookingRepo(context, loggerMock.Object);
//                var booking = new Booking { /* Initialize booking properties */ };
//                context.Bookings.Add(booking);
//                context.SaveChanges();

//                var deletedBooking = await repo.Delete(booking.BookingId);

//                Assert.NotNull(deletedBooking);
//            }
//        }

//        // Additional test methods for Get, GetAll, Update can be added similarly
//    }
//}
