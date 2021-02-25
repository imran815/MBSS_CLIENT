import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentsInfo } from '../interfaces/StudentsInfo';
import { StudentsService } from '../students.service';

//materials
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-curr-sess-students-info',
  templateUrl: './curr-sess-students-info.component.html',
  styleUrls: ['./curr-sess-students-info.component.css']
})
export class CurrSessStudentsInfoComponent implements OnInit {

  //public students: StudentsInfo[];
  studentsData: MatTableDataSource<StudentsInfo>;

  displayedColumns: string[] = ['ParentID','StudentNames','ParentNames','ParentContacts','ParentEmails'
  /*,'ExemptFromFee', 'DateRegistered'*/];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service: StudentsService, public authSvc: AuthService){}

  ngOnInit() {
    var result = null;
    //result = this.service.getAllStudents();
    result = this.service.getCurrSessionStudentsInfo().subscribe((data) => {
      this.studentsData = new MatTableDataSource<StudentsInfo>(data as StudentsInfo[]);
      this.studentsData.paginator = this.paginator;
    }, error => console.log(error));

  }

  applyFilter(filterValue: string) {
    this.studentsData.filter = filterValue.trim().toLowerCase();
  }

}
