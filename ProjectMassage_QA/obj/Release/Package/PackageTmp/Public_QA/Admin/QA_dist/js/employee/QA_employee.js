


$("html").on("click", "#play_employee", function () {
    $("#Modal_See_employee").modal('show');
})


$("html").on("click", "#add_employee", function () {
    $("#Modal_employee").modal('show');
    $("#Id_employee").val(0);
    $("#QA_admin_Modal_work_form")[0].reset();
    $("#QA_admin_Modal_work_form2")[0].reset();
})

$("html").on("click", "#employee_staff", function () {
    ham2(2);
});
function ham2(id) {
    $("#add_defaul").val(id);
    $("#employee_defaul").removeClass("active");
    $("#employee_staff").addClass("active");
    $("#custom-tabs-four-profile").removeClass('d-none');
    $("#custom-tabs-four-profile").addClass('d-block');
    $("#custom-tabs-four-home").removeClass('d-block');
    $("#custom-tabs-four-home").addClass('d-none');
    $("#employee_defaul").removeClass('text-primary');
    $("#employee_staff").addClass("text-primary");

}
$("html").on("click", "#employee_defaul", function () {
    Ham1(1);
});
function Ham1(id) {
    $("#add_defaul").val(id);
    $("#employee_defaul").addClass("active");
    $("#employee_staff").removeClass("active");
    $("#custom-tabs-four-profile").addClass('d-none');
    $("#custom-tabs-four-profile").removeClass('d-block');
    $("#custom-tabs-four-home").addClass('d-block');
    $("#custom-tabs-four-home").removeClass('d-none');
    $("#employee_defaul").addClass('text-primary');
    $("#employee_staff").removeClass("text-primary");
}

$("html").on("click", "#save_employee", function () {
    var add_defaul = $("#add_defaul").val();
    if (parseInt(add_defaul) == 1) {
        Save_Defaul();
    } else {
        Save_Staff();
    }
});

function Save_Staff() {
    debugger
    var E_Code = $("#ES_Code1").val();
    var TypeEmployeeId = $("#TypeEmployeeId1").val();
    var E_Name = $("#ES_Name1").val();
    var E_Phone = $("#ES_Phone1").val();
    var E_CMND = $("#ES_CMND1").val();
    var E_Address = $("#ES_Address1").val();
    var E_Dayin = $("#ES_Dayin1").val();
    var E_Dayout = $("#ES_Dayout1").val();
    var id = $("#Id_employee1").val();
    var E_Image = $("#ES_Image1").val();


    var E_ImageList = $("#ES_ImageList1").val();
    var E_Money = $("#ES_Money1").val();
    var E_NumberStar_View1 = $("#ES_NumberStar_View1").val();
    var E_Details = $("#ES_Detail1").val();
    var employee = [];
    employee.length = 0;
    employee.push({
        Id: parseInt(id),
        TypeEmployeeId: TypeEmployeeId,
        E_Name: E_Name,
        E_Phone: E_Phone,
        E_CMND: E_CMND,
        E_Address: E_Address,
        E_Dayin: E_Dayin,
        E_Dayout: E_Dayout,
        E_Image: E_Image,
        E_Code: E_Code,

        E_ImageList: E_ImageList,
        E_Money: E_Money,
        E_NumberStar_View1: E_NumberStar_View1,
        E_Details: E_Details
    })
    var data = JSON.stringify({
        employee: employee
    });
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: "/Admin/AdminEmployee/Save_EmployeeStaff",
        data: data,
        success: function (result) {
            if (result.success == true) {
                alert("Save success !");
                if (parseInt(id) == 0) {
                    debugger
                    var showbody = $("#show-body");
                    var Data = "<tr id='row_" + result + "'> <td><input type='hidden' id='data_edit_employee_" + result.arraydata[0].Id + "' value='" + result.arraydata[0].TE_Admin_Staff + "'/>" +
                                "<input type='radio' name='radiocheck' class='activecheckedit' id='typehide_" + result + "' value='" + result.arraydata[0].Id + "' /></td>" +
                                "<td id='E_Name_" + result.arraydata[0].Id + "'>" + E_Name + "</td>" +
                                "<td id='TE_Name_" + result.arraydata[0].Id + "'>" + result.arraydata[0].TE_Name + "</td>" +
                                "<td id='E_Dayin_" + result.arraydata[0].Id + "'>" + E_Dayin + "</td>" +
                                "<td id='E_Active_" + result.arraydata[0].Id + "'><a id='color_status_" + result.arraydata[0].Id + "' class='btn btn-xs btn-success' onclick='Employee(" + result.arraydata[0].Id + ")'> Kích hoạt </a></td>" +
                                "<td id='E_Note_" + result.arraydata[0].Id + "'>" + E_Note + "</td>" +
                                "</tr>";
                    $("#Modal_employee").modal("hide");
                    showbody.append(Data);
                } else {
                    debugger
                    $("#E_Name_" + id).html(E_Name);
                    $("#TE_Name_" + id).html(result.arraydata[0].TE_Name);
                    $("#E_Dayin" + id).html(E_Dayin);
                    $("#E_Active_" + id).html("<a id='color_status_" + id + "' class='btn btn-xs btn-success' onclick='Employee(" + id + ")'>Kích hoạt</a>");
                    if (result.arraydata[0].E_Note != null) {
                        $("#E_Note_" + id).html(E_Note);
                    } else {
                        $("#E_Note_" + id).html("");
                    }
                    $("#data_edit_employee_" + id).val(result.arraydata[0].Id);
                    $("#Modal_employee").modal("hide");
                }
            } else {
                debugger
                alert("Save Loser !");
            }
        },
        error: function () {
            alert("Error!");
        }
    });
};

function Save_Defaul() {
    debugger
    var E_Code = $("#E_Code").val();
    var TypeEmployeeId = $("#TypeEmployeeId").val();
    var E_Name = $("#E_Name").val();
    var E_Phone = $("#E_Phone").val();
    var E_CMND = $("#E_CMND").val();
    var E_Address = $("#E_Address").val();
    var E_Dayin = $("#E_Dayin").val();
    var E_Dayout = $("#E_Dayout").val();
    var E_Note = $("#E_Note").val();
    var id = $("#Id_employee").val();
    var E_Image = $("#E_Image2").val();
    var employee = [];
    employee.length = 0;
    employee.push({
        Id: parseInt(id),
        E_Code: E_Code,
        TypeEmployeeId: TypeEmployeeId,
        E_Name: E_Name,
        E_Phone: E_Phone,
        E_CMND: E_CMND,
        E_Address: E_Address,
        E_Dayin: E_Dayin,
        E_Dayout: E_Dayout,
        E_Note: E_Note,
        E_Image: E_Image
    })
    var data = JSON.stringify({
        employee: employee
    });
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: "/Admin/AdminEmployee/Save_EmployeeDefault",
        data: data,
        success: function (result) {
            if (result.success == true) {
                alert("Save success !");
                if (parseInt(id) == 0) {
                    debugger
                    var showbody = $("#show-body");
                    var Data = "<tr id='row_" + result + "'> <td> <input type='hidden' id='data_edit_employee_" + result.arraydata[0].Id + "' value='" + result.arraydata[0].TE_Admin_Staff + "'/>" +
                        "<input type='radio' name='radiocheck' class='activecheckedit' id='typehide_" + result + "' value='" + result.arraydata[0].Id + "' /></td>" +
                                "<td id='E_Name_" + result + "'>" + E_Name + "</td>" +
                                "<td id='TE_Name_" + result + "'>" + result.arraydata[0].TE_Name + "</td>" +
                                "<td id='E_Dayin_" + result + "'>" + E_Dayin + "</td>" +
                                "<td id='E_Active_" + result + "'><a id='color_status_" + result + "' class='btn btn-xs btn-success' onclick='Employee(" + result + ")'> Kích hoạt </a></td>" +
                                "<td id='E_Note_" + result + "'>" + E_Note + "</td>" +
                                "</tr>";
                    $("#Modal_employee").modal("hide");
                    showbody.append(Data);
                } else {
                    debugger
                    $("#E_Name_" + id).html(E_Name);
                    $("#TE_Name_" + id).html(result.arraydata[0].TE_Name);
                    $("#E_Dayin" + id).html(E_Dayin);
                    $("#E_Active_" + id).html("<a id='color_status_" + id + "' class='btn btn-xs btn-success' onclick='Employee(" + id + ")'>Kích hoạt</a>");
                    $("#E_Note_" + id).html(E_Note);

                    $("#data_edit_employee_" + id).val(result.arraydata[0].TE_Admin_Staff_Note);
                    $("#Modal_employee").modal("hide");
                }
            } else {
                debugger
                alert("Save Loser !");
            }
        },
        error: function () {
            alert("Error!");
        }
    });

};

//delete
$("html").on("click", "#delete_employee", function () {
    var activecheckedit = document.getElementsByClassName("activecheckedit");
    var id = 0;
    for (let j = 0; j < activecheckedit.length; j++) {
        if (activecheckedit[j].checked == true) {
            id = parseInt(activecheckedit[j].value);
        }
    }
    var data = JSON.stringify({
        Id: id
    });

    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: "/Admin/AdminEmployee/Delete_Employee",
        data: data,
        success: function (result) {
            if (result == true) {
                alert("Bạn xóa thành công");
                $("#row_" + id).remove();
            } else {
                alert("Bạn bị lổi");
            }
        },
        error: function () {
            alert("Error!");
        }
    });

})
//edit
$("html").on("click", "#edit_employee", function () {
    debugger
    var activecheckedit = document.getElementsByClassName("activecheckedit");
    var id = 0;
    var TE_Admin_Staff_Note = 0;
    for (let j = 0; j < activecheckedit.length; j++) {
        if (activecheckedit[j].checked == true) {
            id = parseInt(activecheckedit[j].value);
            TE_Admin_Staff_Note = $("#data_edit_employee_" + id).val();
        }
    }
    var data = JSON.stringify({
        Id: id,
        TE_Admin_Staff_Note: TE_Admin_Staff_Note,
    });
    debugger
    //$("#QA_admin_Modal_work_form")[0].reset();

    $("#QA_admin_Modal_work_form2")[0].reset();
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: "/Admin/AdminEmployee/Edit_Employee",
        data: data,
        success: function (result) {
            debugger
            if (TE_Admin_Staff_Note == 1) {
                var opp = JSON.parse(result.arraydata);
                $("#E_Name").val(opp[0].E_Name);
                $("#E_Phone").val(opp[0].E_Phone);
                $("#E_CMND").val(opp[0].E_CMND);
                $("#E_Address").val(opp[0].E_Address);
                if (opp[0].E_Dayin != null) {
                    $("#E_Dayin").val(opp[0].E_Dayin.substring(0, 10));
                }
                if (opp[0].E_Dayout != null) {
                    $("#E_Dayout").val(opp[0].E_Dayout.substring(0, 10));
                }
                $("#E_Note").val(opp[0].E_Note);
                $("#E_Code").val(opp[0].E_Code);
                id = $("#Id_employee").val(id);

                $("#E_Image2").val(opp[0].E_Image);
                $("#show_image2").html("");
                var SetData = $("#show_image2");
                var Dataa = '<img src="' + opp[0].E_Image + '"style="width:30px;height:30px;">';
                SetData.append(Dataa);
                Ham1(1);
            } else {
                debugger
                ham2(2);
                var opp = JSON.parse(result.arraydata);
                $("#ES_Name1").val(opp[0].E_Name);
                $("#ES_Phone1").val(opp[0].E_Phone);
                $("#ES_CMND1").val(opp[0].E_CMND);
                $("#ES_Address1").val(opp[0].E_Address);
                if (opp[0].E_Dayin == null) {
                    $("#ES_Dayin1").val(0);
                } else {
                    $("#ES_Dayin1").val(opp[0].E_Dayin.substring(0, 10));
                }
                if (opp[0].E_Dayout == null) {
                    $("#ES_Dayout1").val(0);
                } else {
                    $("#ES_Dayout1").val(opp[0].E_Dayout.substring(0, 10));
                }
                $("#ES_Note1").val(opp[0].E_Note);
                $("#ES_Image1").val(opp[0].E_Image);
                $("#ES_ImageList1").val(opp[0].E_ImageList);
                $("#ES_Money1").val(opp[0].E_Money);
                $("#ES_NumberStar_View1").val(opp[0].E_NumberStar_View1);

                $("#ES_Detail1").val(opp[0].E_Details);
                $("#ES_Code1").val(opp[0].E_Code);
                $("#Id_employee1").val(id);
            }
            $("#Modal_employee").modal("show");
            $("#ES_Image1").val(opp[0].E_Image);
            $("#show_image_staff1").html("");
            var SetData = $("#show_image_staff1");
            var Dataa = '<img src="' + opp[0].E_Image + '"style="width:30px;height:30px;">';
            SetData.append(Dataa);
            $("#ES_ImageList1").val(opp[0].E_ImageList);
            $("#show_image_staff_list1").html("");
            if (opp[0].E_ImageList != null) {
                var mangimate = opp[0].E_ImageList.split("|");
                var SetData2 = $("#show_image_staff_list1");
                for (var i = 0; i < mangimate.length; i++) {
                    var Dataa2 = '<div  class="d-inline-block" id="delhtml_' + i + '"><img class="dataimage"  src="' + mangimate[i] + '"style="width:30px;height:30px;margin-right:8px;"><i data-id="' + i + '" data-url="' + mangimate[i] + '" class="fa fa-minus"></i></div>';
                    SetData2.append(Dataa2);
                }
            }
        },
        error: function () {
            alert("Error!");
        }
    });
})
//delete img employee detail  
$("html").on("click", ".fa.fa-minus", function () {
    debugger
    var url = $(this).data("url");
    var id = $(this).data("id");
    $("#delhtml_" + id).html("");
    var DeleteHtml = $("#ES_ImageList").val();
    var arrayimg = DeleteHtml.split("|");
    var savelist = "";
    for (i = 0; i < arrayimg.length; i++) {
        if (url != arrayimg[i]) {
            savelist += arrayimg[i] + "|";
        }
    }
    if (savelist.length > 2) {
        //loai bo phan tu dau & cuoi mang .
        savelist = savelist.substring(0, savelist.length - 1);
    }
    $("#ES_ImageList").val(savelist);
})
//Status
function Employee(id) {
    debugger
    var data = JSON.stringify({
        Id: id
    });
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: "/Admin/AdminEmployee/Save_Status",
        data: data,
        success: function (result) {
            // kết quả trae về e sữa lại 0 vs 1 kt quả và về 0 or 1 nhé chạy đi oke
            if (result == 1) {
                debugger
                $("#color_status_" + id).html("Khóa")
                $("#color_status_" + id).removeClass("btn-success")
                $("#color_status_" + id).addClass("btn-danger")
            } else {
                debugger
                $("#color_status_" + id).html("Kích hoạt")
                $("#color_status_" + id).removeClass("btn-danger")
                $("#color_status_" + id).addClass("btn-success")
            }
        },
        error: function () {
            alert("eurro");
        }
    })
};

//active button edit-delete
$("html").on('click', ".activecheckedit", function () {
    $("#edit_employee").removeClass("disabled");
    $("#delete_employee").removeClass("disabled");
    $("#play_employee").removeClass("disabled");
});
$("html").on('click', "#delete_employee", function () {
    $("#delete_employee").addClass("disabled");
    $("#edit_employee").addClass("disabled");
    $("#play_employee").addClass("disabled");
});

function BrowseServer() {
    debugger
    var finder = new CKFinder();
    //finder.basePath = '../';
    finder.selectActionFunction = SetFileField11;
    finder.popup();
};
function SetFileField11(fileUrl) {
    debugger
    var nhanvien_thuong = $("#show_image2").html("");
    var nhanvien = "<img src='" + fileUrl + "' style='width:80px;height:80px;'>"; 
    nhanvien_thuong.append(nhanvien);
    document.getElementById('E_Image2').value = fileUrl;
};
 


function BrowseServer_staff() {
    debugger
    var finder = new CKFinder();
    finder.selectActionFunction = SetFileField1;
    finder.popup();
};
function SetFileField1(fileUrl) {
    var Data_Set = $("#show_image_staff1").html("");
    var Data = "<img src='" + fileUrl + "' style='width:30px;height:30px;'>";
    Data_Set.append(Data);
    document.getElementById('ES_Image1').value = fileUrl;
};


function BrowseServer_list_staff() {
    var finder = new CKFinder();
    finder.selectActionFunction = SetFileField2;
    finder.popup();
};
function SetFileField2(fileUrl) {
    debugger
    var Data_Set = $("#show_image_staff_list1").html("");
    var ES_ImageList = $("#ES_ImageList1").val();
    if (ES_ImageList == "") {
        ES_ImageList = fileUrl;
    }
    else {
        ES_ImageList = ES_ImageList + "|" + fileUrl;
    }
    document.getElementById('ES_ImageList1').value = ES_ImageList;
    if (ES_ImageList != "") {
        var Url_Image_Array = ES_ImageList.split("|");
        for (var i = 0 ; i < Url_Image_Array.length; i++) {
            var Data = "<img src='" + Url_Image_Array[i] + "' style='width:30px;height:30px;margin-right:3px;'>";
            Data_Set.append(Data);
        };
    };

};
