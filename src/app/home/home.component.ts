import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  public postForm !: FormGroup;
  public comments: any;
  public checkUpdate: boolean = false;

  constructor(private formbuilder: FormBuilder, private service: CommentsService) { }



  ngOnInit(): void {

    this.checkUpdate = false;
    this.postForm = this.formbuilder.group({
      author: ['', [Validators.required]],
      msg: ['', [Validators.required]],
      id: ""
    })
    this.getComments()
  }

  getComments() {
    this.service.getComments()
      .subscribe(res => {
        //
        console.log(res);
        this.comments = res;
      })
  }

  insertComment() {

    if (this.checkUpdate) {
      this.service.updateComment(this.postForm.value)
        .subscribe(res => {
          alert("Updated Successfully");
          this.ngOnInit();
        })
    }
    else{
      this.service.insertComment(this.postForm.value)
      .subscribe(res => {
        alert("Post Successfully");
        this.postForm.reset();
        this.ngOnInit();

      }, err => {
        alert('Somthing went wrong.')
      })
    }
    
  }
  get fp(): { [key: string]: AbstractControl } {
    return this.postForm.controls;
  }

  deleteComment(id: any) {
    this.service.deleteComment(id)
      .subscribe(res => {
        alert("Delete Successfully");
        this.ngOnInit();
      })
  }

  updateComment(_comment: any) {
    this.checkUpdate = true;
    this.postForm.patchValue({ "author": _comment.author, "msg": _comment.msg, "id": _comment.id });

  }

}
