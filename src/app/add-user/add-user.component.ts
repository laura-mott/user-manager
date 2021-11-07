import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from './user';
import { UserDialogComponent, UserDialogResult } from '../user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore/lite';
import { DeleteUserData, DeleteUsersComponent } from '../delete-users/delete-users.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent{
  @Input() user: User | null = null;
  @Input() name: String = ''
  @Output() edit = new EventEmitter<User>();

  constructor(private dialog: MatDialog, private store : AngularFirestore){ }

  editUser(user: User){
    const dialogRef = this.dialog.open(UserDialogComponent, {
        width: '270px',
        data: {
          user:{
              name:user.name,
              role:user.role
          },
          enableDelete: true,
        },
      });
      dialogRef.afterClosed().subscribe((result: UserDialogResult) => {
        if (!result) {
          return;
        }
        result.user.timeStamp = Timestamp.now().toDate();
        this.store.collection('users').doc(user.id).update(result.user);
    });
    }

  deleteUser(user : User){
    const dialogRef = this.dialog.open(DeleteUsersComponent, {
        width: '270px',
        data: {
          user:{
              name:user.name,
              role:user.role
          },
          enableDelete: true,
        },
      });
      dialogRef.afterClosed().subscribe((result: DeleteUserData) => {
        if (!result) {
          return;
        }
        result.user.timeStamp = Timestamp.now().toDate();
        this.store.collection('users').doc(user.id).delete();
    });
  }
}
