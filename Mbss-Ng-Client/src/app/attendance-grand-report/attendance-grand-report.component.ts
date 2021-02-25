import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { TeacherService } from '../teacher.service';
import { AuthService } from '../auth.service';
import { StudentCountsInLevel } from '../interfaces/TeachersInfo';

@Component({
  selector: 'app-attendance-grand-report',
  templateUrl: './attendance-grand-report.component.html',
  styleUrls: ['./attendance-grand-report.component.css']
})
export class AttendanceGrandReportComponent implements OnInit {

  //attendanceCounts: StudentCountsInLevel[];
  attendanceInfo;
  filteredKeys;
  
  constructor(private service: StudentsService
    , private tchrSvc: TeacherService
    , public authSvc: AuthService) { }

  ngOnInit() {

    var lvlId = this.authSvc.getTchrLevelID;

    // get header column names 
    this.tchrSvc.GetHeaderForAttendanceReportByLevel(lvlId).subscribe((data) => {
      this.filteredKeys = data;// (data as StudentCountsInLevel[]);
    }, error => console.log(error));

    // get actual report data
    this.tchrSvc.GetAttendanceReportByLevel(lvlId).subscribe((data) => {
      this.attendanceInfo = data;// (data as StudentCountsInLevel[]);
      var abc = 4;
    }, error => console.log(error));

  }

}
