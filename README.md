# wodaholics

## Description

An app to keep track of you progress in Crossfit workouts and share it with your friends.

## User Stories

-  **NotFound** I can see a NotFound page if I try to reach a page that does not exist so that I know it's my fault
- **Error** I can see an Error page if there is any error in the server.
-  **Signup:** I can sign up in the platform so that I can login in the app.
-  **Login:** As a user I can login to the platform so that I can start exploring the app. 
-  **Logout:** As a user I can logout from the platform.
-  **List of Wods** As a user I can see crossfit workouts so I can choose one to do.
-  **Add Benchmarks** As a user I can add benchmarks for different workouts and see my progress.
-  **Search Users** As a user I want search for other users, see their profile and add them to the friends list.
-  **Add to favorites** As a user I want to add a workout to favorite so that I can have easy access to the ones I liked the most.
-  **Add Comment** As a user I want to comments to the workouts so I can share my experiences with the rest of the users.
-  **See my favorites** As a user I want to see my favorite restaurantes so that I can see the ones I liked the most
-  **See my friends** As a user I want to see my friends list so that I can easily access their profile.  
-  **See my benchmarks** As a user I want to see my benchmarks so that I can keep track of my progress.
-  **See ranking** As a user I want to see the best scores of each workout.

## Backlog

Admin panel:
- implement the admin role and give it special 

# Client

## Routes

- / - Landingpage
- /auth/signup - Signup form
- /auth/login - Login form
- /home - Home page
- /wods/:type - wods list divided by type
- /:wodId/details - wod details
- /search/:search - search results
- /profile/:userId - user details
- /error - error page
- /profile - my profile
- /profile/friends - my list of friends
- /profile/benchmarks - my benchmarks
- /profile/fav-wods - my favorite wods

## Pages

- Landing Page (public)
- Sign up Page (anon only)
- Log in Page (anon only)
- Home Page (user only)
- Wods List Page (user only)
- Wod details Page (user only)
- Search results Page (user only)
- Users' profiles Page (user only)
- My profile Page (user only)
- My benchmarks Page (user only)
- My favorite wods Page (user only)
- My friends list Page (user only)
- Error Page (public)
- Not Found Page (public)

## Components

- Add benchmark form
- BenchmarkList
- EditBenchmark form
- FavWods list
- Friends list
- Line Chart
- My best time
- NavBar
- Ranking



## Services

- Auth Services
- Benchmark services
- Comment services
- Config services
- Profile services
- Upload services
- Wod services


# Server

## Models

User model

```
username 
email 
password 
img
role
friends
favWods 
```

Comment model

```
user 
wod 
title 
comment 
```

Benchmark model

```
user 
wod 
score
date 
```

Wod model

```
creator 
wodType 
category 
name
description
exercises
equipment 
```
## API Endpoints/Backend Routes

**Auth routes**
- GET /api/auth/verify
- POST /api/auth/signup
- POST /apu/auth/login

**Benchmarks routes**
- POST /api/benchmarks/:wodId
- GET /api/benchmarks/:wodId
- GET /api/benchmarks/:userId
- GET /api/benchmarks/:wodId/highscores
- GET /api/benchmarks/:wodId/fortime/highscore
- GET /restapi/benchmarks/:wodId/all
- PATCH /api/benchmarks/:benchmarkId
- DELETE /api/benchmarks/:benchmarkId

**Comments routes**
- POST /api/comment/:wodId
- GET /api/comment/:wodId
- PATCH /api/comment/:commentId
- DELETE /api/comment/:commentId

**Profile routes**
- GET /api/profile/info
- PATCH /api/profile/info
- POST /api/profile/:userId/add-friend
- GET /api/profile/friends
- GET /api/profile/friendsIds
- POST /api/profile/:userId/delete-friend
- GET /api/profile/fav-wods
- GET /api/profile/mybenchmarks
- GET /api/profile/search-users
- GET /api/profile/:userId/info
- GET /api/profile/random-users

**Wods routes**
- GET /api/wods/:type
- GET /api/wods/random
- GET /api/wods/:wodId/details
- PATCH /api/wods/:wodId
- DELETE /api/wods/:wodId
- POST /api/wods/create
- POST /api/wods/:wodId/add-fav
- POST /api/wods/:wodId/delete-fav




## Links


### Git

The url to your repository and to your deployed project

[https://github.com/paularbaeza/wodaholics-client.git](http://github.com)
[https://github.com/paularbaeza/wodaholics-server.git](http://github.com)

[https://wodaholics.netlify.app](http://heroku.com)

### Slides

The url to your presentation slides

[https://docs.google.com/presentation/d/1-Z6AHpBAGybCBpiKYSf7UoznMvDyWgMf-RB5wweOXMk/edit#slide=id.p](http://slides.com)