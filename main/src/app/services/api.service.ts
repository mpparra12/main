import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//import { LoginI } from '../pages/models/login.interface';
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  private apiUrlWP = 'https://avalonsevenmeadows.org/wp-json/wp/v2/pages';
   //apiUrl="http://gonzalad2016-001-site8.ntempurl.com/index.php/api/decon";
   apiUrl="https://jsonplaceholder.typicode.com/"
   //apiUrl="http://decon.test/api/decon";

  constructor(private http: HttpClient) { }
 
  getPageContent(pageId: number) {
 
    return this.http.get<any>(`${this.apiUrlWP}/pageId`)
 
}
 
  getClientsAll()
  {
    return this.http.get<any>(`${this.apiUrl}/getAll`)
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }

  getEmployee()
  {
    return this.http.get<any>(`${this.apiUrl}/getEmployee`)
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }

  getManager()
  {
    return this.http.get<any>(`${this.apiUrl}/getManager`)
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }

  getPM()
  {
    return this.http.get<any>(`${this.apiUrl}/getPM`)
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }
  
  getAllTypeStatusProject()
  {
    return this.http.get<any>(`${this.apiUrl}/getAllTypeStatusProject`)
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }
  getAllTypeProject()
  {
    return this.http.get<any>(`${this.apiUrl}/getAllTypeProject`)
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }
  getAllTypeServiceLine()
  {
    return this.http.get<any>(`${this.apiUrl}/getAllTypeServiceLine`)
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }

  getAllMarket()
  {
    return this.http.get<any>(`${this.apiUrl}/getAllMarket`)
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }
  

  getProjectQAQC()
  {
    return this.http.get<any>(`${this.apiUrl}/getProjectQAQC`)
   // return this.http.get<any>(${this.apiUrl}/getAllProposals)
    
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }
  getbyYear()
  {
    return this.http.get<any>(`${this.apiUrl}/getbyYear`)
   // return this.http.get<any>(${this.apiUrl}/getAllProposals)
    
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }
  

  getTransaction(client_id: any)
  {
    return this.http.get<any>(`${this.apiUrl}/getTransaction,client_id`)
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }
  
  getLastSubproject(client_id: any)
  {
    return this.http.get<any>(`${this.apiUrl}/getLastSubproject?Project=${client_id}`)
   
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }

  
  getAllProjectDetails()
  {
    return this.http.get<any>(`${this.apiUrl}/getAllProjectDetails`)
   // return this.http.get<any>(${this.apiUrl}/getAllProposals)
    
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }
  

  
  getAllNoProposal(NoProposal: any)
  {
    return this.http.get<any>(`${this.apiUrl}/getAllNoProposal?Year=${NoProposal}`)
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }

  getAllProjectsStatus(status: any)
  {
    return this.http.get<any>(`${this.apiUrl}/getAllProjectsStatus?Status=${status}`)
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }

  /*  getAllProposalsByYear(status: any)
  {
    return this.http.get<any>(${this.apiUrl}/getAllProposalsByYear?Year=${status})
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }*/

  getFPbyNum(NoProposal: any)
  {
    return this.http.get<any>(`${this.apiUrl}/getByProposalNum?NoProposal=${NoProposal}`)
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }
  
  getLastProposalNum(NoProposal: any)
  {
    return this.http.get<any>(`${this.apiUrl}/getLastProposalNum?Name=${NoProposal}`)
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }
    getTransactionById(NoProposal: any)
  {
    return this.http.get<any>(`${this.apiUrl}/getTransaction?id=${NoProposal}`)
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }
  
addProjectdetails(form: any){
    return this.http.post(this.apiUrl+"/addProjectdetails",form)
  }

  addClient(formData: FormData) {
  return this.http.post(this.apiUrl + "/AddClient", formData);
}
  updateClient(client_id:any){
    return this.http.get<any>(`${this.apiUrl}/updateClient,client_id`)
   // return this.http.put(this.apiUrl+"/updateClient",form)
  }
  updatelastProposal(form:any){
    return this.http.get<any>(`${this.apiUrl}/updatelastProposal,form`)
   // return this.http.put(this.apiUrl+"/updateClient",form)
  }
  
    updateProposaltoProject(form:any){
    return this.http.get<any>(`${this.apiUrl}/updateProposaltoProject,form`)
   // return this.http.put(this.apiUrl+"/updateClient",form)
  }

      updateProject(form:any){
    return this.http.get<any>(`${this.apiUrl}/updateProject,form`)
   // return this.http.put(this.apiUrl+"/updateClient",form)
  }

  
      updateProjectdetails(form:any){
    return this.http.get<any>(`${this.apiUrl}/updateProjectdetails,form`)
   // return this.http.put(this.apiUrl+"/updateClient",form)
  }
  
  
  deleteClient(client_id: any) {
    return this.http.get<any>(`${this.apiUrl}/deleteClient,client_id`)
  }

  getAllProjects()
  {
    
    return this.http.get<any>(`${this.apiUrl}/users`)
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }

  getProjectA()
  {
    return this.http.get<any>(`${this.apiUrl}/getProjectA`)
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }
  
  
  getAllProposals()
  {
    return this.http.get<any>(`${this.apiUrl}/getAllProposals`)
   // return this.http.get<any>(${this.apiUrl}/parametros?idwp=${idwp})
  }

  addProposal(form: any){
    return this.http.post(this.apiUrl+"/addProposal",form)
  }



  getAllContacts(ID: any) {
  return this.http.get<any>(`${this.apiUrl}/getAllContacts?ID=${ID}`);

}

deleteContact(client_id: any) {
    return this.http.get<any>(`${this.apiUrl}/deleteContact,client_id`)
  }

   AddContacts(form: any){
    return this.http.post(this.apiUrl+"/AddContacts",form)
  }

      updateContact(form:any){
    return this.http.get<any>(`${this.apiUrl}/updateContact,form`)
   // return this.http.put(this.apiUrl+"/updateClient",form)
  }


 /* login(form: LoginI){
    return this.http.post(this.apiUrl+"/login",form)
  }*/
}