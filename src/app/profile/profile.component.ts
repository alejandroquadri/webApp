import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Profile, EmailValidator, AuthService, ProfileService, UploadFilesService } from '../shared';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  avatar = './assets/images/smiley-cyrus.jpg';
  profile: Profile = new Profile();
  profileObject: any;
  profileForm: FormGroup;
  @ViewChild('file') file;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
    private uploadService: UploadFilesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
      this.buildForm();
   }

  ngOnInit() {
    console.log('upload image', this.file);
   this.profileService.getProfile()
    .subscribe(prof => {
      console.log('profile component pide el fireProfile', prof);
      this.profileForm.patchValue(prof);
      this.profileObject = prof;
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
    });
  }

  onSubmit() {
    console.log('Submit', this.profileForm.value);
    this.update(this.profileForm.value);
  }

  update(form) {
    this.profileService.update(form)
    .then(
      () => console.log('actualizado'),
      err => console.log('hubo algun error', err));
  }

  uploadImage() {
    this.uploadService.upload(this.file.nativeElement.files, 'images/profile', this.profileObject.$key);

    this.uploadService.uploadObs.subscribe( file => {
      this.profileService.update({avatar: file})
      .then(
        (ret) => console.log('avatar uploaded'),
        (err) => console.log('error', err)
      );
    });
  }

}
