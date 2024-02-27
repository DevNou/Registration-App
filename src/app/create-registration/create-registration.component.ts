import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';


@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrl: './create-registration.component.scss'
})
export class CreateRegistrationComponent implements OnInit {
  public packages: string[] = ["Monthy", "SixMonth", "Yearly"];
  public genders: string[] = ["Male", "Female"];
  public answer: string[] = ["Yes", "No"];
  public List: string[] =
    [
      "Fat reduction",
      "Improvemed Fitness",
      "Health benefits",
      "Increased Energy Levels",
      "Weight Managment"
    ];

  public registerForm!: FormGroup;
  public userIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(private formBuilder: FormBuilder,private router:Router,private activateRoute: ActivatedRoute, private api: ApiService, private toastService: NgToastService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      weight: ['', Validators.pattern("^[0-9]*$")],
      height: ['', Validators.pattern("^[0-9]*$")],
      bmi: [''],
      bmiResult: [''],
      gender: ['', Validators.required],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: [''],
    });

    this.registerForm.controls['height'].valueChanges.subscribe(Response => {
      this.calculateBmi(Response);
    })

    this.activateRoute.params.subscribe(val => {
      this.userIdToUpdate = val['id'];
      this.api.getRegisteredUserId(this.userIdToUpdate).
        subscribe(res => {
          this.isUpdateActive = true;
          this.fillFormToUpdate(res);

        })
    })
  }
  submit() {
    this.api.postRegistration(this.registerForm.value)
      .subscribe(res => {
        this.toastService.success({ detail: "Success", summary: "Enquiry Added", duration: 3000 });
        this.registerForm.reset();
      })
  }
  update(){
    this.api.updateRegisterUser(this.registerForm.value,this.userIdToUpdate)
    .subscribe(res => {
      this.toastService.success({ detail: "Success", summary: "Enquiry Added", duration: 3000 });
      this.registerForm.reset();
      this.router.navigate(['list'])
    })

  }




  //Method to calculate bmi
  calculateBmi(value: number) {
    const weight = this.registerForm.value.weight;
    const height = value;
    const bmi = weight / (height * height);
    this.registerForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue("Underweight");
        break;
      case (bmi >= 18.5 && bmi < 25):
        this.registerForm.controls['bmiResult'].patchValue("Normal");
        break;
      case (bmi >= 25 && bmi < 30):
        this.registerForm.controls['bmiResult'].patchValue("Overweight");
        break;

      default:
        this.registerForm.controls['bmiResult'].patchValue("Obese");
        break;
    }
  }

  fillFormToUpdate(user: User) {
    this.registerForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      enquiryDate: user.enquiryDate
    })
  }
}