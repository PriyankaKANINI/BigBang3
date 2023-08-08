using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tour_packages.Interfaces;
using Tour_packages.Models;

namespace Tour_packages.Services
{
    public class PackageService : IPackageService
    {
        private readonly IRepo<int, Package> _packageRepo;

        public PackageService(IRepo<int, Package> packageRepo)
        {
            _packageRepo = packageRepo;
        }

        public async Task<Package?> AddPackage(Package package)
        {
            try
            {
                // Add your business logic here, if needed, before adding to the repository.
                return await _packageRepo.Add(package);
            }
            catch (Exception ex)
            {
                // Handle any exceptions here if needed.
                Console.WriteLine("Error adding package: " + ex.Message);
                return null;
            }
        }

        public async Task<Package?> DeletePackage(int id)
        {
            try
            {
                var package = await _packageRepo.Get(id);
                if (package != null)
                {
                    return await _packageRepo.Delete(id);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error deleting package: " + ex.Message);
            }
            return null;
        }

        public async Task<Package?> UpdatePackage(Package package)
        {
            try
            {
                // Add your business logic here, if needed, before updating in the repository.
                return await _packageRepo.Update(package);
            }
            catch (Exception ex)
            {
                // Handle any exceptions here if needed.
                Console.WriteLine("Error updating package: " + ex.Message);
                return null;
            }
        }

        public async Task<Package?> GetPackageById(int id)
        {
            try
            {
                return await _packageRepo.Get(id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error getting package: " + ex.Message);
                return null;
            }
        }

        public async Task<ICollection<Package>?> GetAllPackages()
        {
            try
            {
                var packages = await _packageRepo.GetAll();
                return packages;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error getting all packages: " + ex.Message);
                return null;
            }
        }
    }
}
