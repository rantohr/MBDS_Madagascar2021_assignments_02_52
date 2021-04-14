import { Component, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { Assignment } from 'src/app/@core/schema/assignment.model'
import { AssignmentsService } from 'src/app/@core/service/assignments.service'

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  assignments: Assignment[]
  page = 1
  rendu = undefined
  limit = 10
  totalDocs: number
  totalPages: number
  hasPrevPage: boolean
  prevPage: number
  hasNextPage: boolean
  nextPage: number
  search: string

  searchEventsSubject: Subject<void> = new Subject<void>();

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(queryParams => {
        this.page = +queryParams.page || 1
        this.limit = +queryParams.limit || 10
        this.rendu = +queryParams.rendu || undefined
        this.search = queryParams.search || undefined
        this.getAssignments()
      })
  }

  getAssignments(): void {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit, this.search, this.rendu)
      .subscribe(data => {
        this.assignments = data.docs
        this.page = data.page
        this.limit = data.limit
        this.totalDocs = data.totalDocs
        this.totalPages = data.totalPages
        this.hasPrevPage = data.hasPrevPage
        this.prevPage = data.prevPage
        this.hasNextPage = data.hasNextPage
        this.nextPage = data.nextPage
      })
  }

  onDeleteAssignment(event): void {
    this.assignmentsService.deleteAssignment(event)
      .subscribe(message => {
        console.log(message)
      })
  }

  premierePage(): void {
    this.router.navigate(['/home'], {
      queryParams: {
        page: 1,
        limit: this.limit,
      }
    })
  }

  pageSuivante(): void {
    this.router.navigate(['/home'], {
      queryParams: {
        page: this.nextPage,
        limit: this.limit,
      }
    })
  }

  pagePrecedente(): void {
    this.router.navigate(['/home'], {
      queryParams: {
        page: this.prevPage,
        limit: this.limit,
      }
    })
  }

  dernierePage(): void {
    this.router.navigate(['/home'], {
      queryParams: {
        page: this.totalPages,
        limit: this.limit,
      }
    })
  }

  getServerData(event?: PageEvent) {
    this.page = event.pageIndex + 1
    this.limit = event.pageSize
    this.getAssignments()
    return event;
  }

  clickTab(event): void {
    this.assignments = []
    switch (event.index) {
      case 1:
        this.rendu = true
        break;
      case 2:
        this.rendu = false
        break;
      default:
        this.rendu = undefined
        break;
    }
    this.getAssignments()
  }

  submitSearch(): void {
    this.getAssignments()
    this.searchEventsSubject.next();
  }
}
