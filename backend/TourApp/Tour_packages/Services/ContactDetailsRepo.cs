using Microsoft.EntityFrameworkCore;
using Tour_packages.Interfaces;
using Tour_packages.Models;

namespace Tour_packages.Services
{
    public class ContactDetailsRepo : IRepo<int, ContactDetails>
    {
        private readonly TourPackageContext _context;
        private readonly ILogger<ContactDetails> _logger;

        public ContactDetailsRepo(TourPackageContext context, ILogger<ContactDetails> logger)
        {
            _context = context;
            _logger = logger;
        }
        public async Task<ContactDetails?> Add(ContactDetails item)
        {
            try
            {
                _context.Contacts.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ContactDetails?> Delete(int key)
        {
            try
            {
                var contact = await Get(key);
                if (contact != null)
                {
                    _context.Contacts.Remove(contact);
                    await _context.SaveChangesAsync();
                    return contact;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ContactDetails?> Get(int key)
        {
            try
            {
                var contact = await _context.Contacts.FirstOrDefaultAsync(i => i.PackageId == key);
                return contact;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<ContactDetails>?> GetAll()
        {
            try
            {
                var contact = await _context.Contacts.ToListAsync();
                if (contact.Count > 0)
                    return contact;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ContactDetails?> Update(ContactDetails item)
        {

            try
            {
                var existingContact = await _context.Contacts.FindAsync(item.ContactId);
                if (existingContact != null)
                {
                    existingContact.TravelAgentName = item.TravelAgentName;
                    existingContact.Email = item.Email;
                    existingContact.Phone = item.Phone;


                    await _context.SaveChangesAsync();

                    return existingContact;
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

