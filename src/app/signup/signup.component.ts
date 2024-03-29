import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;
  isLoggedIn: boolean = false;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      // id:1,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      // role:['']
    })
  }

  signUp() {
    this.isLoggedIn = false;
    this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
      .subscribe(res => {
        alert("Signup Successfull");
        this.signupForm.reset();
        this.router.navigate(['login']);
      })
  }
}
