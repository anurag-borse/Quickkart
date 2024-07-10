import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IReview } from '../quickKart-interfaces/review';
import { UserService } from '../quickKart-services/user-service/user.service';

@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.css']
})
export class UpdateReviewComponent implements OnInit {
  review: IReview = {
    emailId: '',
    productId: '',
    productName: '',
    reviewRating: 0,
    reviewComments: ''
  };
  emailId: string = '';
  status: boolean = false;
  errorMsg: string = '';

  constructor(private route: ActivatedRoute, private _userService: UserService, private router: Router) { }

  ngOnInit() {
    this.emailId = sessionStorage.getItem("userName") || '';
    if (this.emailId === '') {
      this.router.navigate(['/login']);
      return;
    }

    this.review.emailId = this.emailId;
    this.review.productId = this.route.snapshot.params['productId'] || '';
    this.review.productName = this.route.snapshot.params['productName'] || '';
    this.review.reviewRating = parseInt(this.route.snapshot.params['reviewRating'], 10) || 1;
    this.review.reviewComments = this.route.snapshot.params['reviewComments'] || '';
  }

  updateReview() {
 
    this._userService.updateReview(this.review).subscribe(

      responseUpdateReviewStatus => {
        this.status = responseUpdateReviewStatus;
        if (this.status) {
          alert("Review updated successfully.");
          this.router.navigate(['/rating']);
        } else {
          alert("Some error occurred, please try after some time. 1");
          this.router.navigate(['/rating']);
        }
      },
      responseUpdateReviewError => {
        this.errorMsg = responseUpdateReviewError;
        console.log(this.errorMsg);
        alert("Some error occurred, please try after some time. 2");
        this.router.navigate(['/viewRatings']);
      },
      () => console.log("UpdateReview method executed successfully.")
    );
  }
}
