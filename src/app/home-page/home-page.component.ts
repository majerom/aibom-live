import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import * as data from  '../modals/data.json';
import { AiBomService } from '../service/ai-bom.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})



export class HomePageComponent implements OnInit, AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  searchText: string = '';
  modalData: any = data?.projects;
  searchResult: any = null;
  vulnarabilities: Array<any> =  [];
  isLoading: boolean = false;
  displayedColumns: string[] = ['id', 'descriptions', 'vulnStatus', 'score'];
  dataSource: any = new MatTableDataSource<any>(this.vulnarabilities);
  modelData: any;
  timeStamp: Date = new Date();
  authorName: any = JSON.parse(localStorage.getItem('loginData') || '');

  constructor(
    public aibomService: AiBomService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  searchModal(): any{
    this.getMetaData();
  }

  getMetaData(){
    this.aibomService.getMetaData(this.searchText).subscribe((data: any) =>{
      this.modelData = data[0];
      this.getCVEs(); 
    })
  }

  getCVEs(){
    let keyword = this.searchText;
    this.isLoading = true;
    this.dataSource = null;
    
    this.aibomService.getCVEs(keyword).subscribe((data: any) =>{
      this.isLoading = false;
      this.vulnarabilities = data.vulnerabilities; 
      this.dataSource = new MatTableDataSource<any>(this.vulnarabilities)
      this.dataSource.paginator = this.paginator;
   
    })
  }

  logout(){
    localStorage.removeItem('loginData');
    this.router.navigateByUrl('/login');
  }
  
}
