import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppSettings} from './appSettings';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  baseUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseUrl = AppSettings.WEB_API_ENDPOINT + 'api/';
  }

  getCurrSessionStudentsInfo(){

    //console.log(this.baseUrl + 'Students');
    return this.http.get(this.baseUrl + 'Student/GetCurrentSessionStudentsInfo');

  }

  getAllStudentsInfo(){

    //console.log(this.baseUrl + 'Students');
    return this.http.get(this.baseUrl + 'Student/GetAllStudentsInfo');

  }
  
  getStudentInfoForLevels(lvlId: number){
    return this.http.get(this.baseUrl + 'Student/GetStudentInfoForLevels?levelID=' + lvlId);
  }

  StudentToLevelMapping(stdntToLvlMpng){
    return this.http.post(this.baseUrl + 'Student/PostStudentLevelMappings', stdntToLvlMpng);

  }

  getStudentAttndncInfoForThisLevel(lvlId: number, tday){//GetStudentAttndncForThisLevel
    return this.http.get(this.baseUrl + 'Student/GetStudentInfoForThisLevel?levelID=' + lvlId + '&dt=' + tday);
  }

  takeStudentAttendance(stdntAttndnceInfo){
    return this.http.post(this.baseUrl + 'Student/PostStudentAttendance', stdntAttndnceInfo);

  }

  getSundayDates(){
    return this.http.get(this.baseUrl + 'Student/GetSundayDates');
  }


}
