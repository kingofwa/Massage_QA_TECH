using Newtonsoft.Json;
using ProjectMassage_QA.Areas.Admin.Models.FW;
using ProjectMassage_QA.Areas.Admin.Models.ViewModel;
using ProjectMassage_QA.DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProjectMassage_QA.Controllers
{
    public class HomeController : Controller
    {
        Data_MassageEntities1 db = new Data_MassageEntities1();
        public ActionResult Index()
        {

            var listcategoryStaff = db.tblCategories.Where(x => x.C_Active == true).ToList();
            var listserviceStaff = db.tblServices.Where(x => x.S_Active == true).ToList();
            var list_slides = db.tblSliders.Where(x=>x.SLi_Active == false).ToList();
            var thong_bao = db.tblNotifications.Where(x => x.N_Show == 1).Take(1).ToList();
            ViewData["list_slides"] = list_slides;
            ViewData["list_category_Staff"] = listcategoryStaff;
            ViewData["list_service_Staff"] = listserviceStaff;
            ViewData["thong_bao"] = thong_bao;

          var time_open_close = db.BDang_Ky.Select(x => new time_open_close() { close_door = x.DK_Close, open_door = x.DK_Open }).ToList();
          ViewData["time_open_close"] = time_open_close;
          var thongbao = db.BDang_Ky.Select(x => new thongbao() { thongbao_khach = x.xacnhan }).ToList();
          ViewData["thongbao"] = thongbao;
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public PartialViewResult Employee_Staff()
        {
            var model = new EmployeeDAO().ListAll();
            return PartialView(model);
        }

        public JsonResult GetData_EmployeeStaff(string ODERNUMBER)
        {
            var code = db.RantingStarEmployee().Where(x => x.O_number == ODERNUMBER).ToList();
            string value = string.Empty;
            value = JsonConvert.SerializeObject(code, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return Json(value, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_Data_Details(int Id)
        {
            var list_img_details = db.tblStaffInEmployees.Find(Id);
            string value = string.Empty;
            value = JsonConvert.SerializeObject(list_img_details, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return Json(value, JsonRequestBehavior.AllowGet);
        }

    }
}