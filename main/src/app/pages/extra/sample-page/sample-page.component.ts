import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import {OnInit, ViewChild} from '@angular/core';


import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

import { ProductService } from 'src/app/services/product.service';
import {Observable} from 'rxjs';
import { ProductDetails } from 'src/app/models/product-details';
import {take} from 'rxjs/operators';
//import { DeletePopupComponent } from '../../../../shared/popups/delete-popup/delete-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { routes } from 'src/app/app.routes';

@Component({
  selector: 'app-sample-page',
  imports: [MaterialModule],
  templateUrl: './sample-page.component.html',
})

export class AppSamplePageComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public routes: typeof routes = routes;
  public products$: Observable<ProductDetails[]>;
  public displayedColumns: string[] = ['select', 'id', 'title', 'subtitle', 'price','rating', 'actions'];
  public dataSource: MatTableDataSource<ProductDetails>;
  deleteConfirmSubscription: any;
  selectedId: string;

  selection = new SelectionModel<any>(true, []);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


    grafica(){
   // this.routes.LINE_CHARTS;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ProductDetails): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  constructor(private service: ProductService,
              public dialog: MatDialog) {
    this.products$ = this.service.getProducts();

    this.products$.pipe(
      take(1)
    ).subscribe((products: ProductDetails[]) => {
      this.dataSource = new MatTableDataSource(products);
    });
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDeleteModal(id: string): void {
    this.selectedId = id;
    /*const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '512px'
    });*

    this.deleteConfirmSubscription = dialogRef.componentInstance.deleteConfirmed.subscribe(result => {
      this.delete(this.selectedId);
    });*/
  }

  public delete(id: string) {
    this.service.deleteProduct(id);

    this.products$ = this.service.getProducts();

    this.products$.pipe(
      take(1)
    ).subscribe((products: ProductDetails[]) => {
      this.dataSource = new MatTableDataSource(products);
    });
  }
}
