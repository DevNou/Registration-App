import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {


  userDetail: any;
  public UserID!: number;


  constructor(private acticatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.acticatedRoute.params.subscribe(val=>{
      this.UserID = val['id'];
      this.fetchUserDetails(this.UserID);
    })
  }

fetchUserDetails(userID:number){
  this.api.getRegisteredUserId(userID)
  .subscribe(res=>{
    this.userDetail = res;
    console.log(this.userDetail);
    
  })
}

}
