using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Core;
using vega.Core.Models;
using vega.Models;

namespace vega.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly VegaDbContext context;

        public PhotosController(

        VegaDbContext context,

        IHostingEnvironment host,

        IVehicleRepository repository,

        IUnitOfWork unitOfWork,

        IMapper mapper

         )
        {
            this.host = host;

            this.repository = repository;

            this.unitOfWork = unitOfWork;

            this.mapper = mapper;

            this.context = context;
        }

        public async Task<IEnumerable<PhotoResource>> getPhotos(int vehicleId)
        {
            var photos = await context.Photos.Where(x => x.VehicleId == vehicleId).ToListAsync();
            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);

        }


        // /api/vehicles/1/Photos
        [HttpPost]
        public async Task<IActionResult> UploadAsync(int vehicleId, IFormFile file)
        {
            var vehicle = await repository.GetVehicle(vehicleId, includeRelated: false);
            if (vehicle == null)
            {
                // Checking if Vehicle Id Exists 
                return NotFound();
            }
            // Getting Folder Path wwwRoot - this is public directory
            var uploadFolderPath = Path.Combine(host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadFolderPath))
            {
                // If Folder path is not defined then Create a Directory 
                Directory.CreateDirectory(uploadFolderPath);
            }
            // generating file name 
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            // saving file to folder path 
            var filePath = Path.Combine(uploadFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            var photo = new Photo
            {
                FileName = fileName
            };

            vehicle.Photos.Add(photo);

            await unitOfWork.CompleteAsync();

            return Ok(mapper.Map<Photo, PhotoResource>(photo));

        }

    }
}