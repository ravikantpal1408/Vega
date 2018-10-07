using Microsoft.AspNetCore.Mvc;
using vega.Controllers.Resources;

namespace vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehicleController : Controller
    {
        public IActionResult CreateVehicle([FromBody] VehicleResource vehicleResource)
        {


        }

    }
}