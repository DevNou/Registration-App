import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
      "Enegy ",
      "Fitness",
      "BodyBuilding"
    ];

  public registerForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

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
      package: ['', Validators.required],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: [''],
    });
  }
    submit(){
      console.log(this.registerForm.value)
    };
  }