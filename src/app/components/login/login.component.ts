import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/interface/users';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _usersService: UsersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Initialization code can go here if needed.
  }

  // Function to handle the login process.
  login() {
    if (this.email === undefined || this.password === undefined) {
      this.toastr.error('All fields are required', 'Error');
      return;
    }

    // Create a user object with email and password for login.
    const user: Login = {
      email: this.email,
      password: this.password
    }
    this.loading = true;
    
    // Call the login service and handle the response.
    this._usersService.login(user).subscribe({
      next: (data: any) => {
        if (data.errors === 'False' && data.token) {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/home']);
        } else if (data.errors === 'True' && data.message === 'User not found') {
          this.toastr.error('User not found', 'Error');
          this.loading = false;
        } else if (data.errors === 'True' && data.message === 'Invalid password') {
          this.toastr.error('Incorrect password', 'Error');
          this.loading = false;
        } else {
          this.toastr.error('An error occurred, please contact the administrator', 'Error');
          this.loading = false;
        }
      },
      error: (e: HttpErrorResponse) => {
        this.msjError(e);
        this.loading = false;
      }
    });
  }

  // Function to handle and display error messages using Toastr.
  msjError(e: HttpErrorResponse) {
    if (e.error.message) {
      this.toastr.error(e.error.message, 'Error');
    } else {
      this.toastr.error('An error occurred, please contact the administrator.', 'Error');
    }
  }
}
