import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { regUsers } from 'src/app/interface/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  formUser: FormGroup;
  titleAction: string = "New User";
  buttonAction: string = "Save";
  usersList: regUsers[] = [];

  constructor(
    private dialogReference: MatDialogRef<AddEditUserComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public dataUser: regUsers,
  ) {
    this.formUser = this.fb.group({
      idusers: [''],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
    });

    // Fetch the list of users for reference.
    this._usersService.getList().subscribe({
      next: (data) => {
        this.usersList = data;
      },
      error: (e) => {}
    });
  }

  // Display a snackbar notification.
  showAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  // Add or edit a user depending on the action.
  addEditUser() {
    console.log(this.formUser.value);

    const model: regUsers = {
      idusers: 0,
      fname: this.formUser.value.fname,
      lname: this.formUser.value.lname,
      email: this.formUser.value.email
    };

    if (this.dataUser == null) {
      // Add a new user.
      this._usersService.add(model).subscribe({
        next: (data) => {
          this.showAlert("User created successfully!", "Success");
          this.dialogReference.close("Created");
        },
        error: (e) => {
          this.showAlert("User not created!", "Error");
        },
      });
    } else {
      // Update an existing user.
      this._usersService.update(this.dataUser.idusers, model).subscribe({
        next: (data) => {
          this.showAlert("User updated successfully!", "Success");
          this.dialogReference.close("Updated");
        },
        error: (e) => {
          this.showAlert("User not updated!", "Error");
        },
      });
    }
  }

  ngOnInit(): void {
    if (this.dataUser) {
      // Populate form fields with existing user data for editing.
      this.formUser.patchValue({
        idusers: this.dataUser.idusers,
        fname: this.dataUser.fname,
        lname: this.dataUser.lname,
        email: this.dataUser.email
      });
      this.titleAction = "Update User";
      this.buttonAction = "Update";
    }
  }
}
