import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppSettings} from './appSettings';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  baseUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseUrl = AppSettings.WEB_API_ENDPOINT + 'api/';
  }

  getAllTeachers(){

    //console.log(this.baseUrl + 'Students');
    return this.http.get(this.baseUrl + 'Teacher/GetAllTeachers');

  }

  GetAllLevels(){

    return this.http.get(this.baseUrl + 'Teacher/GetAllLevels');

  }

  GetLevelsWithTeachersInfo(){
    return this.http.get(this.baseUrl + 'Teacher/GetLevelsWithTeachersInfo');
  }

  GetAllTeacherIDs(lvlId){

    return this.http.get(this.baseUrl + 'Teacher/GetAllTeacherIDs?levelid=' + lvlId);

  }

  TeacherToLevelMapping(tchrToLvlMpng){
    return this.http.post(this.baseUrl + 'Teacher/PostTeacherLevelMappings', tchrToLvlMpng);

  }

  GetLevelInfoByLevelID(lvlId:number){
    return this.http.get(this.baseUrl + 'Teacher/GetLevelInfoByLevelID?levelid=' + lvlId);
  }

  GetAttndnceCountsByDt(tday) {
    return this.http.get(this.baseUrl + 'Teacher/GetStudentsCounts?date=' + tday);
  }

  GetAttendanceReportByLevel(lvlId) {
    return this.http.get(this.baseUrl + 'Teacher/GetStudentsAttendanceReportByLevel?lvlId=' + lvlId);
  }

  GetHeaderForAttendanceReportByLevel(lvlId) {
    return this.http.get(this.baseUrl + 'Teacher/GetAttendanceDatesForAttReportByLevel?lvlId=' + lvlId);
  }

}
