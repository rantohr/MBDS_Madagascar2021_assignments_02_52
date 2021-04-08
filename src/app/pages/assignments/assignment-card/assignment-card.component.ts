import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignment-card',
  templateUrl: './assignment-card.component.html',
  styleUrls: ['./assignment-card.component.css']
})
export class AssignmentCardComponent implements OnInit {

  @Input() assignment: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openDetail(): void {
    console.log('element', this.assignment._id)
    this.router.navigateByUrl(`/assignment/${this.assignment._id}`);
  }
}
