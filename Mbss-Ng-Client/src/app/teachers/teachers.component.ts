import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { TeachersInfo } from '../interfaces/TeachersInfo';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  teachersdata;

  displayedColumns: string[] = ['TeacherID','TeacherName','TeacherContactNo','TeacherEmail'];

  constructor(private service: TeacherService, public authSvc: AuthService) { }

  ngOnInit() {
    var result = null;
    //result = this.service.getAllStudents();
    result = this.service.getAllTeachers().subscribe((data) => {
      this.teachersdata = new MatTableDataSource<TeachersInfo>(data as TeachersInfo[]);
      //this.teachersdata.paginator = this.paginator;
    }, error => console.log(error));

  }

  applyFilter(filterValue: string) {
    this.teachersdata.filter = filterValue.trim().toLowerCase();
  }

}
