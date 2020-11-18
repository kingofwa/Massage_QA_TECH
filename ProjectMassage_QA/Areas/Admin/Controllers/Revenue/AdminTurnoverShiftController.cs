using ProjectMassage_QA.Areas.Admin.Models.FW;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProjectMassage_QA.Areas.Admin.Controllers.Revenue
{
    public class AdminTurnoverShiftController : Controller
    {
        //
        // GET: /Admin/AdminTurnoverShift/
        Data_MassageEntities1 db = new Data_MassageEntities1();
        public ActionResult Index()
        {
           var details_TurnoverShift = db.DOANH_THU_CA().Take(400).ToList();
            ViewData["details_TurnoverShift"] = details_TurnoverShift;
            return View();
        }
	}
}