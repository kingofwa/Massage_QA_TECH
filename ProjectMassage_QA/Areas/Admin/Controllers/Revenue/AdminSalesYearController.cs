using ProjectMassage_QA.Areas.Admin.Models.FW;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProjectMassage_QA.Areas.Admin.Controllers.Revenue
{
    public class AdminSalesYearController : Controller
    {
        //
        // GET: /Admin/AdminQuarterlyRevenue/
        Data_MassageEntities1 db = new Data_MassageEntities1();
        public ActionResult Index()
        {
            var list_sales_Year = db.DOANH_THU_NAM().ToList();
            ViewData["list_sales_Year"] = list_sales_Year;

            var list_oder_sales_year = db.tblOrders.ToList();
            list_oder_sales_year = list_oder_sales_year.ToList();
            ViewData["list_oder_sales_year"] = list_oder_sales_year;

            return View();
        }
        public ActionResult Detailed_revenue_by_month(int Id)
        {
            var list_sales_Year = db.DOANH_THU_NAM().ToList();
            ViewData["list_sales_Year"] = list_sales_Year;

            var list_oder_sales_year = db.tblOrders.ToList();
            list_oder_sales_year = list_oder_sales_year.Where(x => x.DayNew.GetValueOrDefault().Month == Id).ToList();
            ViewData["list_oder_sales_year"] = list_oder_sales_year;

            return View();
        }
	}
}