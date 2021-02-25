import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editProfForm: FormGroup;

  constructor(private fb: FormBuilder,
    private service: AuthService,
    private router: Router) { 

      this.editProfForm = fb.group({
        userName: [this.service.getUserName, Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      }, {validator: matchingFields('password', 'confirmPassword')})
  

    }

    onSubmit(){
      delete this.editProfForm.value.confirmPassword;
      this.service.changepwd(this.editProfForm.value).subscribe((data:any) => {
        //console.log(data);
        // localStorage.setItem('userName', data.UserName);
        // localStorage.setItem('token_value', data.Token);
        alert('Password changed successfully.');
        this.router.navigate(['/']);
      },
      (error) => alert(error.error.Message)
      )
    }

    cancel(){
      this.router.navigate(['/']);
    }

  ngOnInit() {
  }

}

function matchingFields(field1, field2){
  return form => {
    if(form.controls[field1].value !== form.controls[field2].value)
     return {matchingFields: true}
  }
}
