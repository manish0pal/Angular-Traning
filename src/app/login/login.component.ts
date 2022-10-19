import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;
  constructor(private formbuilder : FormBuilder, private http : HttpClient) { }


  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email:[''],
      password:['']
    })
  }

  login(){
    this.http.get<any>("http://localhost:3000/users")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      })

      if(user){
        alert("Login Success")
        this.loginForm.reset();
      }
      else{
        alert("User not found!")
      }
    },err=>{
      alert("Somthing went wrong.");
    })
  }
}
