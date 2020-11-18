using ProjectMassage_QA.Areas.Admin.Models.FW;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProjectMassage_QA.Areas.Admin.Controllers.setting
{
    public class AdminNotificationController : BaseController
    {
        //
        // GET: /Admin/AdminNotification/
        Data_MassageEntities1 db = new Data_MassageEntities1();
        public ActionResult Notification()
        {
            var list = db.tblNotifications.ToList();
            ViewData["list_Notifications"] = list;
            return View();
        }
        public JsonResult Save_Notification(tblNotification[] arr)
        {
            var value = false;
              var Id = 0;
            try
            {
              
                if (arr[0].Id > 0)
                {
                    Id = arr[0].Id;
                    var update = db.tblNotifications.Find(arr[0].Id);
                    update.N_Content = arr[0].N_Content;
                    db.SaveChanges();
                    value = true;
                }
                else
                {
                    var notificationnew = new tblNotification();
                    var layid = (from SLi in db.tblNotifications
                                 where SLi.Id > 0
                                 orderby SLi.Id descending
                                 select new
                                 {
                                     Id = SLi.Id
                                 }).Take(1).ToArray();

                    if (layid.Any())
                    {
                        notificationnew.Id = layid[0].Id + 1;
                    }
                    else
                    {
                        notificationnew.Id = 1;
                    }
                    Id = notificationnew.Id;
                    notificationnew.N_Content = arr[0].N_Content;
                    notificationnew.N_Show = 1;
                    db.tblNotifications.Add(notificationnew);
                    db.SaveChanges();
                    value = true;
                }
            }
            catch (Exception)
            {
                value = false;
            }
            var data = new { sussecc = value, Id = Id };

            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Save_Status(int Id)
        {
            var update = db.tblNotifications.Find(Id);
            if (update.N_Show == 1)
            {
                update.N_Show = 0;
            }
            else
            {
                update.N_Show = 1;
            }
            db.SaveChanges();
            return Json(update.N_Show, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_Noti(int Id)
        {
            var value = false;
            try
            {
                db.tblNotifications.Remove(db.tblNotifications.Find(Id));
                db.SaveChanges();
                value = true;
            }
            catch (Exception)
            {
                value = false;
            }
            return Json(value, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Edit_Noti(int Id)
        {
            var list_noti = db.tblNotifications.Find(Id);
            return Json(list_noti, JsonRequestBehavior.AllowGet);
        }




	}
}