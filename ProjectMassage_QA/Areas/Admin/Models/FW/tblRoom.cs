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
    
    public partial class tblRoom
    {
        public int Id { get; set; }
        public Nullable<int> CategoryId { get; set; }
        public string R_Name { get; set; }
        public Nullable<bool> R_Active { get; set; }
        public string R_Note { get; set; }
        public Nullable<int> R_Status { get; set; }
    
        public virtual tblCategory tblCategory { get; set; }
    }
}
