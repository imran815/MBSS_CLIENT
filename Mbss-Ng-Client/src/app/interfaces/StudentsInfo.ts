export interface StudentsInfo {
    //public int StudentID { get; set; }
    ParentID: number;
    StudentNames: string;
    //public DateTime StudentDOB { get; set; }
    //public DateTime DateAdded { get; set; }
    //public DateTime? DateModified { get; set; }
    //public string AddedBy { get; set; }
    //public string ModifiedBy { get; set; }
    ParentNames: string;
    ParentContacts: string;
    ParentEmails: string;
    ExemptFromFee: string;
    DateRegistered: string;
}
