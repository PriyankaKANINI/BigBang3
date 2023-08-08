using Microsoft.EntityFrameworkCore;
using Tour_packages.Interfaces;
using Tour_packages.Models;

namespace Tour_packages.Services
{
    public class PackageRepo : IRepo<int, Package>
    {
        private readonly TourPackageContext _context;
        private readonly ILogger<Package> _logger;

        public PackageRepo(TourPackageContext context, ILogger<Package> logger)
        {
            _context = context;
            _logger = logger;
        }
        public async Task<Package?> Add(Package item)
        {
            try
            {
                _context.Packages.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Package?> Delete(int key)
        {
            try
            {
                var pack = await Get(key);
                if (pack != null)
                {
                    _context.Packages.Remove(pack);
                    await _context.SaveChangesAsync();
                    return pack;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Package?> Get(int key)
        {
            try
            {
                var pack = await _context.Packages.FirstOrDefaultAsync(i => i.PackageId == key);
                return pack;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<Package>?> GetAll()
        {
            try
            {
                var pack = await _context.Packages.ToListAsync();
                if (pack.Count > 0)
                    return pack;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Package?> Update(Package item)
        {
            try
            {
                var existingPackage = await _context.Packages.FindAsync(item.PackageId);
                if (existingPackage != null)
                {
                    existingPackage.TravelAgencyName = item.TravelAgencyName;
                    existingPackage.PackageName = item.PackageName;
                    existingPackage.Description = item.Description;
                    existingPackage.Rate = item.Rate;
                    existingPackage.Destination = item.Destination;
                    existingPackage.DeparturePoint = item.DeparturePoint;
                    existingPackage.ArrivalPoint = item.ArrivalPoint;
                    existingPackage.AvailablityCount = item.AvailablityCount;
                    existingPackage.TotalDays = item.TotalDays;
                    existingPackage.Transportation = item.Transportation;


                    await _context.SaveChangesAsync();

                    return existingPackage;
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
