import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../../components/menu/menu/menu.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OnDestroy, Renderer2 } from '@angular/core';
import {  AsyncValidatorFn } from '@angular/forms';
//import {  Editor, Toolbar } from 'ngx-editor';
import { Observable, of } from 'rxjs';
import { Route } from '@angular/router';
import {FormControl} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { MatRadioChange } from '@angular/material/radio';
import moment from 'moment';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [MatSelectModule,MatCardModule,CommonModule,
    MatIconModule, MatFormFieldModule,ReactiveFormsModule,MatDatepickerModule,
    MatNativeDateModule,MatRadioModule,
   MenuComponent, MatTooltipModule, MatButtonModule,  MatInputModule,  MatCheckboxModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent implements OnInit {
 
  Form: FormGroup | any;
  form: FormGroup | any;
  ClientNames!:any[];
  Market!:any[];
  ServiceLine!:any[];
  ProjectType!:any[];
  yearFP!:any[];
  ListProject!:any[];
  defaultDate!: Date;
  fechaSend!:any;
  fechaDividida: string[] = [];
  FP!:any[];
  Status!:any[];
  Employee!:any[];
  EmployeeManager!:any[];
  EmployeePM!:any[];  
  address!:any;
  lastProject!:any;
  NewProject!:any;
  NewProjectName!:any;
  NewTask!:any;
  NewTask1!:any;
  resident!:any;
  IdProjectEd!:any;
  ProjectTask!:any;
  hidden!:any;
  hiddenCombo!:any;
  residenceId!:any;
  residentCode!:any[];
  selectedFile: File | null = null;
  selectedValue!:any;
  IDselected!:any;
  ProjectEdit:any;
  ExistDetails:any;
  ProjectNameSele!:any;
    dateControl = new FormControl();
  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private apiServices: ApiService,
    private _route: Router
    ) {
 
      if( _route.getCurrentNavigation()!.extras.state)
        {
        let data = this._route.getCurrentNavigation()?.extras.state!['project'];
        console.log("project edit",data);
        //this.IdProjectEd=data.data.Market;
        this.ProjectEdit=data.data;
        this.buildForm();
         console.log("ClientName",this.ProjectEdit.ClientName);
        if (data.IDD===null)
          {this.ExistDetails=false;
            console.log("existe",data.IDD);
          }
        else
        {this.ExistDetails=true;
          console.log("No existe",data.IDD);
        }
       // this.residenceId=data.owner.residence_id;
 
        }
       // this.getbyYear();
       // this.getLastProposalNum();
        
    }
 
  ngOnInit(): void {
    
    this.getClient();
    
    this.getManager();
    this.getPM();

    this.getAllTypeServiceLine();
    this.getAllMarket();
    this.getAllTypeProject();
    this.getAllTypeStatusProject();
    this.getAllProjects();
    this.hidden=false;
  this.hiddenCombo=false;
    //this.SelectFP(this.selectedValue);
  }
 
 getFormattedDateForSQL(): string | null {
    const selectedDate = this.dateControl.value;
    if (selectedDate) {
      // Format date to 'YYYY-MM-DD' for SQL Server
      return moment(selectedDate).format('YYYY-MM-DD');
    }
    return null;
  }
 
  getClient()
  {
    this.apiServices.getClientsAll().subscribe((resp)=>{
      console.log("Client",resp);
     
      this.ClientNames = resp;
      console.log("Nameclient",this.ClientNames);
     
    })
  }


  getLastSubproject(event: MatSelectChange):void{
    // alert("estoy aqui");
     console.log('Selected value:', event.value);
    // debugger;
    // let idaddress=this.form.get('selectedOption')!.value;
    console.log("event.value",event.value);
      
     this.apiServices.getLastSubproject(event.value).subscribe((resp:any)=>{
      console.log('data:', resp[0].Mproj);
      this.ProjectTask= this.form.get('ListProjects')!.value;
      this.NewTask=parseInt(resp[0].Mproj) + 1;
      this.NewTask1=String(this.NewTask)
       //this.NewTask1= this.NewTask1 + 1;
       console.log('this.NewTask1:', this.NewTask1);
        console.log('this.lengt:', this.NewTask1.length);
       if (this.NewTask1.length===1)
      {
        console.log('Estoy aqui');
        this.NewProjectName=this.ProjectTask.toString()+'.0'+this.NewTask1.toString();
         
      }
      if (this.NewTask1.length>1)
      {
        console.log('Estoy aqui1');
         this.NewProjectName=this.ProjectTask.toString()+'.'+this.NewTask1.toString();
      }      

   
      this.hidden=true;
   
    this.form.controls.ProjectName.setValue(this.NewProjectName); 
       console.log('ID:', this.NewProjectName);
      // this.fechaDividida = resp.ProposalRequestDate.split('-');
      // this.fechaSend= this.fechaDividida[1] +"/" + this.fechaDividida[2]+"/" + this.fechaDividida[0];
      // this.defaultDate= this.fechaSend.substring(0, 10);
       //console.log('defaultDate:', this.defaultDate);
      // this.ProjectNameSele=resp.ProjectDescription;
       //console.log(this.fechaDividida,this.fechaSend)
     /*  this.form.patchValue({
         
         ProjectName:[1900.00],
          ProjectScope:[resp.ProjectDescription.value],

          ProposalSubmitted:[new Date(parseInt(this.fechaDividida[0]),parseInt(this.fechaDividida[2]),parseInt(this.fechaDividida[1]))],
          ProjectFee:[resp.ContractValue.value]
        })*/
      // if (resp.success) {
        // this.addresSel=resp.Address;
         
         //this.FamilySel=resp.family_id;        
   
        // alert(resp.response);
    
      // }else{
        // alert(resp.error);
       //} 
       
     });
   
   }



  getLastProposalNum()
  {
    this.apiServices.getLastProposalNum('U').subscribe((resp)=>{
      
     
      this.NewProject = parseInt(resp.NoProject)+1;
      //this.NewProjectName=this.NewProject.toFixed(2);
      this.NewProjectName=this.NewProject.toString()+'.00';
      console.log("NewProjectName",this.NewProjectName);
      this.NewTask=0;
 
    })
  }
  
    getAllProjects()
  {
    this.apiServices.getProjectA().subscribe((resp)=>{
      console.log("getProjectA",resp);
     this.ListProject=resp;
     console.log("ListProjects",this.ListProject);
     // this.NewProject = parseInt(resp.NoProject)+1;
      //this.NewProjectName=this.NewProject.toFixed(2);
     // this.NewProjectName=parseInt(resp.NoProject)+1;
     // this.NewTask=0;
    })
  }
  
 
  getbyYear()
  {
    this.apiServices.getbyYear().subscribe((resp)=>{
      console.log("Client",resp);
     
      this.yearFP = resp;
      this.selectedValue = this.yearFP[0];
      console.log("yearFP",this.yearFP);
      console.log("selectedValue",this.selectedValue);
      this.form.controls.yearFP.setValue(this.selectedValue);
      
      console.log("selectedValue",this.form.controls.yearFP);
    })
  }

 /* getFP()
  {
    this.apiServices.getAllNoProposal(this.selectedValue).subscribe((resp)=>{
      console.log("FP",resp);
     
      this.FP = resp;
      console.log("NamecFPlient",this.FP);
     
    })
  }
 */

  onSubmit1() {
    debugger;
    if (this.form.valid) {
      // Lógica para manejar el envío del formulario aquí
      console.log(this.form);
    } else {
      // Marcar los campos como tocados para mostrar los mensajes de error
      Object.values(this.form.controls).forEach(control => {
        (control as any).markAsTouched(); // Usa una afirmación de tipo
      });
    }
    this.apiServices.addClient(this.form).subscribe((resp)=>{
      console.log("ClientNew",resp);
     
     // this.resp = resp;
      //console.log("Address",this.residentType);
     
    })
   
  }
 


  SelectFP(event:any):void{
    console.log('Selected value:', event.value);
    // debugger;
    // let idaddress=this.form.get('selectedOption')!.value;
   //  console.log("event",event);
     this.apiServices.getAllNoProposal(event.value).subscribe((resp:any)=>{
       console.log('Residnec Addr:', resp);
       this.FP = resp;
     })
  }

  
  getAllTypeStatusProject()
  {
   // console.log("getEmployee",this.residenceId);
    this.apiServices.getAllTypeStatusProject().subscribe((resp)=>{
      console.log("getAllTypgetAllTypeStatusProjecteProject",resp);
     
      this.Status = resp;
  
    })
  }


  getAllTypeProject()
  {
   // console.log("getEmployee",this.residenceId);
    this.apiServices.getAllTypeProject().subscribe((resp)=>{
      console.log("getAllTypeProject",resp);
     
      this.ProjectType = resp;
  
    })
  }
  getAllTypeServiceLine()
  {
   // console.log("getEmployee",this.residenceId);
    this.apiServices.getAllTypeServiceLine().subscribe((resp)=>{
      console.log("getAllTypeServiceLine",resp);
     
      this.ServiceLine = resp;
  
    })
  }

  getAllMarket()
  {
   // console.log("getEmployee",this.residenceId);
    this.apiServices.getAllMarket().subscribe((resp)=>{
      console.log("getAllMarket",resp);
     
      this.Market = resp;
  
    })
  }

  getEmployee()
  {
   // console.log("getEmployee",this.residenceId);
    this.apiServices.getEmployee().subscribe((resp)=>{
      console.log("getEmployee",resp);
     
      this.Employee = resp;
  
    })
  }
 
  getManager()
  {
   // console.log("getEmployee",this.residenceId);
    this.apiServices.getManager().subscribe((resp)=>{
      console.log("EmployeeManager",resp);
     
      this.EmployeeManager = resp;
  
    })
  }

  getPM()
  {
   // console.log("getEmployee",this.residenceId);
    this.apiServices.getPM().subscribe((resp)=>{
      console.log("EmployeePM",resp);
     
      this.EmployeePM = resp;
  
    })
  }

  UpdateDetails() {
    //debugger;
    console.log('Estoy en Submit:');
      this.Form = this.fb.group({
        
        ///
       Client:[this.form.get('Client')!.value],
        selectedClient:[ this.form.get('selectedClient')!.value],
        selectedEmployee:[this.form.get('selectedEmployee')!.value],
        AgreementNo:[this.form.get('AgreementNo')!.value],
        ClientProject:[this.form.get('ClientProject')!.value],
        ClientProjectCost:[this.form.get('ClientProjectCost')!.value],
        selectedFP:[this.form.get('selectedFP')!.value],
        ProjectCSJ:[this.form.get('ProjectCSJ')!.value],
        GeneralDescription:[this.form.get('GeneralDescription')!.value],
        State:[this.form.get('State')!.value],
        County:[this.form.get('County')!.value],
        City:[this.form.get('City')!.value],
        HighwayNo:[this.form.get('HighwayNo')!.value],
        Owner:[this.form.get('Owner')!.value],
        Segment:[this.form.get('Segment')!.value],
        Bridge:[this.form.get('Bridge')!.value],
        Contact:[this.form.get('Contact')!.value],
        yearFP:[this.form.get('yearFP')!.value],
        FP:[this.form.get('FP')!.value],
        ProjectName:[this.form.get('ProjectName')!.value],
        ProjectDescription:[this.form.get('ProjectDescription')!.value],
        ProjectScope:[this.form.get('ProjectScope')!.value],
        DepartmentManager:[this.form.get('DepartmentManager')!.value],
        ProjectManager:[this.form.get('ProjectManager')!.value],
        Task:[this.form.get('Task')!.value],
        ProjectType:[this.form.get('ProjectType')!.value],
        Market:[this.form.get('Market')!.value],
        MainServiceLine:[this.form.get('MainServiceLine')!.value],
        EngineeringService:[this.form.get('EngineeringService')!.value],
        FPRequestedDate:[this.form.get('FPRequestedDate')!.value],
        FPSenttoClien:[this.form.get('FPSenttoClien')!.value],
        NTPDate:[this.form.get('NTPDate')!.value],        
        ProjectFee:[this.form.get('ProjectFee')!.value],
        ID:[this.IDselected],    
        Category:['Contrated'],  
        Project:[this.NewProject],  
        SubProject:[this.NewTask],  
        Status:['Under Production'],        
        DueDate:[this.form.get('DueDate')!.value]
   
     })
 
     console.log('Pase el formulario',this.Form);
   if (this.ExistDetails===true)
   {
    this.apiServices.updateProjectdetails(this.Form.value).subscribe((resp:any)=>{
        console.log('Formulario enviado a update cliente:', resp);
        if (resp.success) {
            alert(resp.response);
            }
        else{
              alert(resp.error);
            }
           
          });

   }
   else
   {
      this.apiServices.addProjectdetails(this.Form.value).subscribe((resp:any)=>{
        console.log('Formulario enviado a nuevo cliente:', resp);
        if (resp.success) {
            alert(resp.response);
            }
        else{
              alert(resp.error);
            }
           
          });}
          //this.myForm.reset();
         // alert(resp.response);
         this.back();
        }
     
 

 UpdateProject() {
    //debugger;
    console.log('Estoy en Submit:');
      this.Form = this.fb.group({
        
        ///
        Client:[this.form.get('Client')!.value],
        selectedClient:[ this.form.get('selectedClient')!.value],
        selectedEmployee:[this.form.get('selectedEmployee')!.value],
        AgreementNo:[this.form.get('AgreementNo')!.value],
        ClientProject:[this.form.get('ClientProject')!.value],
        ClientProjectCost:[this.form.get('ClientProjectCost')!.value],
        selectedFP:[this.form.get('selectedFP')!.value],
        ProjectCSJ:[this.form.get('ProjectCSJ')!.value],
        GeneralDescription:[this.form.get('GeneralDescription')!.value],
        State:[this.form.get('State')!.value],
        County:[this.form.get('County')!.value],
        City:[this.form.get('City')!.value],
        HighwayNo:[this.form.get('HighwayNo')!.value],
        Owner:[this.form.get('Owner')!.value],
        Segment:[this.form.get('Segment')!.value],
        Bridge:[this.form.get('Bridge')!.value],
        Contact:[this.form.get('Contact')!.value],
        yearFP:[this.form.get('yearFP')!.value],
        FP:[this.form.get('FP')!.value],
        ProjectName:[this.form.get('ProjectName')!.value],
        ProjectDescription:[this.form.get('ProjectDescription')!.value],        
        ProjectScope:[this.form.get('ProjectScope')!.value],
        DepartmentManager:[this.form.get('DepartmentManager')!.value],
        ProjectManager:[this.form.get('ProjectManager')!.value],
        Task:[this.form.get('Task')!.value],
        ProjectType:[this.form.get('ProjectType')!.value],
        Market:[this.form.get('Market')!.value],
        MainServiceLine:[this.form.get('MainServiceLine')!.value],
        EngineeringService:[this.form.get('EngineeringService')!.value],
        FPRequestedDate:[this.form.get('FPRequestedDate')!.value],
        FPSenttoClien:[this.form.get('FPSenttoClien')!.value],
             
        ProjectFee:[this.form.get('ProjectFee')!.value],
        ID:[this.form.get('ID')!.value],    
        Category:['Contrated'],  
        Project:[this.NewProject],  
        SubProject:[this.NewTask],  
        Status:['Under Production'], 
        NTPDate:[this.form.get('NTPDate')!.value],          
        DueDate:[this.form.get('DueDate')!.value]
        
   
     })
 
     console.log('Pase el formulario',this.Form);

    this.apiServices.updateProject(this.Form.value).subscribe((resp:any)=>{
        console.log('Formulario enviado a nuevo cliente:', resp);
        if (resp.success) {
            alert(resp.response);
            }
        else{
              alert(resp.error);
            }
           
          });

   

          //this.myForm.reset();
         // alert(resp.response);
         this.back();
        }

         onSubmit() {
          this.UpdateDetails();
          this.UpdateProject();
         }

  onSubmit_Old() {
    //debugger;
    console.log('Estoy en Submit:');
      this.Form = this.fb.group({
        
        ///
        Client:[this.form.get('Client')!.value],
        selectedClient:[ this.form.get('selectedClient')!.value],
        selectedEmployee:[this.form.get('selectedEmployee')!.value],
        AgreementNo:[this.form.get('AgreementNo')!.value],
        ClientProject:[this.form.get('ClientProject')!.value],
        ClientProjectCost:[this.form.get('ClientProjectCost')!.value],
        selectedFP:[this.form.get('selectedFP')!.value],
        ProjectCSJ:[this.form.get('ProjectCSJ')!.value],
        GeneralDescription:[this.form.get('GeneralDescription')!.value],
        State:[this.form.get('State')!.value],
        County:[this.form.get('County')!.value],
        City:[this.form.get('City')!.value],
        HighwayNo:[this.form.get('HighwayNo')!.value],
        Owner:[this.form.get('Owner')!.value],
        Segment:[this.form.get('Segment')!.value],
        Bridge:[this.form.get('Bridge')!.value],
        Contact:[this.form.get('Contact')!.value],
        yearFP:[this.form.get('yearFP')!.value],
        FP:[this.form.get('FP')!.value],
        ProjectName:[this.form.get('ProjectName')!.value],
        ProjectDescription:[this.form.get('ProjectDescription')!.value],
        ProjectScope:[this.form.get('ProjectScope')!.value],
        DepartmentManager:[this.form.get('DepartmentManager')!.value],
        ProjectManager:[this.form.get('ProjectManager')!.value],
        Task:[this.form.get('Task')!.value],
        ProjectType:[this.form.get('ProjectType')!.value],
        Market:[this.form.get('Market')!.value],
        MainServiceLine:[this.form.get('Discipline')!.value],
        EngineeringService:[this.form.get('EngineeringService')!.value],
        FPRequestedDate:[this.form.get('FPRequestedDate')!.value],
        FPSenttoClien:[this.form.get('FPSenttoClien')!.value],
        NTPDate:[this.form.get('NTPDate')!.value],        
        ProjectFee:[this.form.get('ProjectFee')!.value],
        ID:[this.IDselected],    
        Category:['Contrated'],  
        Project:[this.NewProject],  
        SubProject:[this.NewTask],  
        Status:['Under Production'],        
        DueDate:[this.form.get('DueDate')!.value]
   
     })
 
     console.log('Pase el formulario',this.Form);
   if (this.ExistDetails)
   {
    this.apiServices.updateProjectdetails(this.Form.value).subscribe((resp:any)=>{
        console.log('Formulario enviado a nuevo cliente:', resp);
        if (resp.success) {
            alert(resp.response);
            }
        else{
              alert(resp.error);
            }
           
          });

   }
   else
   {
      this.apiServices.updateProposaltoProject(this.Form.value).subscribe((resp:any)=>{
        console.log('Formulario enviado a nuevo cliente:', resp);
        if (resp.success) {
            alert(resp.response);
            }
        else{
              alert(resp.error);
            }
           
          });}
          //this.myForm.reset();
         // alert(resp.response);
         this.back();
        }
     
 
radioButtonChange(data: MatRadioChange) {
    console.log(data.value);
    if (data.value==='1')
    {
      this.hidden=true;
      
      this.form.controls.ProjectName.setValue(this.NewProjectName);
      
     
    }
        if (data.value==='2')
    {
      
      this.hidden=false;
      this.hiddenCombo=true;
      //this.form.controls.ProjectName.setValue(this.NewProjectName);
      
     
    }

     console.log("hiden",this.hidden) 
}
   
   
    // Verificar si el formulario es válido
   
 
 
 
  back(){
    this._route.navigate(['/ListProjects']);
  }
 
  InfoFPSelect(event: MatSelectChange):void{
    // alert("estoy aqui");
     console.log('Selected value:', event.value);
    // debugger;
    // let idaddress=this.form.get('selectedOption')!.value;
     //console.log("add",idaddress);
     this.apiServices.getFPbyNum(event.value).subscribe((resp:any)=>{
      console.log('data:', resp);
      this.IDselected=parseInt(resp.ID);
       console.log('ID:', this.IDselected);
       this.fechaDividida = resp.ProposalRequestDate.split('-');
       this.fechaSend= this.fechaDividida[1] +"/" + this.fechaDividida[2]+"/" + this.fechaDividida[0];
       this.defaultDate= this.fechaSend.substring(0, 10);
       console.log('defaultDate:', this.defaultDate);
      // this.ProjectNameSele=resp.ProjectDescription;
       //console.log(this.fechaDividida,this.fechaSend)
       this.form.patchValue({
       // this.form = this.fb.group({
          
         ProjectName:[1900.00],
          ProjectScope:[resp.ProjectScope.value],
         // defaultDate: this.fechaSend,
       //   ProposalRequestDate :[this.defaultDate],
          //[resp.ProposalRequestDate,Validators.required], 5/7/2025, 2025-01-13
          ProposalSubmitted:[new Date(parseInt(this.fechaDividida[0]),parseInt(this.fechaDividida[2]),parseInt(this.fechaDividida[1]))],
          ProjectFee:[resp.ContractValue.value]
        })
      // if (resp.success) {
        // this.addresSel=resp.Address;
         
         //this.FamilySel=resp.family_id;        
   
        // alert(resp.response);
    
      // }else{
        // alert(resp.error);
       //} 
       
     });
   
   }
 
  buildForm(){
    this.form = this.fb.group({
     
      
      selectedClient: [], 
      selectedEmployee: [''],
      AgreementNo: [this.ProjectEdit.Agreement],
      Client: [this.ProjectEdit.ClientName],
      ClientProject: [this.ProjectEdit.ClientProject],
      GeneralDescription: [this.ProjectEdit.GeneralDescriptionProject],
      ClientProjectCost: [this.ProjectEdit.ProjectCost],
      selectedFP: [this.ProjectEdit.NoProposal], 
      ProjectCSJ: [this.ProjectEdit.ProjectCSJContractNo],
      State:[this.ProjectEdit.State],
      selectedOption2:['',Validators.required],
      County:[this.ProjectEdit.County],
      City:[this.ProjectEdit.City],
      HighwayNo:[this.ProjectEdit.HighwayNo],
      Owner:[this.ProjectEdit.Owner],
      Segment: [this.ProjectEdit.SegmentBridge],
      Bridge :[this.ProjectEdit.BridgeDistrict],
      Contact :[this.ProjectEdit.ContactInformation],
      yearFP:[this.ProjectEdit.Year],
      ListProjects:[''],
      FP:[this.ProjectEdit.NoProposal],
      ProjectName:[this.ProjectEdit.ProjectName],
      ProjectScope:[this.ProjectEdit.Scope],
      DepartmentManager:[this.ProjectEdit.DepartmentManager],
      ProjectManager: [this.ProjectEdit.PM],
      Task :[this.ProjectEdit.Task],
      ProjectType :[this.ProjectEdit.ProjectType],
      Market:[this.ProjectEdit.Market],
      MainServiceLine:[this.ProjectEdit.Discipline],
      ProjectDescription:[this.ProjectEdit.ProjectDescription],
      EngineeringService:[this.ProjectEdit.ServiceEng],
      FPRequestedDate :[this.ProjectEdit.ProposalRequestDate],
      FPSenttoClien:[this.ProjectEdit.ProposalSubmitted],
      NTPDate:[this.ProjectEdit.AwardDate],
      ProjectFee:[this.ProjectEdit.ContractValue],
      ID:[this.ProjectEdit.ID],
      IDD:[this.ProjectEdit.IDD],
      Category:[''],
      Project:[''],
      SubProject:[''],
      Status:[this.ProjectEdit.Status],      
      DueDate:[this.ProjectEdit.EstimatedDueDate],
    });

  
  }
 
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFile = inputElement.files[0];
    }
  }
 
}


