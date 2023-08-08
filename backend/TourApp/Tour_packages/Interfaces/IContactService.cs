using Tour_packages.Models;

namespace Tour_packages.Interfaces
{
    public interface IContactService
    {
        public Task<ContactDetails?> AddContactDetails(ContactDetails contactDetails);
        public Task<ContactDetails?> DeleteContactDetails(int id);
        public Task<ContactDetails?> UpdateContactDetails(ContactDetails contactDetails);
        public Task<ContactDetails?> GetContactDetailsById(int id);
        public Task<ICollection<ContactDetails>?> GetAllContactDetails();
    }
}
