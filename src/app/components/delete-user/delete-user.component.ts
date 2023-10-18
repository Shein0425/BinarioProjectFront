import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { regUsers } from 'src/app/interface/users';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  constructor(
    private dialogReference: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: regUsers
  ) {}

  ngOnInit(): void {
    // Initialization code can go here if needed.
  }

  // Function to confirm the deletion of a user and close the dialog.
  delete() {
    if (this.dataUser) {
      this.dialogReference.close("Deleted");
    }
  }
}
