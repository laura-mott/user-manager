import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../add-user/user';
import { UserDialogData } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.scss']
})
export class DeleteUsersComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DeleteUsersComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DeleteUserData) { }
    
    cancel(): void {
        this.dialogRef.close();
    }
    ngOnInit(): void {
    }

}
export interface DeleteUserData {
    user: Partial<User>;
  }
export interface DeleteUserResult {
    user: User;
  }
