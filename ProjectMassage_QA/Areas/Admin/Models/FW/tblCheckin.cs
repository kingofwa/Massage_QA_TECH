//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ProjectMassage_QA.Areas.Admin.Models.FW
{
    using System;
    using System.Collections.Generic;
    
    public partial class tblCheckin
    {
        public int Id { get; set; }
        public Nullable<System.DateTime> FirtDayCheckin { get; set; }
        public string FirtHourCheckin { get; set; }
        public Nullable<System.DateTime> LastDayCheckin { get; set; }
        public string LastHourCheckin { get; set; }
        public string CategoryCheckin { get; set; }
        public string ServiceCheckin { get; set; }
        public string EmployeeStaffCheckin { get; set; }
        public string NoteCheckin { get; set; }
        public string ID_RoomCheckin { get; set; }
    }
}
