<p align="center">
  <a href="http://yatrum.com">
    <img alt="Yatrum App Logo" title="Angular 2 Yatrum App" src="http://res.cloudinary.com/zeus999/image/upload/v1486108021/Yatrum%20Logo/Screen_Shot_2017-02-03_at_1.01.17_PM.png" width="200">
  </a>
</p>


<p align="center">
  <a href="http://yatrum.com">
    <img alt="Yatrum App Logo" title="Angular 2 Yatrum App" src="http://res.cloudinary.com/zeus999/image/upload/v1486108021/Yatrum%20Logo/Screen_Shot_2017-02-03_at_1.01.33_PM.png" width="300">
  </a>
</p>

<p align="center">
  Yatrum built with ❤️ using Angular2, ngrx store, observables and reactive forms.
</p>

<p align="center">
  <a href="http://yatrum.com">Visit Website</a>
</p>

<p align="center">
  <a href="/CONTRIBUTING.md"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>
  <a href="https://codeclimate.com/github/aviabird/travel-app"><img src="https://codeclimate.com/github/aviabird/travel-app/badges/gpa.svg" /></a>
  <a href="https://www.pivotaltracker.com/n/projects/1927191"><img alt="Pivotal Project page" src="http://res.cloudinary.com/zeus999/image/upload/v1486457388/Yatrum%20Logo/pt-badge_ss3dyt.svg"></a>
</p>

## What's included?

* Yatrum uses @ngrx libraries, showcasing common patterns and best practices.
* Yatrum is a travel diary app for travellers.
* Travellers can create itinerary for their trips.
* This application utilises @ngrx/store to manage the state of the app and to cache requests made to the Backend API, @angular/router to manage navigation between routes, @ngrx/effects to isolate side effects.

## AngularSpree

We have also created and open sourced __[AngularSpree](https://github.com/aviabird/angularspree)__: Plug and play frontend application for SPREE E-Commerce API built with ❤️ using Angular2, Redux, Observables & ImmutableJs.

Check it out and join the our team on it's __[slack channel](https://angular-spree.herokuapp.com/)__ for discussions related to AngularSpree.

## Angular Fundamentals Course

<p align="center">
  <a>
    <img alt="Angular 2 Fundamentals Course" title="Angular 2 Fundamentals Course" src="http://res.cloudinary.com/zeus999/image/upload/c_limit,h_1041,w_1487/v1486458025/ANGULAR_2fundamentals_1_oxj2qd.png">
  </a>
</p>

Based on this application we are working on a full blown Angular 2 fundamentals course on udemy. Throughout this course you'll learn how to build yatrum from ground up.

#### Course curriculum

* Architecture, setup, source files
* TypeScript basics
* Getting started with latest angular
* Template fundamentals
* Rendering flows
* Component Architecture and Modules
* Services, Http and Observables
* Template Forms, Inputs and Validation
* Reactive Forms and more magic
* Routing

__[Subscribe to this course here](https://upscri.be/a00eaf/)__

## Setting up

##### Clone the repoo

```
$ git clone https://github.com/aviabird/yatrum.git
$ cd yatrum
```

##### Install npm dependencies
```
$ npm install
```
##### Additional Settings

For Social login to work you need to create an app on faceook and google and note down the client id and secret id of individual app.
Below are instructions for creating app on inidviudal social media site

1. <strong>Google</strong> : [Creating App Engine Project and Application](https://developers.google.com/ad-exchange/rtb/open-bidder/google-app-guide)
2. <strong>Facebook</strong> : [Creating a New Facebook App](https://developers.facebook.com/docs/apps/register)

Once you have created the app,rename `secret.ts.example` file in `app` folder to `secret.ts` and replace the dummy string with client id of respective social app.

## Development server frontend
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

By default it connects to our dev api. If you want to setup the server locally clone the [api](https://github.com/aviabird/yatrum-api) and setup the rails server, However we only suggest that if you are familiar with Ruby on Rails. Please follow the instructions on the project page as the frontend uses the backend API to connect.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.


## License
[MIT License](LICENSE.md)
