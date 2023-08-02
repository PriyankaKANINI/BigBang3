//using Microsoft.EntityFrameworkCore;
//using Tour_Booking.Interfaces;
//using Tour_Booking.Models;
//using TourUsers.Models;

//namespace Tour_Booking.Services
//{
//    public class CustomerRepo : IRepo<int, Customer>
//    {
//        private readonly Context _context;
//        private readonly ILogger<CustomerRepo> _logger;

//        public CustomerRepo(Context context, ILogger<CustomerRepo> logger)
//        {
//            _context = context;
//            _logger = logger;
//        }

//        public async Task<Customer?> Add(Customer item)
//        {
//            try
//            {
//                _context.Customers.Add(item);
//                await _context.SaveChangesAsync();
//                return item;
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex.Message);
//            }
//            return null;
//        }

//        public async Task<Customer?> Delete(int key)
//        {
//            try
//            {
//                var customer = await Get(key);
//                if (customer != null)
//                {
//                    _context.Customers.Remove(customer);
//                    await _context.SaveChangesAsync();
//                    return customer;
//                }
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex.Message);
//            }
//            return null;
//        }

//        public async Task<Customer?> Get(int key)
//        {
//            try
//            {
//                var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerId == key);
//                return customer;
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex.Message);
//            }
//            return null;
//        }

//        public async Task<ICollection<Customer>?> GetAll()
//        {
//            try
//            {
//                var customerList = await _context.Customers.ToListAsync();
//                if (customerList.Count > 0)
//                    return customerList;
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex.Message);
//            }
//            return null;
//        }

//        public async Task<Customer?> Update(Customer item)
//        {
//            try
//            {
//                var customer = await Get(item.CustomerId);
//                if (customer != null)
//                {
//                    customer.CustomerName = item.CustomerName;
//                    customer.CustomerEmail = item.CustomerEmail;
//                    customer.CustomerPhone = item.CustomerPhone;

//                    await _context.SaveChangesAsync();
//                    return customer;
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
