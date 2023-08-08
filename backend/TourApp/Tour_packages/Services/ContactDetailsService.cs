using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tour_packages.Interfaces;
using Tour_packages.Models;

namespace Tour_packages.Services
{
    public class ContactDetailsService : IContactService
    {
        private readonly IRepo<int, ContactDetails> _contactDetailsRepo;

        public ContactDetailsService(IRepo<int, ContactDetails> contactDetailsRepo)
        {
            _contactDetailsRepo = contactDetailsRepo;
        }

        public async Task<ContactDetails?> AddContactDetails(ContactDetails contactDetails)
        {
            try
            {
                return await _contactDetailsRepo.Add(contactDetails);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error adding contact details: " + ex.Message);
                return null;
            }
        }

        public async Task<ContactDetails?> DeleteContactDetails(int id)
        {
            try
            {
                var contactDetails = await _contactDetailsRepo.Get(id);
                if (contactDetails != null)
                {
                    return await _contactDetailsRepo.Delete(id);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error deleting contact details: " + ex.Message);
            }
            return null;
        }

        public async Task<ContactDetails?> UpdateContactDetails(ContactDetails contactDetails)
        {
            try
            {
                return await _contactDetailsRepo.Update(contactDetails);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error updating contact details: " + ex.Message);
                return null;
            }
        }

        public async Task<ContactDetails?> GetContactDetailsById(int id)
        {
            try
            {
                return await _contactDetailsRepo.Get(id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error getting contact details: " + ex.Message);
                return null;
            }
        }

        public async Task<ICollection<ContactDetails>?> GetAllContactDetails()
        {
            try
            {
                return await _contactDetailsRepo.GetAll();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error getting all contact details: " + ex.Message);
                return null;
            }
        }
    }
}
