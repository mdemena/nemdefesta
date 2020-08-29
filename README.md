# Nem De Festa '!!!'

## Developers

[Marc De Mena](@mdemena)

## Link to App

https://www.nemdefesta.cat


## Description

An app where users can enjoy experience in local events/parties in catalonia, in my first iteration of this application.


## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **homepage** - As a user I want to be able to know and search local partys around me or a location of my election.
- **event detail** - As a user I want to see the event detail and so that I can decide if I want assist to it, like, comments, etc..
- **event like** - As a user I want to like/unlike local event/party.
- **event assist** - As a user I want to set I assist to local event/party.
- **event add comments** - As a user I want to put comments of the event, we need be loggedin.
- **event comments like** - As a user I want to like event comments.
- **activity detail** - As a user I want to see the event activity to event and so that I can decide if I want assist to it, like, comment, etc..
- **activity like** - As a user I want to like local event/party.
- **activity assist** - As a user I want to set I assist to local event/party.
- **activity add comments** - As a user I want to put comments of the event activity, we need be loggedin.
- **activity comment like** - As a user I want to like activity comments.
- **sign up** - As a user I want to sign up on the applicaction so that I can see all information refer to me and events that I could attend, etc..
- **login** - As a user I want to be able to log in on the application so that I can get back to my account.
- **logout** - As a user I want to be able to log out from the application so that I can make sure no one will access my account.
- **profile** - As a user I want view and update all information refered to me. Can upload an avatar, view my interactions (Comments, Assitance, etc..)
- **event create** - As a user I want create a new local event/party.
- **activity create** - As a user I want I want create a new activity in a local event/party.

## Backlog

List of other features outside of the MVPs scope

Photos:

- User can upload images for an event or activity.

Competitions:
In some towns like Granollers or Sant Celoni, during local event/party it plays a competition between 2 or more teams (Blanc and Blaus in Granollers, Montsenys and Montnegres in Sant Celoni, etc.)

- Set teams for local event/party competition.
- Set puntable activities.
- Set results of activity competitions.
- Show results of competitions in activities and local event/party.

Push Notifications:

- User can subscribe to receive notificactions for activities.
- User can subscribe to receive notifications for competition results, when will be applied.
- Receive a notification when starts a subscribed activity.
- Receive a notificacion when has new competition result information, when will be applied.
  

## Routes

| Method | URL        | Description                        |
| ------ | ---------- | ---------------------------------- |
| POST   | /api/login | Return User data if user logged in |
```
body:
    - email
    - password
```

| Method | URL         | Description                                     |
| ------ | ----------- | ----------------------------------------------- |
| POST   | /api/signup | Add user and return user data if user signup in |
```
body:
    - email
    - password
```

| Method | URL          | Description           |
| ------ | ------------ | --------------------- |
| GET    | /api/user/   | Return User data      |
| DELETE | /api/user/id | Delete User           |
| PUT    | /api/user/   | Update User data info |
```
body:
    - email
    - name
```

| Method | URL              | Description       |
| ------ | ---------------- | ----------------- |
| PATCH  | /api/user/upload | Update User image |
```
body:
    - image
```

| Method | URL                  | Description                      |
| ------ | -------------------- | -------------------------------- |
| POST   | /api/user/checkemail | Check if email exist in database |
```
body:
    - email
```

| Method | URL            | Description                                                                                     |
| ------ | -------------- | ----------------------------------------------------------------------------------------------- |
| GET    | /api/events/   | Return events list, without params nearest by date. With params for location or GPS Coordinates |
| GET    | /api/events/id | Return event details: Event data, activities, comments, etc.                                    |
| POST   | /api/events/   | Create a new event and return event details: Event data                                         |
| DELETE | /api/events/id | Delete event and all info related, then return event details: Event data                        |
| PUT    | /api/events/id | Update event info and return event details: Event data                                          |
```
body:
    - name
    - description
    - from
    - to
    - image
    - location
    - image
```

| Method | URL                   | Description        |
| ------ | --------------------- | ------------------ |
| PATCH  | /api/events/upload/id | Update event image |
```
body:
    - image
```

| Method | URL                      | Description                         |
| ------ | ------------------------ | ----------------------------------- |
| PATCH  | /api/events/like/id      | Add a like to event                 |
| PATCH  | /api/events/favourite/id | Add an event to user favourite list |

| Method | URL                | Description                                                                       |
| ------ | ------------------ | --------------------------------------------------------------------------------- |
| GET    | /api/activities    | Return activities list from an eventid put in params.                             |
| GET    | /api/activities/id | Return activity details: Activity data, comments, etc.                            |
| POST   | /api/activities/id | Create a new activity in a event and return actibity details: Activity data       |
| DELETE | /api/activities/id | Delete activity and all info related, then return activity details: Activity data |
| PUT    | /api/activities/id | Update event info and return event details: Event data                            |
```
body:
    - name
    - description
    - from
    - to
    - image
    - location
    - image
```

| Method | URL                   | Description        |
| ------ | --------------------- | ------------------ |
| PATCH  | /api/events/upload/id | Update event image |
```
body:
    - image
```

| Method | URL                      | Description                         |
| ------ | ------------------------ | ----------------------------------- |
| PATCH  | /api/events/like/id      | Add a like to event                 |
| PATCH  | /api/events/favourite/id | Add an event to user favourite list |

## Models

```
User model
- username: String
- password: String
- image: String
- description: String
- escape-rooms: Array

```
```
EscapeRoom model
- name: String
- adress: String
- description: String
- schedule: enum
- date: 
- time: 
```
```
Event model
- escape-room: Object ID
- creator: Object ID
- date: 
- time: 
```


## Links

### Wireframes

[Wireframes](https://excalidraw.com/#json=6310275766550528,jC9GmdLS5-t-SHJT2pUBkw)

### Git

[Repository Link](http://github.com)

[Deploy Link]('https://escape-rooms-fm.herokuapp.com/ ')


### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
