import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { CoursesService } from "../services/courses.service";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";
import { CoursesStore } from "../services/courses.store";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    //private cousesService: CoursesService,
    private coursesStore: CoursesStore //private loadingService: LoadingService,
  ) //private messagesService: MessagesService
  {}

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    //this.loadingService.loadingOn();
    // const courses$ = this.cousesService.loadAllCourses().pipe(
    //   catchError((err) => {
    //     const message = "Could not load courses";
    //     this.messagesService.showErrors(message);
    //     console.log(message, err);
    //     return throwError(err);
    //   })
    //   //finalize(() => this.loadingService.loadingOff())
    // );
    //                              showLoaderUntilCompleted<Course[]>
    //const loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);

    this.beginnerCourses$ = this.coursesStore.filterByCategory("BEGINNER");

    // loadCourses$.pipe(
    //   map((courses) =>
    //     courses.filter((course) => course.category == "BEGINNER")
    //   )
    // );

    this.advancedCourses$ = this.coursesStore.filterByCategory("ADVANCED");

    // loadCourses$.pipe(
    //   map((courses) =>
    //     courses.filter((course) => course.category == "ADVANCED")
    //   )
    // );
  }
}
