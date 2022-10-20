import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../shared/custom.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;
  constructor(private formbuilder : FormBuilder, private http : HttpClient,private router:Router) { }

  ngOnInit(): void {


    // v1 Validation within Component and Html

    this.signupForm = this.formbuilder.group({
      name:['' ,[CustomValidators.nameValid()]],
      mobile:['',[CustomValidators.mobileValidation()]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]
    })
    // v1 Validation within Component and Html


  }
  signUp(){
    this.http.post<any>("http://localhost:3000/users",this.signupForm.value)
    .subscribe(res=>{
      alert("SignUp Successfully");
      this.signupForm.reset();
      this.router.navigate(['login']);
    },err=>{
      alert('Somthing went wrong.')
    })
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }
}
