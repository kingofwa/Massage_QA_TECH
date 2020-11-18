
function Show_All() {
    $(".NowEmpty").attr("style", "display:inline-block");
    $(".HaveGuests").attr("style", "display:inline-block");
    $(".ImBusy").attr("style", "display:inline-block");

    $(".NowEmpty").css({
        'padding-left': '2px',
        'padding-right': '2px',
    });
    $(".HaveGuests").css({
        'padding-left': '2px',
        'padding-right': '2px',
    });
    $(".ImBusy").css({
        'padding-left': '2px',
        'padding-right': '2px',
    });
}
function Show_Room_Empty() {
    $(".HaveGuests").attr("style", "display:none");
    $(".ImBusy").attr("style", "display:none");
    $(".NowEmpty").attr("style", "display:inline-block");
    $(".NowEmpty").css({
        'padding-left': '2px',
        'padding-right': '2px',
    });
}
function Show_Room_Employee() {
    $(".HaveGuests").attr("style", "display:inline-block");
    $(".NowEmpty").attr("style", "display:none");
    $(".ImBusy").attr("style", "display:none");
    $(".HaveGuests").css({
        'padding-left': '2px',
        'padding-right': '2px',
    });
}
function Show_Room_Transit() {
    $(".NowEmpty").attr("style", "display:none");
    $(".HaveGuests").attr("style", "display:none");
    $(".ImBusy").attr("style", "display:inline-block");
    $(".ImBusy").css({
        'padding-left': '2px',
        'padding-right': '2px',
    });
}
//History
function Show_history() {
    debugger
    if ($("#zoom_history").val() == 1) {
        $("#QA_block").addClass('d-none');
        $("#history_home_admin").removeClass("d-none");
        $("#history_home_admin").addClass("d-block");
        $("#none_addshowhistory").css("display", "none");
        $("#html").html("<i class='fas fa-project-diagram'></i> | " + "SƠ ĐỒ");
        $("i.fas.fa-angle-double-right").css("display", "none");
        $("#zoom_history").val(2);
    } else {
        $("#QA_block").removeClass('d-none');
        $("#history_home_admin").removeClass("d-block");
        $("#history_home_admin").addClass("d-none");
        $("#none_addshowhistory").css("display", "inline-block");
        $("#html").html("<i class='fas fa-history'></i> " + "Lịch sử");
        $("i.fas.fa-angle-double-right").css("display", "inline-block");
        $("#zoom_history").val(1);
    }

}

function Del_Oder(id) {
    debugger
    var data = JSON.stringify({ Id: id });
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: "/Admin/AdminHome/Delete_Oder",
        data: data,
        success: function (result) {
            if (result == true) {
                $("#black_binz_" + id).remove();
            } else {
                alert("Bạn bị lổi");
            }
        },
        error: function () {
            alert("Error!");
        }
    });
}


function Add_room_home() {
    $("#Modal_rooms").modal("show");
}

//xoa phong o trang home
$("html").on("click", "#Del_room_home", function () {
    debugger
    var OderRoomAdmin2 = document.getElementsByClassName("OderRoomAdmin2");
    var OderRoomAdmin = document.getElementsByClassName("OderRoomAdmin");
    var id = "";
    for (let j = 0; j < OderRoomAdmin2.length; j++) {
        if (OderRoomAdmin2[j].value == -1) {
            id = OderRoomAdmin[j].value
        }
    }
    var data = JSON.stringify({ Id: id });
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: "/Admin/AdminRoom/Delete_Room",
        data: data,
        success: function (result) {
            if (result == true) {
                $("#room_delete_" + id).remove();
            } else {
                alert("Bạn bị lổi");
            }
        },
        error: function () {
            alert("Error!");
        }
    });
})


function Show_employee_staff() {
    if ($("#zoom_in_out").val() == 1) {
        $(".card-body.room_zoom_out.black.direct-chat-messages").attr("style", "height :334px  !important");
        $("#hide_chart").removeClass("d-none");
        $("#zoom_in_out").val(2)
    } else {
        $(".card-body.room_zoom_out.black.direct-chat-messages").attr("style", "height :711px !important");
        $(".card-body.room_zoom_out.black.direct-chat-messages").attr("style", "border: 1px solid white;");
        $("#hide_chart").addClass("d-none");
        $("#zoom_in_out").val(1)
    };
};

function Show_thongke() {
    if ($("#thongke").val() == 1) {
        $("#hide_show_thongke").addClass("d-none");
        $("#show_thong_ke_home").removeClass("d-none");
        $("#none_addshowhistory").css("display", "none");
        $("#html").css("display", "none");
        $("#Add_work").css("display", "none");
        $("#show_work").css("display", "none");
        $("#html_thongke").html("<i class='fas fa-project-diagram'></i> | " + "SƠ ĐỒ");
        $("#thongke").val(2);
    } else {
        $("#hide_show_thongke").removeClass("d-none");
        $("#show_thong_ke_home").addClass("d-none");
        $("#none_addshowhistory").css("display", "inline-block");
        $("#html").css("display", "inline-block");
        $("#show_work").css("display", "inline-block");
        $("#Add_work").css("display", "inline-block");
        $("#html_thongke").html("<i class='fas fa-signal'></i> " + "THỐNG KÊ");
        $("#thongke").val(1);
    }
}


function Hide_Oder_Right() {
    $("#hide_oder_home").addClass("d-none");
    $("#QA_block").removeClass("col-md-9.QA_block_home");
    $("#QA_block").addClass("col-md-12");
    $("#QA_card_left").css("display", "inline-block")
};
function Hide_Oder_Left() {
    $("#QA_card_left").css("display", "none");
    $("#hide_oder_home").removeClass("d-none");
    $("#hide_oder_home").addClass("col-md-3");
    $("#QA_block").addClass("col-md-9.QA_block_home");
    $("#QA_block").removeClass("col-md-12");
};

//-------------------------------------------------------------------------------------------
$("html").on("click", ".paginate_button", function () {
    debugger
    var status_color_table = document.getElementsByClassName("status_color_table");
    var status = status_color_table.length;
    var id = "";
    for (var i = 0; i < status; i++) {
        id = status_color_table[i].value;
        if ($("#customSwitch").val() == 1) {
            $("#black_binz_" + id).attr("style", "background:white");
        } else {
            $("#black_binz_" + id).attr("style", "background:black");
        }
    }

})
//-------------------------------------------------------------------------------------------


function chang_color(id) {
    if (id == 2) {
        $("aside").removeClass("sidebar-dark-primary");
        $("aside").addClass("bg-black");
        $("nav.navbar-light").removeClass("navbar-white");
        $("nav.navbar-light").addClass("bg-black");
        $(".content-wrapper").addClass("bg-black");

        $(".black").addClass("bg-black");
        $(".black").css("border", "1px solid white");


        $(".modal-body").addClass("bg-black");
        $(".modal-body").css("border", "1px solid white");
        $(".card-body.black.bg-black").css("border-top", "none");
        $(".defaul_QA").removeClass("card-primary");
        $(".defaul_QA").addClass("card-dark");
        $("#defaul_QA").removeClass("bg-primary");
        $("#defaul_QA").addClass("bg-dark");
        $(".main-sidebar").css("border-right", "1px solid white");
        $(".card-header").css("border", "1px solid");
        $(".quote-secondary").css("background", "black");
        $(".quote-secondary").css("border-left", "2px solid white");
        $(".vang").removeClass("badge-warning");
        $(".vang").addClass("badge-secondary");
        $(".table.text-center td").attr("style", "background:black");
        $("i.fas.fa-bell").css("color", "rgb(156 154 154)");
        $(".fa-power-off").css("color", "white");
        $(".fa-unlock-alt").css("color", "rgb(156 154 154)");
        $(".QA_form-control").css("color", "#3e4144");
        //$(".defaul").addClass("bg-primary");
        //$(".defaul").removeClass("bg-default");
        $("input.form-control.le").css("background", "#241f1f");
    } else {
        $("aside").removeClass("bg-danger");
        $("aside").addClass("sidebar-dark-primary");
        $("nav.navbar-light").removeClass("navbar-danger");
        $("nav.navbar-light").addClass("navbar-white");
        $("nav.navbar-light").removeClass("bg-black");

        $(".content-wrapper").removeClass("bg-black");
        $(".black").removeClass("bg-black");
        $(".black").css("border", "0px");

        $(".modal-body").removeClass("bg-black");
        $(".defaul_QA").removeClass("card-dark");
        $(".defaul_QA").addClass("card-primary");
        $("#defaul_QA").removeClass("bg-dark");
        $("#defaul_QA").addClass("bg-primary");
        $(".main-sidebar").css("border-right", "none");
        $(".card-header").css("border", "none");
        $(".quote-secondary").css("background", "white");
        $(".quote-secondary").css("border-left", "2px solid red");
        $(".vang").addClass("badge-warning");
        $(".vang").removeClass("badge-secondary");
        $(".table.text-center td").attr("style", "background:white");
        $("i.fas.fa-bell").css("color", "white");
        $(".fa-power-off").css("color", "black");
        $(".fa-unlock-alt").css("color", "red");
        $(".QA_form-control").css("color", "#027cf7");
        $("#border_0").css("border", "0px");
        $("input.form-control.le").css("background", "");
        //$(".defaul").removeClass("bg-primary");
        //$(".defaul").addClass("bg-default");
    }
}

$("html").on("click", "#customSwitch", function () {
    var id_user = $("#user_hide").val();
    var id = $("#customSwitch").val();
    if (id == 1) {
        $("#customSwitch").val(2);
        id = 2;
    } else {
        $("#customSwitch").val(1);
        id = 1;
    }
    var data = JSON.stringify({
        Id: id_user,
        value: id
    });
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: "/Admin/AdminHome/Change_Color",
        data: data,
        success: function (result) {
            if (result) {
                chang_color(id);
            } else {

            }
        },
        error: function () {
            alert("Error!");
        }
    });
})
//phong to thu nho phong
function Drag() {
    debugger
    var QA_range = parseInt(document.getElementById("vol").value);
    if (QA_range >= 0 && QA_range < 10) {
        $(".Drag_Cart").removeClass("col-md-2");
        $(".Drag_Cart").addClass("col-md-1");
        $(".Drag_Cart").removeClass("col-md-3");
        $(".Drag_Cart").removeClass("col-md-4");
        $(".Drag_Cart").removeClass("col-md-6");
        $("#none").html("")
    } else if (QA_range >= 10 && QA_range < 22) {
        $(".Drag_Cart").removeClass("col-md-1");
        $(".Drag_Cart").addClass("col-md-2");
        $(".Drag_Cart").removeClass("col-md-3");
        $(".Drag_Cart").removeClass("col-md-4");
        $(".Drag_Cart").removeClass("col-md-6");
    } else if (QA_range >= 22 && QA_range < 35) {
        $(".Drag_Cart").removeClass("col-md-2");
        $(".Drag_Cart").addClass("col-md-3");
        $(".Drag_Cart").removeClass("col-md-4");
        $(".Drag_Cart").removeClass("col-md-6");
    } else if (QA_range >= 35 && QA_range < 45) {
        $(".Drag_Cart").removeClass("col-md-3");
        $(".Drag_Cart").addClass("col-md-4");
        $(".Drag_Cart").removeClass("col-md-6");
    } else if (QA_range >= 45 && QA_range <= 50) {
        $(".Drag_Cart").removeClass("col-md-4");
        $(".Drag_Cart").addClass("col-md-6");
    }

}

//an hien pass
$('.unmask').on('click', function () {
    if ($(this).prev('input').attr('type') == 'password')
        $(this).prev('input').prop('type', 'text');
    else
        $(this).prev('input').prop('type', 'password');
    return false;
});
//check pass trùng
function Change_Password() {
    debugger
    var pass = $("#Pass_SC").val();
    var id = $("#user_hide").val();
    var data = JSON.stringify({
        id: id,
        IdChange_pass: pass
    });
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: "/Admin/AdminHome/Change_Passwords",
        data: data,
        success: function (result) {
            debugger
            if (result) {
                $("input#Pass_SC").css({
                    "border": "1px solid green",
                    "background": "rgb(160 239 163)",
                })
                $(".fas.fa-check-circle").css("display", "inline-block");
                document.getElementById("Pass_new1").disabled = false;
                document.getElementById("Pass_new2").disabled = false;
                $("#Pass_new1").css("cursor", "auto");
                $("#Pass_new2").css("cursor", "auto");
            } else {
                $("input#Pass_SC").css({
                    "border": "1px solid red",
                    "background": "#fee5e5",
                })
                $(".fas.fa-check-circle").css("display", "none");
            }
        },
        error: function () {
            alert("Error!");
        }
    });
};

//check pass
$(document).ready(function () {
    $("#Pass_new2").keyup(function () {
        debugger
        var p1 = $("#Pass_new1").val();
        var p2 = $("#Pass_new2").val();
        if (p1 == p2 || p2 == p1) {
            $("#Pass_new1").css({
                "border": "1px solid green",
                "background": "rgb(160 239 163)",
            })
            $("#Pass_new2").css({
                "border": "1px solid green",
                "background": "rgb(160 239 163)",
            })
            $(".fas.fa-check").css("display", "block");
            $("a.btn.btn-xs.btn-primary.p-0").removeClass("disabled");
            $("#logoutnone").css("display", "none");
        } else {
            $("#Pass_new1").css({
                "border": "1px solid red",
                "background": "#fee5e5",
            })
            $("#Pass_new2").css({
                "border": "1px solid red",
                "background": "#fee5e5",
            })
            $(".fas.fa-check").css("display", "none");
        }
    });
});
//doi pass nhan vien
function Last_Change_Password() {
    debugger
    var passnew = $("#Pass_new2").val();
    var id = $("#user_hide").val();
    var data2 = JSON.stringify({
        id: id,
        passss: passnew,
    });
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: "/Admin/AdminHome/Update_Pass",
        data: data2,
        success: function (result) {
            if (result == true) {
                toastr.success("Cập nhật mật khẩu thành công !");
            } else {
                toastr.warning("Thất bại !");
            }
        }
    });
};

$("html").on("click", "#Save_Bill", function () {
    debugger
    var ID_Oder = $("#Id_oder_details").val();
    var data = JSON.stringify({
        Id: ID_Oder,
    });
    $.ajax({
        contentType: 'application/json;charset=utf-8',
        dataType: 'Json',
        type: 'POST',
        url: '/Admin/AdminHome/Save_Bill_Final',
        data: data,
        success: function (result) {
            if (result == true) {
                $("#QA_Modal_bill").modal("hide");
            } else {
                toastr.warning("Thất bại !");
            }
        }
    })
});

//chuyen trạng thái phòng đang dọn
$("html").on("click", "#Status_room_home", function () {
    debugger
    var id_status_ImBusy = $(this).data('inline');
    var data = JSON.stringify({
        Id: id_status_ImBusy,
    });
    $.ajax({
        contentType: 'application/json;charset=utf-8',
        dataType: 'Json',
        type: 'POST',
        url: '/Admin/AdminHome/Chang_Status_Room',
        data: data,
        success: function (result) {
            if (result == true) {
                debugger
                toastr.success("Cập nhật thành công !");
                var user_hide = $("#user_hide").data('color');
                var array = user_hide.split("|");
                $("#card-QA_Status_" + id_status_ImBusy).removeClass("bg-secondary");
                $("#card-QA_Status_" + id_status_ImBusy).css({
                    'background-color': array[5],
                });
                $("#choose_" + id_status_ImBusy).css("color", "white");
                $("#choose_icon_" + id_status_ImBusy).html("<i class='fas fa-diagnoses'></i>");
                $("#choose_html_" + id_status_ImBusy).html("ONLINE");
                $("#doimau_" + id_status_ImBusy).val(0);
            } else {
                toastr.warning("Thất bại !");
            }
        }
    });
});



//dong ca lam viec
$("html").on("click", "#show_work", function () {
    $("#Modal_Close_work_shift").modal('show');
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'Json',
        type: 'POST',
        url: "/Admin/AdminHome/GetData_Money",
        success: function (result) {
            $("#Tong_tien").val(themdauphay(result.Tien_trong_ca));
            $("#Tong_tien_mat").val(themdauphay(result.Tien_trong_ca));
            $("#Tien_dau_ca").val(themdauphay(result.Tien_ca_truoc));
            $("#Tong_tien_cuoi_ca").val(themdauphay(result.Tien_trong_ca + result.Tien_ca_truoc));
        },
        error: function () {
            alert("Error!");
        }
    })
});

//phieu thu
$("html").on("click", "#phieuthu", function () {
    $("#modal_thutien").modal('show');
});

//phieu chi
$("html").on("click", "#phieuchi", function () {
    $("#modal_chitien").modal('show');
});

//Mở ca lam viec
$(document).ready(function () {
    $("#Add_work").click(function () {
        $("#Modal_work_shift").modal('show');
    })
})

$("html").on("click", "#save_work_shift", function () {
    debugger
    var NameEmployee = $("#NameEmployee").val();
    var chose_work_shift = $("#chose_work_shift").val();
    var FirtTime = $("#FirtTime").val();
    var LastTime = $("#LastTime").val();
    var Note = $("#Note_shift").val();
    var firt_money = $("#Tien_ca_truoc_ban_giao").val();
    var add_work_shift = [];
    add_work_shift.length = 0;
    add_work_shift.push({
        LoaiCaLamViecId: chose_work_shift,
        FirtTime: FirtTime,
        LastTime: LastTime,
        NameEmployee: NameEmployee,
        Note: Note,
        Tien_ca_truoc_ban_giao: firt_money,
    });
    var data = JSON.stringify({
        Id: add_work_shift
    });
    $.ajax({
        contentType: 'application/json;charset=utf-8',
        dataType: 'Json',
        type: 'POST',
        url: '/Admin/AdminWorkShift/Save_shift',
        data: data,
        success: function (result) {
            if (result == true) {
                alert("thanh cong")
                $("#Modal_work_shift").modal('hide');
                Status_room(1);
            } else {
                alert("that bai")
            }
        }
    });
});
function Doi_phay(Tong_tien) {
    if (Tong_tien == null) {
        return 0;
    }
    else {
        while (Tong_tien.indexOf(",") > -1) {
            Tong_tien = Tong_tien.replace(",", "")
        }
        return parseFloat(Tong_tien);
    }
}
$("html").on("click", "#dong_ca", function () {
    debugger
    var Id_nhan = $("#Id_nhan").val();
    var Tong_tien = $("#Tong_tien").val();
    var Tong_tien_mat = $("#Tong_tien_mat").val();
    var Tien_dau_ca = $("#Tien_dau_ca").val();
    var Tong_tien_cuoi_ca = $("#Tong_tien_cuoi_ca").val();
    var Note_shift = $("#Note_shift").val();

    var save_shift = [];
    save_shift.length = 0;
    save_shift.push({
        Id_nhan: Id_nhan,
        Tong_tien_thu_trong_ca: Doi_phay(Tong_tien),
        Tong_tien_mat: Doi_phay(Tong_tien_mat),
        Tien_ca_truoc_ban_giao: Doi_phay(Tien_dau_ca),
        Tong_tien_cuoi_ca: Doi_phay(Tong_tien_cuoi_ca),
        Note_shift: Note_shift
    });
    var data = JSON.stringify({
        Id: save_shift,
    });

    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: "/Admin/AdminHome/Change_Status",
        data: data,
        success: function (result) {
            if (result) {
                Status_room(2)
            } else {
            }
        },
        error: function () {
            alert("Error!");
        }
    });
});
$(document).ready(function () {
    var status_shift = $("#status_shift").val();
    Status_room(status_shift);
})
function Status_room(id) {
    if (id == 1) {
        $("#show_room_home").css("pointer-events", "auto");
        $("#show_work").removeClass("d-none");
        $("#Add_work").addClass("d-none");
        $(".QA_table_bill").css("pointer-events", "auto");
        $(".QA_table_oder").css("pointer-events", "auto");
    } else if (id == 2) {
        $("#show_room_home").css("pointer-events", "none");
        $("#show_work").addClass("d-none");
        $("#Add_work").removeClass("d-none");
        $(".QA_table_bill").css("pointer-events", "none");
        $(".QA_table_oder").css("pointer-events", "none");
    }
    else {
        $("#show_room_home").css("pointer-events", "none");
        $("#show_work").addClass("d-none");
        $("#Add_work").addClass("d-none");
        $(".QA_table_bill").css("pointer-events", "none");
        $(".QA_table_oder").css("pointer-events", "none");
    }
};
//load
$("html").on("click", "#Reload_page", function () {
    location.reload();
});

//Xem chi tiet nhan vien
$("html").on("click", ".employee_details", function () {
    $("#details_employeeStaff").modal('show');
    var id = $(this).data('id');
    var data = JSON.stringify({
        Id: id,
    });
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: "/Admin/AdminHome/GET_Details_Employee",
        data: data,
        success: function (result) {
            debugger
            var OBJ = JSON.parse(result);
            if (OBJ != null) {
                var Image_details = $("#Show_details_employeeee").html("");
                if (OBJ.E_ImageList != null) {
                    var anh = OBJ.E_ImageList.split("|");
                    for (var i = 0; i < anh.length; i++) {
                        var Data =
                        '<div class="col-4">' +
                        '<div class="card">' +
                        '<img class="card-img-top" src="' + anh[i] + '" alt="QA" style="height: 235px">' +
                        '</div>' +
                        '</div>';
                        Image_details.append(Data);
                    }
                }
                $("#name_employee").html(OBJ.E_Name);
                var sao = "";
                for (var i = 0; i < 5; i++) {
                    if (i < OBJ.E_NumberStar_View1) {
                        sao += "<i class='fa fa-star' style='padding:3px;color: #f5ab52'></i>"
                    }
                }
                $("#number_star").html(sao);

                //$("#total_review").html(OBJ.);
                //$("#total_star").html(OBJ.);
                //$("#saotrungbinh").html(OBJ.);
            } else {

            }
        },
        error: function () {
            alert("Error!");
        }
    });
});

$('html').on('change', "#oder_ngay", function () {
    serach_oder();
});
$('html').on('change', "#oder_denngay", function () {
    serach_oder();
});

function serach_oder() {
    debugger
    var oder_ngay = $("#oder_ngay").val();
    var oder_denngay = $("#oder_denngay").val();
    var id = oder_ngay + "|" + oder_denngay;
    var SetData = $("#button_search_oder").html("");
    Data_oder = '<a class="btn btn-xs btn-warning ml-3" onclick="lichsu_oder()" >Tìm kiếm<i class="fas fa-search ml-2"></i></a>';
    if (oder_ngay != null && oder_ngay != "" && oder_denngay != null && oder_denngay != "") {
        SetData.append(Data_oder);
    }
}


function lichsu_oder() {
    debugger
    var oder_ngay = $("#oder_ngay").val();
    var oder_denngay = $("#oder_denngay").val();
    var id = oder_ngay + "|" + oder_denngay;
    var data = JSON.stringify({
        Id: id,
    });
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: "/Admin/AdminHome/History_Oder_Home",
        data: data,
        success: function (result) {
            debugger
            if (result != null) {
                var obj = JSON.parse(result)
                $("#count_banghi").html("Tìm thấy" + '<b style="color:red;padding-left:5px;padding-right:5px;">' + obj.length + '</b>' + "bản ghi");
                var SetDate = $("#show_oder_history").html("");
                for (var i = 0; i < obj.length; i++) {
                    var time = obj[i].DayNew
                    var time2 = moment(time).format("MM/DD/YYYY");
                    var data =
                        '<tr>' +
                             '<td class="text-danger">' + i + '</td>' +
                             '<td>' + obj[i].O_number + '</td>' +
                             '<td>' + obj[i].NhanVienID + '</td>' +
                             '<td>' + time2 + '</td>' +
                             '<td>' + obj[i].Note + '</td>' +
                         '</tr>';
                    SetDate.append(data);
                }
            } else {
                "không có else"
            }
        },
        error: function () {
            alert("Error!");
        }
    });
};




//$("html").on("click", "#khoamanhinh", function () {
//    var show_hide_toogle = $("#show_hide_toogle_pass").val();
//    if (show_hide_toogle == 1) {
//        $("#show_hide_toogle_pass").val(2);
//    } else {
//        $("#mokhoashow").toggle("show");
//        $("#show_hide_toogle_pass").val(1);
//    }
//    $("body,.card,.StatusEmployeeAdmin").css({
//        "pointer-events": "none",
//        "cursor": "no-drop",
//    });// "cursor": "no-drop",

//    $("#khoamanhinh,#cuor_auto,#mo").css({
//        "pointer-events": "auto",
//    });

//});

//function UNLOCK_SCREEN() {

//}


//an hien so do khi vao menu item
//$("html").on("click", ".nav-link p", function () {
//    if ($("#hide_sodo").val() == 1) {
//        $("#sodo").removeClass("d-none");
//        $("#sodo").addClass("d-inline-block");
//        $("#hide_sodo").val(2)
//    } else {
//        $("#sodo").removeClass("d-none");
//        $("#sodo").addClass("d-inline-block");
//    }
//})
