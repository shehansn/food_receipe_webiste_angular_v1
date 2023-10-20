import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';
import { MyErrorStateMatcher } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup = new FormGroup({});
  isSubmited: boolean = false;
  formBuilder: FormBuilder = new FormBuilder();
  isErrors: boolean = false;
  isInvalid: boolean = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // this.loginForm = new FormGroup({
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', [Validators.required])//Validators.minLength(8)

    // })

    this.registerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),//Validators.minLength(8)
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {
      validators: PasswordsMatchValidator('password', 'confirmPassword')
    }
    )
  }

  get formcontrol() {
    return this.registerForm.controls;
  }

  register() {
    this.isSubmited = true;
    if (this.registerForm.invalid) {
      console.log('invalid reject form', this.registerForm.controls);
      this.isErrors = true;

      return;
    } else {
      this.isErrors = false;

      const fv = this.registerForm.value;

      const user: IUserRegister = {
        firstName: fv.firstName,
        email: fv.email,
        password: fv.password,
        confirmPassword: fv.confirmPassword,
        lastName: fv.lastName,
        mobileNumber: fv.phoneNumber,
        avatar: ''
      };
      console.log('new user', user)
      this.userService.register(user).subscribe((reData) => {
        console.log('register successfull', reData)
      }, error => {
        this.isInvalid = false;
        console.log('register unsuccessfull', error)

      });

      // const email = this.registerForm.get('email')?.value;
      // const password = this.registerForm.get('password')?.value;
      // if (email == null || password == null) {
      //   this.isErrors = true;
      // } else {
      //   const login: IUserLogin = {
      //     email: email,
      //     password: password
      //   }
      //   this.isErrors = false;

      //   this.userService.login(login).subscribe((reData) => {
      //     console.log('login successfull', reData)
      //   }, error => {
      //     this.isInvalid=false;
      //     console.log('login unsuccessfull', error)

      //   });
      // }
    }
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();


  navigateToSignup() {

  }

}
