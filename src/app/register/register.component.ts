import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  msg!: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.minLength(12)]],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      dateOfbirth: ['', [Validators.required, checkDate]],
      address: ['', Validators.required]
    });
  }

  SubmitForm(form: FormGroup) {
    const formValue = form.value;
    console.log(
      formValue.emailId,
      formValue.password,
      form.get('gender')?.value,
      formValue.dateOfbirth,
      formValue.address
    );
    if (this.registerForm.valid) {
      this.msg = 'Registration Successful';
    } else {
      this.msg = 'Registration Failed';
    }
  }
}



function checkDate(control: FormControl) {
  const currentDate = new Date();
  const givenDate = new Date(control.value);

  // Calculate the date 18 years ago from today
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 18);

  if (givenDate <= minDate) {
    return null;
  } else {
    return {
      dateError: {
        message: "You must be at least 18 years old"
      }
    };
  }
}
