import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';


import { Profile, EmailValidator, AuthService, ProfileService } from '../shared';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile = new Profile();
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute
  ) {
      this.buildForm();
   }

  ngOnInit() {
    this.profileService.getProfile()
    .subscribe( prof => {
      console.log('profile', prof);
      this.profileForm.patchValue(prof);
    });
  }

  buildForm() {
    this.profileForm = this.fb.group({
      firstName: ['', ],
      lastName: ['', ],
      displayName: ['', ],
      interests: ['', ],
      birthday: ['', ],
      bio: ['', ],
      localPath: ['', ],
    });
  }

  onSubmit() {
    console.log( 'Submit', this.profileForm.value);
    this.update(this.profileForm.value);
  }

  update(form) {
    this.profileService.update(form)
    .then(
      () => console.log('actualizado'),
      err => console.log('hubo algun error', err));
  }

}
