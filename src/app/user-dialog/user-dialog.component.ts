import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../add-user/user';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData) { }

  cancel(): void {
    this.dialogRef.close();
  }
}

export interface UserDialogData {
    user: Partial<User>;
    enableDelete: boolean;
  }
  
  export interface UserDialogResult {
    user: User;
    delete?: boolean;
  }
