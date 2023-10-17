import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { regUsers } from './interface/users';
import { Users } from './interface/users';
import { UsersService } from './services/users.service';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component'
import { DeleteUserComponent } from './components/delete-user/delete-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'FirstName', 'LastName', 'Email', 'Action'];
  dataSource = new MatTableDataSource<Users>();


  constructor(
    private _usersService: UsersService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.displayUsers();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
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
  showAlert(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition:"end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  deleteUser(dataUser:regUsers){
    this.dialog.open(DeleteUserComponent,{
      disableClose: true,
      data:dataUser
    }).afterClosed().subscribe(result => {
      if (result === "Deleted") {
        this._usersService.delete(dataUser.idusers).subscribe({
          next:(data)=> {
            this.showAlert("User delete successfuly", "Success");
            this.displayUsers();
          },error:(e)=>{console.log(e)}
        
        });
      }
    });
  }

  editUser(dataUser:regUsers) {
    this.dialog.open(AddEditUserComponent,{
      disableClose: true,
      width: "300px",
      data:dataUser
    }).afterClosed().subscribe(result => {
      if (result === "Updated") {
        this.displayUsers();
      }
    });
  }

  displayUsers() {
    this._usersService.getList().subscribe({
      next: (data: any) => {
        console.log(data.result);
        this.dataSource = new MatTableDataSource(data.result)
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator.pageSize = 5;
      }, error: (e) => { }
    });
  }

}


