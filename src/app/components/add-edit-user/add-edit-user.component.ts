import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { regUsers } from 'src/app/interface/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  formUser: FormGroup;
  titleAction: string = "New User"
  buttonAction: string = "Save"
  usersList: regUsers[] = [];


  constructor(
    private dialogReference: MatDialogRef<AddEditUserComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public dataUser: regUsers

  ) {
    this.formUser = this.fb.group({
      idusers: [''],
      fname: ['',Validators.required],
      lname: ['',Validators.required],
      email: ['',Validators.required],
    })

    this._usersService.getList().subscribe({
      next:(data)=>{
        this.usersList = data;
      },error:(e)=>{}
    })
  }

  showAlert(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition:"end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  addEditUser(){
    console.log(this.formUser.value)

    const model: regUsers = {
      idusers: 0,
      fname: this.formUser.value.fname,
      lname: this.formUser.value.lname,
      email: this.formUser.value.email
    }

    if(this.dataUser == null){
      this._usersService.add(model).subscribe({
        next:(data) => {
          this.showAlert("User created successfully!", "Success");
          this.dialogReference.close("Created");
        },error:(e) => {
          this.showAlert("User not created!","Error")
        },
      })
    }else{
      this._usersService.update(this.dataUser.idusers, model).subscribe({
        next:(data) => {
          this.showAlert("User update successfully!", "Success");
          this.dialogReference.close("Updated");
        },error:(e) => {
          this.showAlert("User not update!","Error")
          
        },
      })
    }

  }

  ngOnInit(): void {
    if(this.dataUser){
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