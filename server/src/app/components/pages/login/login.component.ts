import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/services/user.service';
import { IUserLogin } from 'src/app/shared/interfaces/IUserLogin';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup=new FormGroup({ });
  isSubmited: boolean = false;
  formBuilder: FormBuilder=new FormBuilder();
  isErrors: boolean = false;
  isInvalid:boolean=false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // this.loginForm = new FormGroup({
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', [Validators.required])//Validators.minLength(8)

    // })

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])//Validators.minLength(8)

    }
    )
  }

  Login() {
    this.isSubmited = true;
    if (this.loginForm.invalid) {
      console.log('invalid reject form', this.loginForm.controls);
      this.isErrors = true;

      return;
    } else {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      if (email == null || password == null) {
        this.isErrors = true;
      } else {
        const login: IUserLogin = {
          email: email,
          password: password
        }
        this.isErrors = false;

        this.userService.login(login).subscribe((reData) => {
          console.log('login successfull', reData)
        }, error => {
          this.isInvalid=false;
          console.log('login unsuccessfull', error)

        });
      }
    }
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  loginFormControl() {
    return this.loginForm.value
  }
  navigateToSignup(){

  }
}
