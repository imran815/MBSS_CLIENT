import { Component, OnInit, ViewChild } from '@angular/core';

//materials
import {MatTableDataSource} from '@angular/material/table';
//import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginator} from '@angular/material/paginator';
import { StudentsService } from '../students.service';
import { TeacherService } from '../teacher.service';
//import { StudentInfoForLevel } from '../interfaces/StudentInfoForLevel';
import { StudentToLevelMpng } from '../interfaces/StudentToLevelMpng';
import { MatDialogRef, MatDialog } from '@angular/material';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { AuthService } from '../auth.service';
import { StudentAttendanceInfo } from '../interfaces/StudentAttendanceInfo';
import { StudentAttendanceInGet } from '../interfaces/StudentAttendanceInfoGet';
import { TeachersInfo } from '../interfaces/TeachersInfo';

export interface LevelsWithTeacherName {
  LevelID: number;
  LevelRank: string;
  TeacherNames: string;
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  selectedDt: string;
  alldates: string[];
  teacherLevelId: number;
  studentsData: MatTableDataSource<StudentAttendanceInGet>;
  studentIds: number[];
  matDialogRef: MatDialogRef<CustomDialogComponent>;
  mtDialgRetVal: string;
  totalStuds:number;
  levels: LevelsWithTeacherName[];//MatTableDataSource<TeachersInfo>;
  selectedLvlId: string;

  displayedColumns: string[] = ['Actions','StudentName','ParentNames','ParentEmails'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service: StudentsService, private tchrSvc: TeacherService
    , public dialog: MatDialog, public authSvc: AuthService) { }

  ngOnInit() {

    this.selectedDt = new Date().toLocaleDateString();
    //this.alldates = ['8/18/2019','8/25/2019','9/1/2019','9/8/2019','9/15/2019','9/22/2019','9/29/2019'];

    this.service.getSundayDates().subscribe(data => {
      this.alldates = data as string[];
    }, error => console.log(error));

    this.studentIds = [];
    var result = null;
    this.mtDialgRetVal = '';
    this.totalStuds = 0;
    
    this.teacherLevelId = Number(this.authSvc.getTchrLevelID); //get from teacher's login info


    // means not teachers has logged in
    if(this.teacherLevelId == 0){
      //
      //result = 
      this.tchrSvc.GetLevelsWithTeachersInfo().subscribe((data) => {
        this.levels = (data as LevelsWithTeacherName[]);
      }, error => console.log(error));

    }

    result = this.service.getStudentAttndncInfoForThisLevel(this.teacherLevelId, this.selectedDt).subscribe((data) => {
      this.studentsData = new MatTableDataSource<StudentAttendanceInGet>(data as StudentAttendanceInGet[]);

      for (var i=0;i<this.studentsData.data.length;i++) {
        if(this.studentsData.data[i].IsPresent)
        {
          //this.studentsData.data[i].IsPresent = true;
          this.arrayPush(this.studentsData.data[i].StudentID, this.studentsData.data[i].StudentName);
        }
      }

      this.studentsData.paginator = this.paginator;

    }, error => console.log(error));
  }

  applyFilter(filterValue: string) {
    this.studentsData.filter = filterValue.trim().toLowerCase();
  }

  saveStudIds(e, elem){
    //debugger;
    var v: number = elem.StudentID;
    var sN = elem.StudentName;
    if(e.checked){
      
      const idx = this.studentIds.indexOf(v * -1, 0);
      if (idx > -1) {
        this.studentIds.splice(idx, 1);
        //this.arrayPush(v * -1, sN);
      }
      //else
      this.arrayPush(v, sN);

      elem.IsPresent = true;
    }
    else{
      debugger;
      // uncheck student, remove from students array
      const idx = this.studentIds.indexOf(v, 0);
      if (idx > -1) {
        this.studentIds.splice(idx, 1);
        this.arrayPush(v * -1, sN);
        elem.IsPresent = false;
      }
    }

  }

  arrayPush(stdId, stdName){
    if(this.studentIds.indexOf(stdId) == -1)
      this.studentIds.push(stdId);
      console.log(this.studentIds);
      this.totalStuds = this.totalStudents();
  }

  totalStudents(){
    var n:number = 0;
    this.studentIds.some(v => {
      if(v > -1){
        n+=1;
      }
    });
    return n;
  }

  chngAttDt(){
    // console.log(e);
    console.log(this);

    this.totalStuds = 0;
    var localLevelID = 0;
    localLevelID = Number(this.teacherLevelId > 0 ? this.teacherLevelId : this.selectedLvlId);

    this.service.getStudentAttndncInfoForThisLevel(localLevelID, this.selectedDt).subscribe((data) => {
      this.studentsData = new MatTableDataSource<StudentAttendanceInGet>(data as StudentAttendanceInGet[]);

      this.studentIds = [];

      debugger;
      for (var i=0;i<this.studentsData.data.length;i++) {
        if(this.studentsData.data[i].IsPresent)
        {
          //this.studentsData.data[i].IsPresent = true;
          this.arrayPush(this.studentsData.data[i].StudentID, this.studentsData.data[i].StudentName);
        }
      }
      
      this.studentsData.paginator = this.paginator;

    }, error => console.log(error));

  }

  changeLevel(){
    this.totalStuds = 0;
    this.service.getStudentAttndncInfoForThisLevel(Number(this.selectedLvlId), this.selectedDt)
      .subscribe((data) => {
      this.studentsData = new MatTableDataSource<StudentAttendanceInGet>(data as StudentAttendanceInGet[]);

      this.studentIds = [];

      debugger;
      for (var i=0;i<this.studentsData.data.length;i++) {
        if(this.studentsData.data[i].IsPresent)
        {
          //this.studentsData.data[i].IsPresent = true;
          this.arrayPush(this.studentsData.data[i].StudentID, this.studentsData.data[i].StudentName);
        }
      }
      
      this.studentsData.paginator = this.paginator;

    }, error => console.log(error));

  }


  takeAttndnce(){

    var localLevelID = Number(this.teacherLevelId > 0 ? this.teacherLevelId : this.selectedLvlId);
    const stdntAttendanceObj: StudentAttendanceInfo = {
      LevelID: localLevelID,
      UserName: this.authSvc.getUserName,//here current logged in user name comes
      StudentIDs: this.studentIds,
      AttendanceDate: this.selectedDt
    };


    this.service.takeStudentAttendance(stdntAttendanceObj).subscribe(data => {
      if (data == "success") {
        
        //alert("Mapping applied!");
        this.matDialogRef = this.dialog.open(CustomDialogComponent,{
          //sending dialog the data
          data: {
            PgeTitle: 'Info',
            Desc: 'Students attendance. Done!',
            BtnY: '', BtnN: ''
          }
        });
        
        //getting data from dialog
        this.matDialogRef.afterClosed().subscribe(name => {
          this.mtDialgRetVal = name;
        })


      }
    });

  }


}
