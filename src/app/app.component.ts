import { Component, OnInit } from "@angular/core";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { AuthStore } from "./servises/auth.store";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthStore) {}

  ngOnInit() {
    this.auth.isLoggedOut$.pipe(map(r => console.log(r)));
  }

  logout() {
    this.auth.logout();
  }
}
