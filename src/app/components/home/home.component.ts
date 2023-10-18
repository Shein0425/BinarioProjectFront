import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { regUsers } from 'src/app/interface/users';
import { Users } from 'src/app/interface/users';
import { UsersService } from 'src/app/services/users.service';
import { AddEditUserComponent } from 'src/app/components/add-edit-user/add-edit-user.component'
import { DeleteUserComponent } from 'src/app/components/delete-user/delete-user.component';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'FirstName', 'LastName', 'Email', 'Action'];
  dataSource = new MatTableDataSource<Users>();

  constructor(
    private _usersService: UsersService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Initialize the component and display the user list.
    this.displayUsers();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // Set up the paginator for the data source.
    this.dataSource.paginator = this.paginator;
  }

  // Apply filtering to the data source based on user input.
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Open the dialog to create a new user.
  newUser() {
    this.dialog.open(AddEditUserComponent, {
      disableClose: true,
      width: "300px"
    }).afterClosed().subscribe(result => {
      if (result === "Created") {
        this.displayUsers();
      }
    });
  }

  // Display a snack bar notification.
  showAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  // Open the dialog to delete a user.
  deleteUser(dataUser: regUsers) {
    this.dialog.open(DeleteUserComponent, {
      disableClose: true,
      data: dataUser
    }).afterClosed().subscribe(result => {
      if (result === "Deleted") {
        this._usersService.delete(dataUser.idusers).subscribe({
          next: (data) => {
            this.showAlert("User deleted successfully", "Success");
            this.displayUsers();
          },
          error: (e) => {
            console.log(e);
          }
        });
      }
    });
  }

  // Log out the user by removing the token from local storage and navigating to the login page.
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Open the dialog to edit a user.
  editUser(dataUser: regUsers) {
    this.dialog.open(AddEditUserComponent, {
      disableClose: true,
      width: "300px",
      data: dataUser
    }).afterClosed().subscribe(result => {
      if (result === "Updated") {
        this.displayUsers();
      }
    });
  }

  // Display the list of users.
  displayUsers() {
    this._usersService.getList().subscribe({
      next: (data: any) => {
        console.log(data.result);
        this.dataSource = new MatTableDataSource(data.result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator.pageSize = 5;
      },
      error: (e) => { }
    });
  }
}
