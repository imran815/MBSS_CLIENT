import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { StudentCountsInLevel } from '../interfaces/TeachersInfo';
import { LevelInfo } from '../interfaces/LevelToStudentsMpng';
import { AuthService } from '../auth.service';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-attendance-counts',
  templateUrl: './attendance-counts.component.html',
  styleUrls: ['./attendance-counts.component.css']
})
export class AttendanceCountsComponent implements OnInit {

  attendanceCounts: StudentCountsInLevel[];
  //levelInfo: LevelInfo[];
  //fkID:number;
  selectedDt: string;
  alldates: string[];
  
  constructor(private service: StudentsService, private tchrSvc: TeacherService, public authSvc: AuthService) { }

  ngOnInit() {
    
    this.selectedDt = new Date().toLocaleDateString();
    //this.selectedDt = '12/1/2019';

    // get all levels
    this.tchrSvc.GetAttndnceCountsByDt(this.selectedDt).subscribe((data) => {
      this.attendanceCounts = (data as StudentCountsInLevel[]);
    }, error => console.log(error));

    this.service.getSundayDates().subscribe(data => {
      this.alldates = data as string[];
    }, error => console.log(error));

    //this.fkID = 2;

  }

  chngAttDt(){
    // console.log(e);
    //console.log(this);

    // this.totalStuds = 0;
    // var localLevelID = 0;
    // localLevelID = Number(this.teacherLevelId > 0 ? this.teacherLevelId : this.selectedLvlId);

    this.tchrSvc.GetAttndnceCountsByDt(this.selectedDt).subscribe((data) => {
      this.attendanceCounts = (data as StudentCountsInLevel[]);
    }, error => console.log(error));

  }

}
