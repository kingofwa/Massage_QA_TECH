
function ShowDetails(id) {
    debugger
    //var id = $(this).data('id');
    if ($("#hide_" + id).val() == 0) {
        $("#show_details_" + id).removeClass(".fa fa-plus-circle");
        $("#show_details_" + id).addClass(".fa fa-minus-circle");
        $("#show_details_" + id).css("color", "red");
        $("#HideDetails_" + id).removeClass("d-none")
        $("#HideDetails_" + id).addClass("d-inline-block")
        $("#hide_" + id).val(1);
    } else {


        $("#show_details_" + id).removeClass(".fa fa-minus-circle");
        $("#show_details_" + id).addClass(".fa fa-plus-circle");
        $("#HideDetails_" + id).removeClass("d-inline-block")
        $("#HideDetails_" + id).addClass("d-none")
        $("#show_details_" + id).css("color", "green");
        $("#hide_" + id).val(0);
    }
}
//
$("html").on("click", ".employee.text-xs-center", function () {
    var id = $(this).data('id');// lay gia tri trong data-id
    debugger
    Doimau(id, 0)
});
function Doimau(id, idtang) {
    debugger
    if ($("#statusemployee_" + id).val() == 0) {
        $("#addemployee_" + id).css("background", "#df8931");
        $("#addemployee_" + id).css("color", "white");
        //$("#addemployee_" + id).html("chon");
        $("#statusemployee_" + id).val(1);
        $("#QA_employee_Oder_Admin_ID_tang_" + id).val(idtang);
    } else {
        $("#addemployee_" + id).css("background", "green");//xanh
        $("#addemployee_" + id).css("color", "white");
        //$("#addemployee_" + id).html("");
        $("#statusemployee_" + id).val(0);
        $("#QA_employee_Oder_Admin_ID_tang_" + id).val(idtang);
    }
}
//Gan gia tri tu bang oder len modal 
function OderDetailsShow() {
    debugger
    $(".QA_employee_Oder_Admin").val(0);
    $(".employee").css("background", "green");
    var QA_CheckOder = document.getElementsByClassName("QA_CheckOder");
    var list_oder = "";

    for (var i = 0; i < QA_CheckOder.length; i++) {
        if (QA_CheckOder[i].checked == true) {
            list_oder = QA_CheckOder[i].value;
            $("#Order_Id_hiden").val(QA_CheckOder[i].value);

            $("#ServiceCheckin").val($("#IdCate_" + list_oder).data('id'));//lay id cua category tu bang oder sang modal xac nhan
            $("#CategoryCheckin").val($("#IdService_" + list_oder).data('id'));//lay id cua service tu bang oder sang modal xac nhan


            $("#ServiceCheckin_Tang_Id_hiden").val($("#IdService_" + list_oder).data('name'));
            $("#Category_Id_Tang_hiden").val($("#IdCate_" + list_oder).data('name'));
            var Employeecolor = $("#hide_" + list_oder).data('id');

            var id_tang = $("#hide_" + list_oder).data('name');

            var Arrayid_tang = id_tang.toString().split("|");

            var ArrayEmployee = Employeecolor.toString().split("|");

            for (var j = 0; j < ArrayEmployee.length; j++) {
                Doimau(ArrayEmployee[j], Arrayid_tang[j]);
            }
        }
    }
};

function CheckRoom() {
    debugger
    $("#show_rooms").html("");
    var OderRoomAdmin = document.getElementsByClassName("OderRoomAdmin");
    var OderRoomAdmin2 = document.getElementsByClassName("OderRoomAdmin2");
    var ListRoom = "";
    for (var i = 0; i < OderRoomAdmin2.length; i++) {
        if (OderRoomAdmin2[i].value == -1) {
            if (ListRoom == "") {
                ListRoom = $("#getroom_" + OderRoomAdmin[i].value).data('id');
            }
            else {
                ListRoom = ListRoom + "|" + $("#getroom_" + OderRoomAdmin[i].value).data('id');
            }

            var room = $("#show_rooms");
            var DataRoom =
                ' <div class="col-md-2 text-white-50">' +
                ' <p class="bg-warning text-center " style="font-size: 15px;">' + $("#getroom_" + OderRoomAdmin[i].value).data('name') + '</p>' +

                '</div>';
            room.append(DataRoom);
        }
    }
    var room = $("#show_rooms");

    var DataRoom = '<input type="hidden" id="Select_rom_" value="' + ListRoom + '" />';

    room.append(DataRoom);
}

function Show_Modal_OderDetailsShow() {
    debugger
    $("#modal-xl").modal("show");
    OderDetailsShow();
    CheckRoom();
    GET_Data_Admin_T_C();//lay thoi gian && chu y
    var time_now = new Date();//gan time hien tai khi show check
    var time = moment(time_now).format("h:mm A");
    $("#FirtHourCheckin").val(time);
};
function CloseRessetRoom() {
    $("#modal-xl").modal("hide");
};

function GET_Data_Admin_T_C() {
    debugger
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: "/Admin/AdminHome/Get_data_admin_register",
        success: function (result) {
            if (result) {
                var time_now = new Date();
                var time = parseInt(result.time);
                var return_time = time_now.setHours(time_now.getHours() + time);
                var time_checkout = moment(return_time).format("h:mm A");
                var day_checkout = moment(time_now).format("L");
                $("#LastDayCheckin").val(day_checkout);
                $("#LastHourCheckin").val(time_checkout);
                //chu y
                if (result.chu_y) {
                    $("#chu_y_khi_check").html("<i class='fas fa-exclamation-triangle mr-1'></i>" + result.chu_y);
                } else {
                    $("#chu_y_khi_check").html("");
                }
            } else {
                toastr.warning(" CheckIn thất bại !");
            }
        },
        error: function () {
            alert("error")
        }
    })
};
$(document).ready(function () {
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'GET',
        url: "/Admin/AdminHome/Get_data_admin_register_thongbao",
        success: function (result) {
            if (result) {
                if (result.thongbao) {
                    $("#thongbao_bottom_footer").html("<i class='fas fa-bullhorn mr-2'></i>" + result.thongbao);
                } else {
                    $("#thongbao_bottom_footer").html("");
                }
                $(".tencongty").html("<i class='fab fa-gg mr-1'></i>" + result.tencongty);
                $(".viethoaCT").html(result.tenCTchuhoa);
                $(".diachi").html("<i class='fas fa-map-marker-alt mr-1'></i>" + result.diachi);
                $(".sdt").html("<i class='fas fa-phone-alt mr-1'></i>" + result.sdt);
                $(".logo_res").attr("src", result.logo_res);

                $(".camon").html(result.camon);
            } else {
                toastr.warning(" thất bại !");
            }
        },
        error: function () {
            alert("error")
        }
    });
});


//thay doi background khi click chuot trai 
//$("html").on("click", ".StatusEmployeeAdmin", function () {
//    debugger
//    var id = $(this).data('id');
//    var status_click_value = $(this).data('status');
//    if (status_click_value == 0) {
//        if ($("#getroom_" + id).val() == 0) {
//            toastr.success("Đã chọn");
//            $("#card-QA_Status_" + id).removeClass("bg-success");
//            $("#card-QA_Status_" + id).addClass("bg-orange");
//            //$("#card-QA_Status_" + id).css({
//            //    'background-color': 'rgb(222 182 122)',
//            //})
//            $("#getroom_" + id).val(-1)
//        } else {
//            toastr.warning("Đã hủy !");
//            $("#card-QA_Status_" + id).addClass("bg-success");
//            $("#card-QA_Status_" + id).removeClass("bg-orange");
//            //$("#card-QA_Status_" + id).css({
//            ////    'background-color': ''
//            //})
//            $("#getroom_" + id).val(0)
//        }
//     }
//})

function ConfirmCheckIn() {
    debugger
    var firtdaycheck = $("#FirtDayCheckin").val();
    var firthourcheck = $("#FirtHourCheckin").val();
    var lastdaycheck = $("#LastDayCheckin").val();
    var lasthourcheck = $("#LastHourCheckin").val();
    var categorycheck = $("#CategoryCheckin").val();
    var servicecheck = $("#ServiceCheckin").val();
    var notecheck = $("#NoteCheckin").val();
    var employeeStaffCheck = document.getElementsByClassName("QA_employee_Oder_Admin1");
    var oder = [];
    oder.length = 0;
    oder.push({
        Id: $("#Order_Id_hiden").val(),
        FirtDayCheckin: firtdaycheck,
        FirtHourCheckin: firthourcheck,
        LastHourCheckin: lasthourcheck,
        CategoryCheckin: categorycheck,

    })
    var ID_tang = document.getElementsByClassName('ID_tang');
    var oderdetail = [];
    oderdetail.length = 0;
    var employeestaff = "";
    oderdetail.push({
        Id_tang: ID_tang[0].value,
        EmployeeId: categorycheck,
        TypeOder: "categori"
    })
    if (servicecheck > 0) {
        oderdetail.push({
            Id_tang: ID_tang[1].value,
            EmployeeId: servicecheck,
            TypeOder: "service"
        })
    }

    for (var i = 0; i < employeeStaffCheck.length; i++) {
        var value = employeeStaffCheck[i].value;

        if (parseInt($("#statusemployee_" + value).val()) == 1) {
            oderdetail.push({
                Id_tang: ID_tang[(i + 2)].value,
                EmployeeId: $("#statusemployee_" + employeeStaffCheck[i].value).data('id'),
                Money: $("#statusemployee_" + employeeStaffCheck[i].value).data('money'),
                TypeOder: "Employee"
            })

        }
    }


    var data = JSON.stringify({
        oderdetail: oderdetail,
        oder: oder,
        Room: $("#Select_rom_").val()
    });
    debugger
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: "/Admin/AdminHome/Save_Admin_Order_And_Detail",
        data: data,
        success: function (result) {
            alert(result)
            if (result.success == true) {
                toastr.success("CheckIn thành công!");
                $("#modal-xl").modal("hide");
                $(".QA_hover_disabled").css({
                    "pointer-events": "none",
                    "cursor": "not-allowed"
                });
                //$(".Time_Out").html(LastHourCheckout);

            } else {
                toastr.warning(" CheckIn thất bại !");
            }
        },
        error: function () {
            alert("error")
        }
    })
};

//////////////////Tính tiền/////////////////////////

$("html").on("click",".checkmark.le", function () {
    debugger
    $("#QA_Modal_bill").modal("show");
    var id = "";
    id = parseInt($(this).data('id'));
    var data = JSON.stringify({
        Id: id,
    });
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: "/Admin/AdminHome/GetData_Bill",
        data: data,
        success: function (result) {
            debugger
            if (result != null) {
                var time = $("#show_time").html("");
                var Data =
                   ' <h3 class="card-title d-block" style="font-size:14px;">Mã Oder: <small>' + result.order + '</small></h3>' +
                   ' <div class="d-inline-block ">' +
                   ' <span>Giờ vào: <small>' + result.inputTime + ' </small></span>' +
                   ' <span>Giờ ra: <small>' + result.outTime + ' </small></span>' +
                   '<input type="hidden" id="Id_oder_details" value="' + result.Id + '"/> ' +
                   ' </div>';
                time.append(Data);
                var content = $("#show_content").html("");
                var total = 0;
                for (let i = 0; i < result.listdata.length; i++) {
                    total += result.listdata[i].moneyy;

                    var data =
                    ' <tr>' +
                    '<td class="text-center text-danger">' + (i + 1) + '</td>' +
                    '<td>' + result.listdata[i].content + '</td>' +
                    '<td class="text-right"><b class="text-danger">' + themdauphay(result.listdata[i].moneyy) + '</b></td>' +
                    '<td colspan="3"></td>' +
                    '</tr>';
                    content.append(data);
                }
                var data1 =
                    '<tr>' +
                    '<td class="text-left" colspan="3"> <b>Tổng</b> </td>' +
                    '<td class="text-right"><b class="text-danger">' + themdauphay(total) + '</b></td>' +
                    '<td colspan="3"></td>' +
                    '</tr>';
                content.append(data1);
                var giamgia = $("#giam_gia").html("");
                var tongphaitra_chuathue_chuaphi = total * (100 - result.phantramgia) / 100;
                var tienmatduocgiam = total - tongphaitra_chuathue_chuaphi;

                if (result.phantramgia > 0 ) {
                    var data_giamga =
                        ' <td class="text-left" colspan="3"> <b>Giảm</b> </td>' +
                        ' <td class="text-right"><b class="text-danger">' + result.phantramgia + "%" + "<small>" + "(" + "-" + themdauphay(tienmatduocgiam) + ")" + "</small>" + '</b></td>' +
                        '<td></td>';
                    giamgia.append(data_giamga);
                };
                var thue = $("#thueneuco").html("");
                if (result.thue > 0) {
                    var data_thue =
                        ' <td class="text-left" colspan="3"> <b>Thuế</b> </td>' +
                        ' <td class="text-right"><b class="text-danger">' + result.thue + "%" + '</b></td>' +
                        '<td></td>';
                    thue.append(data_thue);
                };
                var phuphi = $("#phuphi_neuco").html("");
                if (result.phuphi > 0) {
                    var data_phuphi =
                        ' <td class="text-left" colspan="3"> <b>Phụ phí</b> </td>' +
                        ' <td class="text-right"><b class="text-danger">' + themdauphay(result.phuphi)+ '</b></td>' +
                        '<td></td>';
                    phuphi.append(data_phuphi);
                };
                //var tongphaitra_chuathue_chuaphi = total * (100 - result.phantramgia) / 100;
                //var tienmatduocgiam = total - tongphaitra_chuathue_chuaphi;
                //var tienmat = $("#giamgia_admin_tienmat").html("");
                //if (tienmatduocgiam > 0) {
                //    var data2 =
                //            '<td class="text-left" colspan="3"> <b>Tiền mặt</b></td>' +
                //            '<td class="text-right"><b class="text-danger">' + "-" + themdauphay(tienmatduocgiam) + '</b></td>' +
                //            '<td></td>';
                //    tienmat.append(data2);
                //}
                var tongphaitra_chuathue_cophi = result.phuphi;
                var tongphaitra_cothue_chuaphi = tongphaitra_chuathue_chuaphi * (100 + result.thue) / 100;
                var tongphaitra = tongphaitra_cothue_chuaphi + tongphaitra_chuathue_cophi;
                $("#tongphaithu").html(themdauphay(tongphaitra));
            } else {
                toastr.warning("Thất bại !");
            }
        },
        error: function () {
            alert("error")
        }
    })

})
// Lưu hóa đơn update




function Chart_home() {
    $("#vert-tabs-home").show();
}