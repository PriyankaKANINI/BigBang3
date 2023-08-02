﻿//using Tour_packages.Interfaces;
//using Tour_packages.Models;

//namespace Tour_packages.Services
//{
//    public class PackageRepo : IRepo<int, Package>
//    {
//        private readonly TourPackageContext _context;
//        private readonly ILogger<Package> _logger;

//        public PackageRepo(TourPackageContext context, ILogger<Package> logger)
//        {
//            _context = context;
//            _logger = logger;
//        }
//        public async Task<Package?> Add(Package item)
//        {
//            try
//            {
//                _context.Packages.Add(item);
//                await _context.SaveChangesAsync();
//                return item;
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex.Message);
//            }
//            return null;
//        }

//        public async Task<Package?> Delete(int key)
//        {
//            try
//            {
//                var doc = await Get(key);
//                if (doc != null)
//                {
//                    _context.Packages.Remove(doc);
//                    await _context.SaveChangesAsync();
//                    return doc;
//                }
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex.Message);
//            }
//            return null;
//        }

//        public async Task<Package?> Get(int key)
//        {
//            try
//            {
//                var doc = await _context.Packages.FirstOrDefaultAsync(i => i.PackageId == key);
//                return doc;
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex.Message);
//            }
//            return null;
//        }

//        public async Task<ICollection<Package>?> GetAll()
//        {
//            try
//            {
//                var doc = await _context.Packages.ToListAsync();
//                if (doc.Count > 0)
//                    return doc;
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex.Message);
//            }
//            return null;
//        }

//        public async Task<Package?> Update(Package item)
//        {
//            try
//            {
//                var existingDoctor = await _context.Packages.FindAsync(item.PackageId);
//                if (existingDoctor != null)
//                {
//                    existingDoctor.TravelAgencyName = item.TravelAgencyName;
//                    existingDoctor.PackageName = item.PackageName;
//                    existingDoctor.Description = item.Description;
//                    existingDoctor.Rate = item.Rate;
//                    existingDoctor.DeparturePoint = item.DeparturePoint;
//                    existingDoctor.ArrivalPoint = item.ArrivalPoint;
//                    existingDoctor.Images = item.Images;
//                    existingDoctor.AvailablityCount = item.AvailablityCount;
//                    existingDoctor.TotalDays = item.TotalDays;
//                    existingDoctor.Transportation = item.Transportation;


//                    await _context.SaveChangesAsync(); 

//                    return existingDoctor;
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
