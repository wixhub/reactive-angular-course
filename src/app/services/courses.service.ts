import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { Lesson } from "../model/lesson";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  loadCourseById(courseId: number): Observable<Course> {
    return this.http
      .get<Course>(`/api/courses/${courseId}`)
      .pipe(shareReplay());
  }

  loadAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return this.http
      .get<Lesson[]>("/api/lessons", {
        params: { pageSize: 1000, courseId: "" + courseId },
      })
      .pipe(
        map((res) => res["payload"]),
        shareReplay()
      );
  }

  loadAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>("/api/courses").pipe(
      map((res) => res["payload"].sort(sortCoursesBySeqNo)),
      shareReplay()
    );
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return this.http
      .put(`/api/courses/${courseId}`, changes)
      .pipe(shareReplay());
  }

  searchLessons(search: string): Observable<Lesson[]> {
    return this.http
      .get<Lesson[]>("/api/lessons", {
        params: { filter: search, pageSize: 100 },
      })
      .pipe(
        map((res) => res["payload"]),
        shareReplay()
      );
  }
}
