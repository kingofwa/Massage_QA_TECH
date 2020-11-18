using ProjectMassage_QA.Areas.Admin.Code;
using ProjectMassage_QA.Areas.Admin.Models;
using ProjectMassage_QA.Areas.Admin.Models.FW;
using ProjectMassage_QA.Common;
using ProjectMassage_QA.DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProjectMassage_QA.Areas.Admin.Controllers
{
    public class LoginController : Controller
    {
        // GET: /Admin/Login/
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index(Loginmodel model)
        {
            using (var db = new Data_MassageEntities1())
            {
                var dao = new UserDao();
                //var result = new AccountModel().Login(model.UserName, model.Password);new EmployeeDAO().MD5Hash(model.Password)
                var result = dao.login(model.UserName, model.Password);
                switch (result)
                {
                    case 1:
                        var user = dao.GetById(model.UserName);
                        var userSesstion = new UserLogin();
                        Session["userName"] = model.UserName;

                        Session["userId"] = user.Id_User;
                        Session["status_color"] = user.Dark_Light_theme;
                        var mau = "";
                        var list_color = db.SettingAdmins.Where(x => x.ID_User == user.Id_User).ToArray();
                        var dangky = db.BDang_Ky.Where(x => x.ID_dang_Ky == 1).ToArray();
                        var yt = 0;
                        if (dangky[0].Thoi_Gian_Check_Int > 0)
                        {
                            yt = (int)dangky[0].Thoi_Gian_Check_Int;
                        }
                        if (list_color.Any())
                        {
                            mau = list_color[0].colorbar + "|" + list_color[0].cochu + "|" +
                                list_color[0].fontchu + "|" + list_color[0].mauchu + "|" +
                                list_color[0].maucokhach + "|" + list_color[0].mauonline + "|" +
                                list_color[0].maucho + "|" + yt + "|" +
                                list_color[0].heightContent + "|" + list_color[0].heightRight + "|" +
                                list_color[0].widthContent + "|" + list_color[0].widthRight + "|" +
                                list_color[0].thongbao + "|" + list_color[0].chuy + "|" +
                                list_color[0].maunhanvienonline + "|" + list_color[0].maunhanviencokhach;
                        }
                        Session["chang_color"] = mau;

                        if (db.tbl_CaLamViec.Any())
                        {
                            var moca = db.tbl_CaLamViec.Where(x => x.Status == 1).ToArray();
                            if (moca.Any())
                            {
                                moca = db.tbl_CaLamViec.Where(x => x.Status == 1 && x.Id_nhan == user.Id_User).ToArray();
                                if (moca.Any())
                                {
                                    Session["status_KA"] = 1;
                                    Session["Id_giao_KA"] = moca[0].Id;
                                }
                                else
                                {
                                    Session["status_KA"] = 3;
                                    Session["Id_giao_KA"] = -1;
                                }
                            }
                            else
                            {
                                var moca1 = db.tbl_CaLamViec.OrderByDescending(x => x.Id).Take(1).ToList();
                                moca1 = moca1.Where(x => x.Id_nhan == user.Id_User).ToList();
                                if (moca1.Any())
                                {
                                    Session["status_KA"] = 2;
                                    Session["Id_giao_KA"] = 0;
                                }
                                else
                                {
                                    Session["status_KA"] = 3;
                                    Session["Id_giao_KA"] = -1;
                                }
                            }
                        }
                        else
                        {
                            Session["status_KA"] = 2;
                            Session["Id_giao_KA"] = 0;
                        }
                        Session["setting"] = 0;
                        userSesstion.UserName = user.Name_User;
                        userSesstion.UserID = user.Id_User;
                        Session.Add(CommonConstants.USER_SESSTION, userSesstion);
                        var id_dangnhap = userSesstion.UserID;
                        var id_setting = db.SettingAdmins.Where(x => x.ID_User == id_dangnhap).ToArray();
                        if (id_setting.Any())//Any khong hoat hoat dong khi .Tolist();
                        {
                            var set = id_setting[0].ID_User;
                            if (id_dangnhap == set)
                            {
                                return RedirectToAction("Home", "AdminHome");
                            }
                            else
                            {
                                return RedirectToAction("Setting", "AdminSettingAdmin");
                            }
                        }
                        else
                        {
                            Session["setting"] = 1;
                            return RedirectToAction("Setting", "AdminSettingAdmin");
                        }
                    case 0:
                        ModelState.AddModelError("", "Tai khoan khong ton tai !");
                        break;
                    case -1:
                        ModelState.AddModelError("", "Tai khoan dang bi khoa !");
                        break;
                    case -2:
                        ModelState.AddModelError("", "Mat khau sai !");
                        break;
                    default:
                        ModelState.AddModelError("", "Tên đăng nhập or mật khẩu không đúng !");
                        break;
                }
                return View(model);
            }
        }
        public ActionResult LogOut()
        {
            Session["status_KA"] = 0;
            Session["Id_giao_KA"] = 0;

            Session.Abandon();
            return RedirectToAction("index", "Login");
        }
    }
}