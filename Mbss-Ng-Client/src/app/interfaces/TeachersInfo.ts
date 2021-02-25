export interface TeachersInfo{
    TeacherID: number;
    TeacherName: string;
    TeacherAddress: string;
    TeacherContactNo: string;
    TeacherEmail: string;
    DateAdded: string;//datetime
    DateModified: string;//datetime
    AddedBy: string;
    ModifiedBy: string; 

}

export interface StudentCountsInLevel{
    LevelID: number;
    Level: string;
    NumberOfStudents: number;
    AttTaken: string;
}