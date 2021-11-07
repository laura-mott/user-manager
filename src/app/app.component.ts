import { Component, EventEmitter, Output, Input } from '@angular/core';
import { User } from './add-user/user';
import { Timestamp } from '@angular/fire/firestore/lite';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserDialogComponent, UserDialogResult } from './user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
    currentUsers: Observable<any>;

    users = this.store.collection('users').valueChanges({ idField: 'id' }) as Observable<User[]>;

    searchText = '';
    usersToSearch : User[] = [];
    usersToDisplay : User[] = [];
    nameSearch : boolean = false;
    roleSearch : boolean = false;

    @Output() valueChange = new EventEmitter();
    @Input() user: User | null = null;
    @Input() name: String = ''

    constructor(private store: AngularFirestore, private dialog: MatDialog) {
        this.currentUsers = store.collection('users').valueChanges({ idField: 'id' });
        this.usersToSearch = [];
        this.users.forEach((element: User[]) => {
                element.forEach((user : User) => {
                    this.usersToSearch.indexOf(user) === -1? this.usersToSearch.push(user) : null;
                })
            });
        this.usersToDisplay = this.usersToSearch;
    }

    isNameSearch(event :any){
        if(event.target.checked){
            this.nameSearch = true;
        }else{
            this.nameSearch = false;
        }
    }
    isRoleSearch(event :any){
        if(event.target.checked){
            this.roleSearch = true;
        }else{
            this.roleSearch = false
        }
    }
    search(){
        if(this.searchText !== ''){
            this.usersToDisplay = [];
            this.usersToSearch.filter(it => {
                if(this.nameSearch && it.name.toLocaleLowerCase().includes(this.searchText)){
                    this.usersToDisplay.indexOf(it) === -1? this.usersToDisplay.push(it) : null;
                }
                if(this.roleSearch && it.role.toLocaleLowerCase().includes(this.searchText)){
                    this.usersToDisplay.indexOf(it) === -1? this.usersToDisplay.push(it) : null;
                }
            });
        }else{
            this.usersToDisplay = this.usersToSearch;
        }

    }

    newUser(): void {
        const dialogRef = this.dialog.open(UserDialogComponent, {
            width: '270px',
            data: {
                user: {}
            },
        });
        dialogRef
            .afterClosed()
            .subscribe((result: UserDialogResult) => {
            if (!result) {
                return;
            }
            result.user.timeStamp = Timestamp.now().toDate();
            this.store.collection('users').add(result.user);
            });
    }
}


