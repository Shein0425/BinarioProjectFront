import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { regUsers } from 'src/app/interface/users';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit{
  constructor(
    private dialogReference: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: regUsers
  ){

  }

  ngOnInit(): void {
    
  }

  delete(){

    if(this.dataUser){
      this.dialogReference.close("Deleted")
    }
  }
}
