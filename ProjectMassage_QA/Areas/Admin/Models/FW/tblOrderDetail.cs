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
    
    public partial class tblOrderDetail
    {
        public int OrderId { get; set; }
        public int Id_tang { get; set; }
        public int EmployeeId { get; set; }
        public Nullable<double> Money { get; set; }
        public string TypeOder { get; set; }
    
        public virtual tblOrder tblOrder { get; set; }
    }
}