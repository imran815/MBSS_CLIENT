import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

//materials
import {MatTableDataSource} from '@angular/material/table';
//import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginator} from '@angular/material/paginator';
import { StudentsService } from '../students.service';
import { TeacherService } from '../teacher.service';
import { StudentInfoForLevel } from '../interfaces/StudentInfoForLevel';
import { StudentToLevelMpng } from '../interfaces/StudentToLevelMpng';
import { MatDialogRef, MatDialog } from '@angular/material';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { AuthService } from '../auth.service';

export interface LevelsWithStudentInfo {
  LevelID: number;
  StudentInfos: StudentInfoForLevel[];
  //TeacherNames: string;
}

@Component({
  selector: 'app-level-student-mapping',
  templateUrl: './level-student-mapping.component.html',
  styleUrls: ['./level-student-mapping.component.css']
})
export class LevelStudentMappingComponent implements OnInit, AfterViewInit, OnDestroy {

  ngAfterViewInit(): void {
    //throw new Error("Method not implemented.");
  }

  studDataLen: number;
  studDataIdx: number;
  teacherLevelId: number;
  levelRankInfo:string;
  levelsInfo;
  studentsData: MatTableDataSource<StudentInfoForLevel>;
  studentIds: number[];
  selStudNames: string[];
  matDialogRef: MatDialogRef<CustomDialogComponent>;
  mtDialgRetVal: string;

  displayedColumns: string[] = ['Actions','StudentName','ParentNames','StudentDOB', 'StudentAge'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service: StudentsService, private tchrservice: TeacherService
    , public dialog: MatDialog, public authSvc: AuthService) { }

  ngOnInit() {
    this.studentIds = [];
    this.selStudNames = [];
    this.studDataIdx = 0;
    var result = null;
    this.mtDialgRetVal = '';
    
    this.teacherLevelId = Number(this.authSvc.getTchrLevelID); //get from teacher's login info
    result = this.service.getStudentInfoForLevels(this.teacherLevelId).subscribe((data) => {
      this.studentsData = new MatTableDataSource<StudentInfoForLevel>(data as StudentInfoForLevel[]);
      this.studDataLen = this.studentsData.data.length;

      for (var i=0;i<this.studentsData.data.length;i++) {
        if(this.studentsData.data[i].LevelID != null){
          this.studentsData.data[i].StudentChecked = true;
          this.arrayPush(this.studentsData.data[i].StudentID, this.studentsData.data[i].StudentName);
  
        }
      }

      this.selStudNames = this.selStudNames.sort();

      this.studentsData.paginator = this.paginator;
    }, error => console.log(error));

    this.tchrservice.GetLevelInfoByLevelID(this.teacherLevelId).subscribe((data:any) => {
      this.levelRankInfo = data.LevelRank;
    });

  }

  applyFilter(filterValue: string) {
    this.studentsData.filter = filterValue.trim().toLowerCase();
  }

  Assign(){

    const stdntToLvlMpngObj: StudentToLevelMpng = {
      LevelID: this.teacherLevelId,
      UserName: this.authSvc.getUserName,//here current logged in user name comes
      StudentIDs: this.studentIds
    };

    this.service.StudentToLevelMapping(stdntToLvlMpngObj).subscribe(data => {
      if (data == "LSM saved") {
        
        //alert("Mapping applied!");
        this.matDialogRef = this.dialog.open(CustomDialogComponent,{
          //sending dialog the data
          data: {
            PgeTitle: 'Info',
            Desc: 'Students assigned. Done!',
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

  saveStudIds(e, elem){
    debugger;
    var v = elem.StudentID;
    var sN = elem.StudentName;
    if(e.checked){
      this.arrayPush(v, sN);
      elem.StudentChecked = true;
    }
    else{
      // uncheck student, remove from students array
      const idx = this.studentIds.indexOf(v, 0);
      if (idx > -1) {
        this.studentIds.splice(idx, 1);
        this.selStudNames.splice(idx, 1);
        elem.StudentChecked = false;
      }
    }

  }

  arrayPush(stdId, stdName){
    if(this.studentIds.indexOf(stdId) == -1)
      this.studentIds.push(stdId);
      this.selStudNames.push(stdName);
      
  }
  
  // chckdForLevel(lvlId, stdId){
    
  //   //if(this.studDataIdx < this.studDataLen)//
  //   if(!this.viewloaded)
  //   {
  //     if(lvlId == undefined){
  //       //console.log(lvlId);
  //       //return false;
  //     }
  //     else{
  //       this.arrayPush(stdId);
  //       return true;
  //     }
  //   }
  // }

  //ngAfterViewInit() 
  ngOnDestroy() {
    
  }


}
