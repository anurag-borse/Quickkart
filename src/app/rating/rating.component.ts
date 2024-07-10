import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RatingService } from '../quickKart-services/rating-service/rating.service';
import { IRating } from 'src/app/quickKart-interfaces/rating';
import { AuthService } from '../quickKart-services/auth/auth.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  ratings: IRating[] = [];
  showMsgDiv: boolean = false;

  constructor(private ratingService: RatingService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getCurrentUserEmail().subscribe(email => {
      if (email) {
        this.ratingService.getRatings(email).subscribe(
          (data: IRating[]) => {
            this.ratings = data;
            this.showMsgDiv = this.ratings.length === 0;
          },
          (error) => {
            console.error(error);
            this.showMsgDiv = true;
          }
        );
      }
    });
  }

  getStars(rating: number): any[] {
    return Array(rating).fill(0);
  }
}
