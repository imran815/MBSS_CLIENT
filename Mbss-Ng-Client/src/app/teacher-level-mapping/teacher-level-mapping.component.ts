import { Component, OnInit } from '@angular/core';
//import {MatSelectModule} from '@angular/material/select';
import {FormControl, FormGroup} from '@angular/forms';
import { TeacherService } from '../teacher.service';
import { TeachersInfo } from '../interfaces/TeachersInfo';
import { TeacherToLevelMpng } from '../interfaces/TeacherToLevelMpng';
import { AuthService } from '../auth.service';


export interface LevelsWithTeacherName {
  LevelID: number;
  LevelRank: string;
  TeacherNames: string;
}

@Component({
  selector: 'app-teacher-level-mapping',
  templateUrl: './teacher-level-mapping.component.html',
  styleUrls: ['./teacher-level-mapping.component.css']
})
export class TeacherLevelMappingComponent implements OnInit {

  levelsControl = new FormControl('', []);
  levelsInfo;
  teachersInfo;
  svcTchrIds: number[];
  teachersInfoSelIdxs: number[] = [];
  


  constructor(private service: TeacherService, public authSvc: AuthService) { }

  entryForm = new FormGroup({
    levelsControl: new FormControl(''),
    LevelID: new FormControl('')
  })

  ngOnInit() {

    this.service.GetLevelsWithTeachersInfo().subscribe((data) => {
      //this.levelsInfo = new MatTableDataSource<TeachersInfo>(data as TeachersInfo[]);
      this.levelsInfo = (data as LevelsWithTeacherName[]);
      //console.log(this.levelsInfo);
    }, error => console.log(error));


    // Refresh teachers checkboxes
    this.service.getAllTeachers().subscribe( data => {
      this.teachersInfo = (data as TeachersInfo[]);
      for(var i=0;i<this.teachersInfo.length;i++){
        this.teachersInfo[i].selected = false;
      }
    }, error => console.log(error));
    


  }

  onLevelSelection() {

    if (this.levelsControl.value != undefined) {

      this.teachersInfoSelIdxs=[]; //reset indexes

      this.service.GetAllTeacherIDs(this.levelsControl.value.LevelID).subscribe((data) => {

        this.svcTchrIds = (data as number[]).sort((n1,n2) => n1 - n2);

        this.teachersInfo.forEach(function(val) {
          val['selected'] = false;
        });

        var a = 0;
        // search in json obj
        for (var i=0;i<this.teachersInfo.length;i++) {
          var newProp = 'selected';
          if (a < this.svcTchrIds.length && this.svcTchrIds[a] == this.teachersInfo[i].TeacherID)
          {
            this.teachersInfo[i][newProp] = true;
            this.teachersInfoSelIdxs.push(i);
            a++;
          }
          else
            this.teachersInfo[i][newProp] = false;
        }
      }, error => console.log(error));

    }
    else{
      for(var i=0;i<this.teachersInfoSelIdxs.length;i++){
        this.teachersInfo[this.teachersInfoSelIdxs[i]].selected = false;
      }
    }
  }
  
  onSelection(e, v) {
    //debugger;
    this.svcTchrIds = [];
    for(let a of v) {
      this.svcTchrIds.push(a.value);
    }
  }

  onSubmit() {

    const tchrToLvlMpngObj: TeacherToLevelMpng = {
      LevelID: this.levelsControl.value.LevelID,
      UserName: this.authSvc.getUserName,//here current logged in user name comes
      TeacherIDs: this.svcTchrIds
    };

    this.service.TeacherToLevelMapping(tchrToLvlMpngObj).subscribe(data => {
      if (data == "TLM saved") {
        alert("Mapping applied!");
      }
    });

  }


}
