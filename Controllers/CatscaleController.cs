using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Cors;
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
    [EnableCors("MyCorsPolicy")]

    [Route("/api/CatScale/contact")]
    public class CatscaleController : Controller
    {
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly VegaDbContext context;
        public CatscaleController(

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

        [HttpGet]
        [Route("/api/CatScale/contact/SubmitContactUs")]
        public IActionResult SubmitContactUs() =>
            // var returnData = await V;
            Ok("Hello");


    }
}