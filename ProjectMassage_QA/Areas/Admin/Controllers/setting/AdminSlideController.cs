using ProjectMassage_QA.Areas.Admin.Models.FW;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProjectMassage_QA.Areas.Admin.Controllers.setting
{
    public class AdminSlideController : BaseController
    {
        //
        // GET: /Admin/AdminSlide/
        Data_MassageEntities1 db = new Data_MassageEntities1();
        public ActionResult Slide()
        {
            var list = db.tblSliders.ToList();
            ViewData["list_slide"] = list;

           
            return View();
        }
        public JsonResult Save_Slide(tblSlider[] slide)
        {
            var value = 0;
            try
            {
                if (slide[0].Id > 0)
                {
                    var update = db.tblSliders.Find(slide[0].Id);
                    update.SLi_Name = slide[0].SLi_Name;
                    update.SLi_Content = slide[0].SLi_Content;
                    update.SLi_Image = slide[0].SLi_Image;
                    db.SaveChanges();
                    value = slide[0].Id;
                }
                else
                {
                    var slidenew = new tblSlider();
                    var layid = (from SLi in db.tblSliders
                                 where SLi.Id > 0
                                 orderby SLi.Id descending
                                 select new
                                 {
                                     Id_slide = SLi.Id
                                 }).Take(1).ToArray();

                    if (layid.Any())
                    {
                        slidenew.Id = layid[0].Id_slide + 1;
                    }
                    else
                    {
                        slidenew.Id = 1;
                    }
                    slidenew.SLi_Name = slide[0].SLi_Name;
                    slidenew.SLi_Content = slide[0].SLi_Content;
                    slidenew.SLi_Image = slide[0].SLi_Image;
                    slidenew.SLi_Active = true;
                    db.tblSliders.Add(slidenew);
                    db.SaveChanges();
                    value = slidenew.Id;
                }
            }
            catch (Exception)
            {
                value = 0;
            }
            return Json(value, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Save_Status(int Id)
        {
            var value = false;
            try
            {
                var update = db.tblSliders.Find(Id);
                update.SLi_Active = !update.SLi_Active;
                db.SaveChanges();
                value = (Boolean)update.SLi_Active;
            }
            catch
            {
                value = false;
            }
            return Json(value, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteSlide(int Id)
        {
            var value = false;
            try
            {
                var layid = db.tblSliders.Find(Id);
                db.tblSliders.Remove(layid);
                db.SaveChanges();
                value = true;
            }
            catch (Exception)
            {
                value = false;
            }
            return Json(value, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Edit_Slide(int Id)
        {
            return Json(db.tblSliders.Find(Id), JsonRequestBehavior.AllowGet);

        }
	}
}