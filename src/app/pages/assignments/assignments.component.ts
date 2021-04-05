import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
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
  limit = 10
  totalDocs: number
  totalPages: number
  hasPrevPage: boolean
  prevPage: number
  hasNextPage: boolean
  nextPage: number

  // on injecte le service de gestion des assignments
  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    console.log('AVANT AFFICHAGE')
    // on regarde s'il y a page= et limit = dans l'URL
    this.route.queryParams
      // tslint:disable-next-line: deprecation
      .subscribe(queryParams => {
        console.log('Dans le subscribe des queryParams')
        this.page = +queryParams.page || 1
        this.limit = +queryParams.limit || 10

        this.getAssignments()
      })
    console.log('getAssignments() du service appelé')
  }

  getAssignments(): void {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
      // tslint:disable-next-line: deprecation
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
        console.log('données reçues')
      })
  }

  onDeleteAssignment(event): void {
    // event = l'assignment à supprimer

    // this.assignments.splice(index, 1)
    this.assignmentsService.deleteAssignment(event)
      // tslint:disable-next-line: deprecation
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
    /*
    this.page = this.nextPage
    this.getAssignments()
    */
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
}
