import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent implements OnInit {

  pgTitle: string;
  pgDesc: string;
  btnYes: string;
  btnNo: string;

  constructor(private dialogRef: MatDialogRef<CustomDialogComponent>,
    @Inject(MAT_DIALOG_DATA){ PgeTitle, Desc, BtnY, BtnN}) {

      this.pgTitle = PgeTitle;
      this.pgDesc = Desc;
      this.btnYes = BtnY;
      this.btnNo = BtnN;

    }

  ngOnInit() {
  }

  Yes(){
    this.dialogRef.close("yes");
  }

  No(){
    this.dialogRef.close("no");
  }

}
