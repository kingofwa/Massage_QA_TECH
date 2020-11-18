﻿
$("html").on("click", "#Save_setting", function () {
    debugger
    var thoigian = $("#thoigian").val();
    var thoigianca = $("#thoigianca").val();
    var fontchu = $("#fontchu").val();
    var cochu = $("#cochu").val();
    var mauchu = $("#mauchu").val();
    var chuy = $("#chuy").val();
    var mauonline = $("#mauonline").val();
    var maucokhach = $("#maucokhach").val();
    var maucho = $("#maucho").val();
    var thongbao = $("#thongbao").val();
    var colorbar = $("#colorbar").val();
    var maunhanvienonline = $("#maunhanvienonline").val();
    var maunhanviencokhach = $("#maunhanviencokhach").val();

    var heightContent = $("#heightContent").val();
    var widthContent = $("#widthContent").val();
    var heightRight = $("#heightRight").val();
    var widthRight = $("#widthRight").val();

    var update_setting = $("#update_setting").val();
    var setting_admin = [];
    setting_admin.length = 0;
    setting_admin.push({
        thoigian: thoigian,
        thoigianca: thoigianca,
        fontchu: fontchu,
        cochu: cochu,
        mauchu: mauchu,
        chuy: chuy,
        mauonline: mauonline,
        maucokhach: maucokhach,
        maucho: maucho,
        thongbao: thongbao,
        colorbar: colorbar,
        maunhanvienonline: maunhanvienonline,
        maunhanviencokhach: maunhanviencokhach,
        heightContent: heightContent,
        widthContent: widthContent,
        heightRight: heightRight,
        widthRight: widthRight,
        Id: update_setting
    })
    var data = JSON.stringify({
        arr_list_setting: setting_admin
    });
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: "/Admin/AdminSettingAdmin/Save_Setting_Admin",
        data: data,
        success: function (result) {
            if (result.sussecc == true) {
                toastr.success("Cập nhật thành công !");
                CHANGE_SETTING(colorbar, cochu, fontchu, mauchu, maucokhach, mauonline, maucho, thoigian, heightContent, widthContent, heightRight, widthRight, thongbao, chuy, maunhanvienonline, maunhanviencokhach);
                $("#caidatxong").html("<b style='color:green'>Cài Đạt Thành Công !</b>");
            } else {
                toastr.warning("Cập nhật thất bại !");
            }
        },
        error: function () {
            alert("Error!");
        }
    });
});

function SETTING(id) {
    var data = JSON.stringify({
        Id: id
    });
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: "/Admin/AdminSettingAdmin/CHANGGE_SETTING",
        data: data,
        success: function (result) {
            var color_all = result.colorbar;
            var cochu = result.cochu;
            var fontchu = result.fontchu;
            var mauchu = result.mauchu;
            var maucokhach = result.maucokhach;
            var mauonline = result.mauonline;
            var maucho = result.maucho;
            var thoigian = result.thoigian;
            var heightContent = result.heightContent;
            var widthContent = result.widthContent;
            var heightRight = result.heightRight;
            var widthRight = result.widthRight;
            var maunhanvienonline = result.maunhanvienonline;
            var maunhanviencokhach = result.maunhanviencokhach
            CHANGE_SETTING(
                color_all, cochu, fontchu, mauchu, maucokhach,
                mauonline, maucho, thoigian,
                heightContent, widthContent,
                heightRight, widthRight, thongbao, chuy, maunhanvienonline, maunhanviencokhach
                );
        },
        error: function () {
            alert("Error!");
        }
    });
};

function CHANGE_SETTING(
    color_all, cochu, fontchu, mauchu, maucokhach,
                mauonline, maucho, thoigian,
                heightContent, widthContent,
                heightRight, widthRight, thongbao, chuy, maunhanvienonline, maunhanviencokhach) {//hết param truyền vào

    $(".maume").css({//menu
        "background-color": color_all,
    });
    $("#css_sofware").css({//body
        "font-size": cochu + "px",
        "font-family": fontchu,
    });
    $(".mauchu").css("color", mauchu);

    $(".cokhach").css({
        "background-color": maucokhach,
    });
    $(".card").removeClass("bg-warning");
    $(".dangtrong").css({
        "background-color": mauonline,
    });
    $(".card").removeClass("bg-success");

    $(".dangdon").css({
        "background-color": maucho,
    });
    $(".maunhanvienonline").css({
        "background-color": maunhanvienonline,
    });
    $(".maunhanviencokhach").css({
        "background-color": maunhanviencokhach,
    });
   
    //change status on click choose local
    $("html").on("click", ".StatusEmployeeAdmin", function () {
        debugger
        var id = $(this).data('id'); 
        var status_click_value = $("#doimau_" + id).val();
        if (status_click_value == 0) {
            var user_hide = $("#user_hide").data('color');
            var array = user_hide.split("|");
            if ($("#getroom_" + id).val() == 0) {
                //toastr.success("Đã chọn");
                $("#card-QA_Status_" + id).removeClass("bg-success");
                $("#card-QA_Status_" + id).css({
                    'background-color': array[4],
                })
                $("#choose_" + id).css("color", "#007005");
                $("#choose_html_" + id).html("ĐÃ CHỌN");
                $("#choose_icon_" + id).html("<i class='far fa-check-circle'></i>");
                $("#getroom_" + id).val(-1);
            } else {
                //toastr.warning("Đã hủy !");
                $("#card-QA_Status_" + id).css({
                    'background-color': array[5],
                });
                $("#choose_" + id).css("color", "white");
                $("#choose_html_" + id).html("ONLINE");
                $("#choose_icon_" + id).html("<i class='fas fa-diagnoses'></i>");
                $("#getroom_" + id).val(0);
            }
        }
    });
    //Set height && weight Content
    $(".card-body.room_zoom_out.black.direct-chat-messages.heightContent").css("height", heightContent);
    //$(".cao").css("height", widthContent);
    //alert(widthContent)

    //$(".heightRight").css("height", heightRight);
    //$(".widthRight").css("width", widthRight);
};

function GET_DATA_LISTCOLOR() {
    debugger
    if ($("#user_hide").data('color') != "") {
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'GET',
            url: "/Admin/AdminSettingAdmin/CHANGGE_SETTINGGGGGG",
            success: function (result) {
                var obj = JSON.parse(result);
                $("#fontchu").val(obj[0].fontchu);
                $("#cochu").val(obj[0].cochu);
                $("#mauchu").val(obj[0].mauchu);
                $("#mauonline").val(obj[0].mauonline);
                $("#maucokhach").val(obj[0].maucokhach);
                $("#maucho").val(obj[0].maucho);
                $("#colorbar").val(obj[0].colorbar);
                $("#maunhanvienonline").val(obj[0].maunhanvienonline);
                $("#maunhanviencokhach").val(obj[0].maunhanviencokhach);

                $("#heightContent").val(obj[0].heightContent);
                $("#widthContent").val(obj[0].widthContent);

                $("#heightRight").val(obj[0].heightRight);
                $("#widthRight").val(obj[0].widthRight);

                $("#Save_setting").removeClass("disabled");
            },
            error: function () {
                alert("Error!");
            }
        });
    }
};
function RETURN_DATA_LISTCOLOR() {
    $("#fontchu").val("");
    $("#cochu").val(18);
    $("#mauchu").val("#1f64a2");
    $("#mauonline").val("#28a745");
    $("#maucokhach").val("#ffc107");
    $("#maucho").val("#6c757d");
    $("#colorbar").val("#134a84");
    $("#maunhanvienonline").val("#28a745");
    $("#maunhanviencokhach").val("#ffc107");
    $("#heightContent").val(745);//px (css dòng 799)
    $("#widthContent").val(120);
    $("#heightRight").val(334);//px && dưới 336px(css dòng 826)
    $("#widthRight").val();
    $("#Save_setting").removeClass("disabled");
};

