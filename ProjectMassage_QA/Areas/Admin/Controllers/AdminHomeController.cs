using ProjectMassage_QA.Areas.Admin.Models.FW;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProjectMassage_QA.DAO;
using Newtonsoft.Json;
using ProjectMassage_QA.Models.View_model;
using ProjectMassage_QA.Areas.Admin.Models.ViewModel;

namespace ProjectMassage_QA.Areas.Admin.Controllers
{
    public class AdminHomeController : BaseController
    {
        //
        // GET: /Admin/AdminHome/
        Data_MassageEntities1 db = new Data_MassageEntities1();
        public ActionResult Home(string Id)
        {
            var list = db.tblRooms.Where(x => x.R_Active == true).ToList();
            ViewData["list_room"] = list;
            var list_acount = db.tbl_User.Where(x => x.U_Status == true).ToList();
            ViewData["list_acount"] = list_acount;
            var list_shift = db.tbl_Loai_Ca_Lam_Viec.ToList();
            ViewData["list_work_shift"] = list_shift;
            var list_categoryhome = db.tblCategories.Where(x => x.C_Active == true).ToList();
            ViewData["list_cate"] = list_categoryhome;
            ViewData["list_service"] = db.tblServices.Where(x => x.S_Active == true).ToList();
            var list_employee = db.map_employee().Where(x => x.E_Active == 0).ToList();
            ViewData["list_employee"] = list_employee;
            var list_category_oder = db.LEPVC().ToList();
            ViewData["list_category_oder"] = list_category_oder;
            var list_service_oder = db.Order_Admin_Service_0().ToList();
            ViewData["list_service_oder"] = list_service_oder;
            var list_employeestaff_oder = db.Order_Admin_Employee_0().ToList();
            ViewData["list_employeestaff_oder"] = list_employeestaff_oder;
            var list_magiam = db.tblOrders.ToList();
            ViewData["list_employeestaff_oder"] = list_employeestaff_oder;

            List<chart_staff_employee> list_chart = new List<chart_staff_employee> { };
            var staff = db.tblEmployees.Where(x => x.E_Active == 0 && x.TypeEmployeeId == 2).Take(6).ToArray();//Thuộc bộ phận ID = 2
            foreach (var item_e in staff)
            {
                var chart_staff = new chart_staff_employee();
                chart_staff.name = item_e.E_Name;
                chart_staff.href = item_e.E_Image;
                foreach (var item_e2 in db.NumberOfServings().Where(x => x.E_Name == item_e.E_Name).ToList())
                {
                    chart_staff.steps = (double)item_e2.totalmoney;
                }
                list_chart.Add(chart_staff);
            }
            ViewBag.chart = list_chart;//view json endcode list_chart
            //doanh thu thang
            List<chart_year> list_chart_year_mouth = new List<chart_year> { };
            var thang = DateTime.Now.Month + 1;
            for (var i = 1; i < thang; i++)
            {
                double dichvu = 0;
                double dichvukhac = 0;
                double phucvu = 0;
                double phong = 0;
                var chart_mouth = new chart_year();
                foreach (var item3 in db.DOANH_THU_NAM().Where(x => x.DayNew.GetValueOrDefault().Month == i && x.TypeOder == "service").ToArray())
                {
                    dichvu += (double)item3.Money;
                }
                foreach (var item3 in db.DOANH_THU_NAM().Where(x => x.DayNew.GetValueOrDefault().Month == i && x.TypeOder == "categori").ToArray())
                {
                    dichvukhac += (double)item3.Money;
                }
                foreach (var item3 in db.DOANH_THU_NAM().Where(x => x.DayNew.GetValueOrDefault().Month == i && x.TypeOder == "Employee").ToArray())
                {
                    phucvu += (double)item3.Money;
                }
                foreach (var item3 in db.DOANH_THU_NAM().Where(x => x.DayNew.GetValueOrDefault().Month == i && x.TypeOder == "Room").ToArray())
                {
                    phong += (double)item3.Money;
                }
                double Tong = 0;
                Tong = dichvu + dichvukhac + phucvu + phong;

                chart_mouth.country ="Tháng"  + i.ToString();
                chart_mouth.visits = Tong;

                list_chart_year_mouth.Add(chart_mouth);
            }
            ViewBag.chartt = list_chart_year_mouth;

            var list_oder = db.Bill().ToList();
            List<Rom_bill_view> list_roomm = new List<Rom_bill_view> { };
            foreach (var item in list_oder)
            {
                if (list_roomm == null)
                {
                    var item1 = new Rom_bill_view();
                    var list1 = new List<Rom_bill_view>();
                    item1.E_Name = item.E_Name;
                    item1.FirtDayCheckin = item.FirtDayCheckin;
                    item1.FirtHourCheckin = item.FirtHourCheckin;
                    item1.Id = item.Id;
                    item1.LastDayCheckin = item.LastDayCheckin;
                    item1.LastHourCheckin = item.LastHourCheckin;
                    item1.NhanVienID = item.NhanVienID;
                    item1.Note = item.Note;
                    item1.O_number = item.O_number;
                    item1.Total = item.Total;
                    item1.Room = "";
                    if (item.phantramgiam > 0)
                    {
                        item1.Total = item1.Total - item.phantramgiam * item1.Total / 100;
                    }
                    foreach (var item2 in db.tblOrderDetails.Where(x => x.OrderId == item.Id && x.TypeOder == "Room").ToList())
                    {
                        var room = db.tblRooms.Find(item2.EmployeeId);
                        if (item1.Room == "")
                        {
                            item1.Room = room.R_Name;
                        }
                        else
                        {
                            item1.Room = item1.Room + "," + room.R_Name;
                        }
                    }
                    list1.Add(item1);
                }
                else
                {
                    var item1 = new Rom_bill_view();
                    var list1 = (List<Rom_bill_view>)list_roomm;
                    item1.E_Name = item.E_Name;
                    item1.FirtDayCheckin = item.FirtDayCheckin;
                    item1.FirtHourCheckin = item.FirtHourCheckin;
                    item1.Id = item.Id;
                    item1.LastDayCheckin = item.LastDayCheckin;
                    item1.LastHourCheckin = item.LastHourCheckin;
                    item1.NhanVienID = item.NhanVienID;
                    item1.Note = item.Note;
                    item1.O_number = item.O_number;
                    item1.Total = item.Total;
                    if (item.phantramgiam > 0)
                    {
                        item1.Total = item1.Total - item.phantramgiam * item1.Total / 100;
                    }

                    item1.Room = "";
                    foreach (var item2 in db.tblOrderDetails.Where(x => x.OrderId == item.Id && x.TypeOder == "Room").ToList())
                    {
                        var room = db.tblRooms.Find(item2.EmployeeId);
                        if (item1.Room == "")
                        {
                            item1.Room = room.R_Name;
                        }
                        else
                        {
                            item1.Room = item1.Room + "," + room.R_Name;
                        }
                    }
                    list1.Add(item1);
                }

            }
            ViewData["list_roomm"] = list_roomm;

            DateTime tungay, denngay;
            if (Id == null)
            {
                denngay = DateTime.Now;
                tungay = denngay.AddDays(-30);
            }
            else
            {
                var ma = Id.Split('|');
                denngay = Convert.ToDateTime(ma[1]);
                tungay = Convert.ToDateTime(ma[0]);
            }
            ViewData["list_oder"] = tungay.ToString("yyyy-MM-dd") + "|" + denngay.ToString("yyyy-MM-dd");
            //tungay = tungay.AddDays(-1);
            //denngay = denngay.AddDays(1);
            var list_history_oder = db.tblOrders.ToList().Where(x => x.DayNew >= tungay && x.DayNew <= denngay).ToList();
            ViewData["list_history_oder"] = list_history_oder;
            return View();
        }

        public JsonResult History_Oder_Home(string Id)
        {
            DateTime tungay, denngay;
            if (Id == null)
            {
                denngay = DateTime.Now;
                tungay = denngay.AddDays(-30);
            }
            else
            {
                var ma = Id.Split('|');
                denngay = Convert.ToDateTime(ma[1]);
                tungay = Convert.ToDateTime(ma[0]);
            }
            ViewData["list_oder"] = tungay.ToString("yyyy-MM-dd") + "|" + denngay.ToString("yyyy-MM-dd");
            var list_history_oder = db.tblOrders.Where(x => x.DayNew >= tungay && x.DayNew <= denngay).ToList();
            string value = string.Empty;
            value = JsonConvert.SerializeObject(list_history_oder, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return Json(value, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Checkin(tblCheckin[] Checkin)
        {
            var value = false;
            try
            {
                var id = Session["userId"];
                var checkinnew = new tblCheckin();
                var layid = (from CI in db.tblCheckins
                             where CI.Id > 0
                             orderby CI.Id descending
                             select new
                             {
                                 Id = CI.Id
                             }).Take(1).ToArray();

                if (layid.Any())
                {
                    checkinnew.Id = layid[0].Id + 1;
                }
                else
                {
                    checkinnew.Id = 1;
                }
                checkinnew.FirtDayCheckin = Checkin[0].FirtDayCheckin;
                checkinnew.FirtHourCheckin = DateTime.Now.ToString();
                checkinnew.LastDayCheckin = Checkin[0].LastDayCheckin;
                checkinnew.LastHourCheckin = DateTime.Now.ToString();
                checkinnew.NoteCheckin = Checkin[0].NoteCheckin;
                checkinnew.ServiceCheckin = Checkin[0].ServiceCheckin;
                checkinnew.CategoryCheckin = Checkin[0].CategoryCheckin;
                checkinnew.EmployeeStaffCheckin = Checkin[0].EmployeeStaffCheckin;
                checkinnew.ID_RoomCheckin = Checkin[0].ID_RoomCheckin;
                db.tblCheckins.Add(checkinnew);
                var array_status = Checkin[0].ID_RoomCheckin.Split('|');
                List<tblRoom> TongHopRoom = new List<tblRoom> { };
                for (var i = 0; i < array_status.Length; i++)
                {
                    var room = db.tblRooms.Find(Convert.ToInt32(array_status[i]));
                    if (room != null)
                    {
                        room.R_Status = 1;
                        TongHopRoom.Add(room);
                    }

                }

                var array_status_employee = Checkin[0].EmployeeStaffCheckin.Split('|');
                List<tblStaffInEmployee> TongHopEmployee = new List<tblStaffInEmployee> { };
                for (var i = 0; i < array_status_employee.Length; i++)
                {
                    var employee = db.tblStaffInEmployees.Find(Convert.ToInt32(array_status_employee[i]));
                    if (employee != null)
                    {
                        employee.E_Status = 1;
                        TongHopEmployee.Add(employee);
                    }
                }
                db.SaveChanges();
                value = true;
            }
            catch (Exception)
            {
                value = false;
            }
            var data = new { success = value, message = "Your request has been successfully added,." };
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Save_Admin_Order_And_Detail(tblOrder[] oder, tblOrderDetail[] oderdetail, string Room)
        {
            var value = true;
            try
            {
                var id_tang = 1;
                var oderid = oder[0].Id;
                var de = db.tblOrderDetails.Where(x => x.OrderId == oderid).OrderByDescending(x => x.Id_tang).Take(1).ToArray();
                if (de.Any())
                {
                    id_tang = de[0].Id_tang + 1;

                }
                List<tblOrderDetail> tonghop = new List<tblOrderDetail>();
                List<tblStaffInEmployee> TongHopEmployee = new List<tblStaffInEmployee> { };
                var Oder = db.tblOrders.Find(oder[0].Id);
                Oder.LastDayCheckin = oder[0].LastDayCheckin;
                Oder.LastHourCheckin = oder[0].LastHourCheckin;
                Oder.FirtDayCheckin = oder[0].FirtDayCheckin;
                Oder.FirtHourCheckin = oder[0].FirtHourCheckin;
                Oder.Chay = 1;
                Oder.NhanVienID = Convert.ToInt32(Session["userid"]);
                foreach (var item in oderdetail)
                {
                    var detail = db.tblOrderDetails.Find(oder[0].Id, item.Id_tang);
                    if (detail == null)
                    {

                        var tail = new tblOrderDetail();
                        tail.Id_tang = id_tang;
                        tail.EmployeeId = item.EmployeeId;
                        tail.TypeOder = item.TypeOder;
                        tail.OrderId = oder[0].Id;
                        tail.Money = item.Money;
                        db.tblOrderDetails.Add(tail);
                        id_tang++;
                        if (item.TypeOder == "Employee")
                        {
                            var employee = db.tblStaffInEmployees.Find(Convert.ToInt32(item.EmployeeId));
                            if (employee != null)
                            {
                                employee.E_Status = 1;
                                TongHopEmployee.Add(employee);
                            }
                        }

                    }
                    else
                    {
                        if (item.TypeOder == "Employee")
                        {
                            var employee = db.tblStaffInEmployees.Find(Convert.ToInt32(item.EmployeeId));
                            if (employee != null)
                            {
                                employee.E_Status = 1;
                                TongHopEmployee.Add(employee);
                            }
                        }
                        detail.EmployeeId = item.EmployeeId;
                        detail.TypeOder = item.TypeOder;
                        tonghop.Add(detail);
                    }
                }
                List<tblRoom> TongHopRoom = new List<tblRoom> { };
                var array_status = Room.Split('|');
                for (var i = 0; i < array_status.Length; i++)
                {
                    var room = db.tblRooms.Find(Convert.ToInt32(array_status[i]));
                    if (room != null)
                    {
                        var tail = new tblOrderDetail();
                        tail.Id_tang = id_tang;
                        tail.EmployeeId = Convert.ToInt32(array_status[i]);
                        tail.TypeOder = "Room";
                        tail.Money = 0;
                        tail.OrderId = oder[0].Id;
                        db.tblOrderDetails.Add(tail);
                        room.R_Status = 1;
                        TongHopRoom.Add(room);
                        id_tang++;

                    }

                }
                var Id_oder_employee = db.tblOrderDetails.Where(x => x.OrderId == oderid && x.TypeOder == "Employee").ToList();
                if (Id_oder_employee.Any())
                {
                    foreach (var item2 in Id_oder_employee)
                    {
                        var update_status_id_employee = db.tblStaffInEmployees.Find(item2.EmployeeId);
                        update_status_id_employee.E_Status = 2;
                    }
                }
                db.SaveChanges();
            }
            catch (Exception)
            {
                value = false;
            }
            var data = new { success = value, message = "Your request has been successfully added,." };
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete_Oder(int Id)
        {
            var value = false;
            try
            {

                var del_oder = db.tblOrders.Find(Id);
                var del_oderdetail = db.tblOrderDetails.Where(x => x.OrderId == Id).ToList();
                var del_star = db.tblStarOrders.Where(x => x.OrderId == Id).ToList();
                if (del_star.Any())
                {
                    db.tblStarOrders.RemoveRange(del_star);
                }
                db.tblOrders.Remove(del_oder);
                db.tblOrderDetails.RemoveRange(del_oderdetail);
                db.SaveChanges();
                value = true;
            }
            catch (Exception)
            {
                value = false;
            }
            return Json(value, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Change_Passwords(int id, string IdChange_pass)//, string newPass, string confirmPass
        {
            var value = false;
            var pass = new EmployeeDAO().MD5Hash(IdChange_pass);
            try
            {
                var trave = db.tbl_User.Where(x => x.Id_User == id && x.Pass_User == pass).ToList();
                if (trave.Count > 0)
                {
                    value = true;
                }
            }
            catch (Exception)
            {
                value = false;
            }
            return Json(value, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update_Pass(int id, string passss)
        {
            var value = false;
            try
            {
                var update = db.tbl_User.Find(id);
                update.Pass_User = new EmployeeDAO().MD5Hash(passss);
                db.SaveChanges();
                value = true;
            }
            catch (Exception)
            {
                value = false;
            }
            return Json(value, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetData_Bill(int Id)
        {
            var data = db.Bill_Chiitet();
            var listdata = data.Where(x => x.Id == Id).ToArray();
            List<ViewOder> bien = new List<ViewOder> { };

            foreach (var item in listdata)
            {
                if (bien == null)
                {
                    var item1 = new ViewOder();
                    var list = new List<ViewOder>();
                    item1.moneyy = (decimal)item.Money;

                    if (item.TypeOder == "service")
                    {
                        foreach (var iten in db.tblServices.Where(x => x.Id == item.EmployeeId).ToList())
                        {
                            item1.content = iten.S_Name;
                        }
                    }
                    else if (item.TypeOder == "categori")
                    {
                        foreach (var iten in db.tblCategories.Where(x => x.Id == item.EmployeeId).ToList())
                        {
                            item1.content = iten.C_Name;
                        }
                    }
                    else if (item.TypeOder == "Employee")
                    {
                        foreach (var iten in db.tblEmployees.Where(x => x.Id == item.EmployeeId).ToList())
                        {
                            item1.content = iten.E_Name;
                        }
                    }
                    bien.Add(item1);
                    // Session[""] = list;
                }
                else
                {
                    var item1 = new ViewOder();
                    var list = (List<ViewOder>)bien;
                    if (item.Money > 0)
                    {
                        item1.moneyy = (decimal)item.Money;
                    }
                    else
                    {
                        item1.moneyy = 0;
                    }

                    if (item.TypeOder == "service")
                    {
                        foreach (var iten in db.tblServices.Where(x => x.Id == item.EmployeeId).ToList())
                        {
                            item1.content = iten.S_Name;
                        }
                    }
                    else if (item.TypeOder == "categori")
                    {
                        foreach (var iten in db.tblCategories.Where(x => x.Id == item.EmployeeId).ToList())
                        {
                            item1.content = iten.C_Name;
                        }
                    }
                    else if (item.TypeOder == "Employee")
                    {
                        foreach (var iten in db.tblEmployees.Where(x => x.Id == item.EmployeeId).ToList())
                        {
                            item1.content = iten.E_Name;
                        }
                    }
                    else if (item.TypeOder == "Room")
                    {
                        foreach (var iten in db.tblRooms.Where(x => x.Id == item.EmployeeId).ToList())
                        {
                            item1.content = iten.R_Name;
                        }
                    }
                    bien.Add(item1);
                }
            }

            var oder = db.Bill().Where(x => x.Id == Id).ToArray();
            var thuevaphuphi = db.BDang_Ky.ToArray();
            var Data = new
            {
                Id = oder[0].Id,
                order = oder[0].O_number,
                inputdate = oder[0].FirtDayCheckin,
                inputTime = oder[0].FirtHourCheckin,
                outdate = oder[0].LastDayCheckin,
                outTime = oder[0].LastHourCheckin,
                listdata = bien,
                phantramgia = oder[0].phantramgiam,
                thue = thuevaphuphi[0].thuevat,
                phuphi = thuevaphuphi[0].phuphi
            };

            return Json(Data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Save_Bill_Final(int Id)
        {
            var value = false;
            try
            {
                var update_chay = db.tblOrders.Find(Id);
                update_chay.Chay = 2;
                update_chay.Ca_lam_Id = Convert.ToInt32(Session["Id_giao_KA"]);
                var Id_oder_details = db.tblOrderDetails.Where(x => x.OrderId == Id && x.TypeOder == "Room").ToList();
                if (Id_oder_details.Any())
                {
                    foreach (var item in Id_oder_details)
                    {
                        var update_status_id_room = db.tblRooms.Find(item.EmployeeId);
                        update_status_id_room.R_Status = 2;
                    }
                }
                var Id_oder_employee = db.tblOrderDetails.Where(x => x.OrderId == Id && x.TypeOder == "Employee").ToList();
                if (Id_oder_employee.Any())
                {
                    foreach (var item2 in Id_oder_employee)
                    {
                        var update_status_id_employee = db.tblStaffInEmployees.Find(item2.EmployeeId);
                        update_status_id_employee.E_Status = 1;
                    }
                }
                db.SaveChanges();
                value = true;
            }
            catch (Exception)
            {
                value = false;
            }
            return Json(value, JsonRequestBehavior.AllowGet);
        }

        //chuyen trang thai phong
        public JsonResult Chang_Status_Room(int Id)
        {
            var value = false;
            try
            {
                var update_status_room = db.tblRooms.Find(Id);
                update_status_room.R_Status = 0;
                db.SaveChanges();
                value = true;
            }
            catch (Exception)
            {
                value = false;
            }
            return Json(value, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Change_Color(int Id, int value)
        {
            var value1 = false;
            try
            {
                var update_status_color = db.tbl_User.Find(Id);
                update_status_color.Dark_Light_theme = value;
                Session["status_color"] = value;
                db.SaveChanges();
                value1 = true;
            }
            catch (Exception)
            {
                value1 = false;
            }
            return Json(value1, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Change_Status(tbl_CaLamViec[] Id)
        {
            var valuee = false;
            try
            {
                var moca = db.tbl_CaLamViec.Where(x => x.Status == 1).ToArray();
                if (moca.Any())
                {
                    var update_status = db.tbl_CaLamViec.Find(moca[0].Id);
                    update_status.Id_giao = Convert.ToInt32(Session["userid"]);
                    update_status.Id_nhan = Id[0].Id_nhan;
                    update_status.Tong_tien_thu_trong_ca = Id[0].Tong_tien_thu_trong_ca;
                    update_status.Tien_ca_truoc_ban_giao = Id[0].Tien_ca_truoc_ban_giao;
                    update_status.Tong_tien_mat = Id[0].Tong_tien_mat;
                    update_status.Tong_tien_cuoi_ca = Id[0].Tong_tien_cuoi_ca;
                    update_status.Ngay = DateTime.Now;
                    update_status.Note_shift = Id[0].Note_shift;
                    update_status.Status = 2;
                    db.SaveChanges();
                    Session["status_KA"] = 2;
                    valuee = true;

                }
                else
                {
                    Session["status_KA"] = 1;

                }
                Session["Id_giao_KA"] = 0;


            }
            catch (Exception)
            {
                valuee = false;
            }
            return Json(valuee, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetData_Money()
        {
            var Ca_lam_viec = db.tbl_CaLamViec.Where(x => x.Status == 1).OrderByDescending(x => x.Id).Take(1).ToList();
            double Tong = 0;
            double Tien_Dau_Ca = 0;
            foreach (var item in Ca_lam_viec)
            {
                Tong = (double)db.Close_shift().Where(x => x.Ca_lam_Id == item.Id).Sum(x => x.Total);
                if (item.Tien_ca_truoc_ban_giao == null)
                {
                    Tong = 0;
                }
                else
                {
                    Tien_Dau_Ca = (double)item.Tien_ca_truoc_ban_giao;
                }
            }
            var Data = new { Tien_ca_truoc = Tien_Dau_Ca, Tien_trong_ca = Tong };

            return Json(Data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GET_Details_Employee(int Id)
        {
            var layID = db.tblStaffInEmployees.Find(Id);
            string value = string.Empty;
            value = JsonConvert.SerializeObject(layID, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return Json(value, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_data_admin_register()
        {
            var admin_register = db.BDang_Ky.ToList();
            var time_out = admin_register[0].Thoi_Gian_Check_Int;
            var chu_y = admin_register[0].Chu_y;
            var Data = new { time = time_out, chu_y = chu_y };
            return Json(Data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_data_admin_register_thongbao()
        {
            var admin_register = db.BDang_Ky.ToList();
            var thongbao = admin_register[0].Thong_bao;
            var tencongty = admin_register[0].tencongtychuthuong;
            var tenCTchuhoa = admin_register[0].Dangkycongty;
            var diachi = admin_register[0].Diachi;
            var sdt = admin_register[0].Dienthoai;
            var logo_res = admin_register[0].Logo;
            var camon = admin_register[0].thank_custommer;
            var Data = new { thongbao = thongbao, tencongty = tencongty, tenCTchuhoa = tenCTchuhoa, diachi = diachi, sdt = sdt, logo_res = logo_res, camon = camon };
            return Json(Data, JsonRequestBehavior.AllowGet);
        }
    }
}