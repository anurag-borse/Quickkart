import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm!: FormGroup;
  msg!: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, gmailValidator()]],
      message: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
    });
  }

  SubmitForm(form: FormGroup) {
  
    const formValue = form.value;
    console.log(
      formValue.name,
      formValue.email,
      formValue.message
    );
    if (this.feedbackForm.valid) {
      this.msg = 'Feedback Sent Successfully';
    } else {
      this.msg = 'Feedback Sent Failed';
    }
  }
}

function gmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    const valid = email.endsWith('@gmail.com');
    return valid ? null : { gmail: { message: 'Email must end with @gmail.com' } };
  };
}
