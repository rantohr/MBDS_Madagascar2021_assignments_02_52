import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { Assignment } from 'src/app/@core/schema/assignment.model';
import { AssignmentsService } from 'src/app/@core/service/assignments.service';

@Component({
  selector: 'app-infinite-scrolling',
  templateUrl: './infinite-scrolling.component.html',
  styleUrls: ['./infinite-scrolling.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollingComponent {
  constructor(protected assignmentsService: AssignmentsService) { }

  ds = new AssignmentsDataSource(this.assignmentsService);
}

export class AssignmentsDataSource extends DataSource<Assignment | undefined> {

  constructor(protected assignmentsService: AssignmentsService) {
    super();
  }

  private _pageSize = 15;
  private _cachedData = [{
    id: -1,
    nom: '',
    dateDeRendu: undefined,
    rendu: false,
    matiere: '',
    auteur: '',
    note: -1,
    remarques: ''
  }]
  private _fetchedPages = new Set<number>();
  private _dataStream = new BehaviorSubject<(Assignment | undefined)[]>(this._cachedData);
  private _subscription = new Subscription();

  connect(collectionViewer: CollectionViewer): Observable<(Assignment | undefined)[]> {
    this._subscription.add(collectionViewer.viewChange.subscribe(range => {
      const startPage = this._getPageForIndex(range.start);
      const endPage = this._getPageForIndex(range.end-1);
      for (let i = startPage; i <= endPage; i++) {
        this._fetchPage(i);
      }
    }));
    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  private _fetchPage(page: number) {
    console.log('this._fetchedPages', this._fetchedPages)
    if (this._fetchedPages.has(page)) {
      return;
    }
    this._fetchedPages.add(page);

    this.assignmentsService.getAssignmentsPagine(page, this._pageSize, undefined).subscribe(results => {
      if (results && results.docs) {
        this._dataStream.next(results.docs);
      }
    })
  }
}
