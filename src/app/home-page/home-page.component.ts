import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';  
import { AuthenticationService } from '../service/authentication.service';  
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective | undefined;
 
  title = 'todo-list';
  username = localStorage.getItem('username');
  tasksArray = [
    {id: 1, text: 'Buy groceries for next week', addedDate: '20-1-2023', dueDate: '25-1-2023', status:'Active', showStatus:'show'},
    {id: 2, text: 'Renew car insurance', addedDate: '21-1-2023', dueDate: '26-1-2023', status:'Completed', showStatus:'show'},
    {id: 3, text: 'Sign up for online course', addedDate: '22-1-2023', dueDate: '27-1-2023', status:'Active', showStatus:'show'},
  ];

  taskText: string = '';
  taskDueDate: any;
  uodatedId: Number=0;
  //date: any;
  constructor(private router: Router, private authenticationService: AuthenticationService) { }  

  ngOnInit(): void {
  }

  addTask(){
    if((this.taskText).trim() == '' || (this.taskDueDate == undefined) || this.taskDueDate ==''){
      alert("Please, Enter the task's text and the the due date!");
      return;
    }
    var dueDate = 
    this.taskDueDate?.year +'-'+
    this.taskDueDate?.month +'-'+
    this.taskDueDate?.day;
    let todayDate = new Date();
    let day = todayDate.getDate();
    let month = todayDate.getMonth() + 1;
    let year = todayDate.getFullYear();
    let currentDate = `${day}-${month}-${year}`;

    if(this.uodatedId == 0 ){ 
      var id = 0;
      if(this.tasksArray.length != 0){
        id = +(this.tasksArray[this.tasksArray.length - 1].id);
      } 
      this.tasksArray.push(
        {id: id+1,text: this.taskText, addedDate: currentDate, dueDate: dueDate, status:'Active', showStatus:'show'}
      )
    } else {
      const updateTaskResult = this.tasksArray.filter( (task)=> {
        return task.id == this.uodatedId;
      });
      updateTaskResult[0].text =this.taskText;
      updateTaskResult[0].dueDate =dueDate;
      this.uodatedId = 0;
    }
  }

  deleteTask(obj: any){
    var index = this.tasksArray.indexOf(obj);
    if (index !== -1) {
      this.tasksArray.splice(index, 1);
    }
  }

  updateTask(obj: any){
    this.taskText=obj.text;
    let day=+(obj.dueDate.split('-')['0']);
    let month=+(obj.dueDate.split('-')['1']);
    let year=+(obj.dueDate.split('-')['2']);
    this.taskDueDate={year: year, month: month, day: day};
    this.uodatedId=obj.id;
  }

  completeTask(obj: any){
    const updateTaskResult = this.tasksArray.filter( (task)=> {
      return task.id == obj.id;
    });
    updateTaskResult[0].status ='Completed';
  }

  filter(target: any){
    if(target.value==1){
      this.tasksArray.forEach((item)=> {
        item.showStatus= 'show';
      })
    }
    if(target.value==2){
      this.tasksArray.forEach((item)=> {
        if(item.status == 'Completed')
          item.showStatus= 'show';
        else
          item.showStatus= 'hide';
      })
    }
    if(target.value==3){
      this.tasksArray.forEach((item)=> {
        if(item.status == 'Active')
          item.showStatus= 'show';
        else
          item.showStatus= 'hide';
      })
    }
  }

  logout() {  
    this.authenticationService.logout();  
    this.router.navigate(['']);  
  }  

}
