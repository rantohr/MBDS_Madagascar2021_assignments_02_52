import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { Assignment } from 'src/app/@core/schema/assignment.model';
import { AssignmentsService } from 'src/app/@core/service/assignments.service';

@Component({
  selector: 'app-infinite-scrolling',
  templateUrl: './infinite-scrolling.component.html',
  styleUrls: ['./infinite-scrolling.component.css'],
})
export class InfiniteScrollingComponent implements OnInit, OnDestroy {

  assignments: Assignment[]
  page = 1
  limit = 15

  @Input() search: string
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;

  constructor(protected assignmentsService: AssignmentsService) { }

  ngOnInit(): void {
    this.getAssignments()
    this.eventsSubscription = this.events.subscribe(() => this.searchSublitted());
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  getAssignments(): void {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit, this.search)
      .subscribe(data => {
        this.assignments = data.docs
        this.page = data.page
        this.limit = data.limit
      })
  }

  searchSublitted(): void {
    console.log('this.search', this.search)
    this.getAssignments()
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      this.page = this.page + 1
      this.assignmentsService.getAssignmentsPagine(this.page, this.limit, this.search)
        .subscribe(data => {
          this.assignments = [...this.assignments, ...data.docs]
          this.page = data.page
          this.limit = data.limit
        })
    }
  }
}
