# Nem De Festa!!!

# Developers: 
[Marc De Mena] (@mdemena)

# Link to App: 
https://www.nemdefesta.cat


## Description

An app where users can enjoy experience in local events/parties in catalonia, in my first iteration of this application.
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **homepage** - As a user I want to be able to know and search local partys around me or a location of my election.
- **event detail** - As a user I want to see the event detail and so that I can decide if I want assist to it, like, comments, etc..
- **event add comments** - As a user I want to put comments of the event, we need be loggedin.
- **event add images** - As a user I want to upload images of the event, we need be loggedin.
- **activity detail** - As a user I want to see the event activity to event and so that I can decide if I want assist to it, like, comment, etc..
- **activity add comments** - As a user I want to put comments of the event activity, we need be loggedin.
- **activity add images** - As a user I want to upload images of the event activity, we need be loggedin.
- **sign up** - As a user I want to sign up on the applicaction so that I can see all information refer to me and events that I could attend, etc..
- **login** - As a user I want to be able to log in on the application so that I can get back to my account.
- **logout** - As a user I want to be able to log out from the application so that I can make sure no one will access my account.
- **profile** - As a user I want I want view and update all information refered to me. Can upload an avatar, view my interactions (Comments, Assitance, etc..)
- **event create** - As a user I want I want create a new local event/party.
- **activity create** - As a user I want I want create a new activity in a local event/party.

## Backlog

List of other features outside of the MVPs scope

User profile:
- see my profile
- upload my pictures and my description
- see other users profile
- search filters
- add friends to the event

Geo Location:
- add geolocation to events when creating
- show event in a map in event detail page
- show all events in a map in the event list page



## ROUTES:

| Method | URL         | Description                                          |
| ------ | ----------- | ---------------------------------------------------- |
| GET    | /auth/login | redirects to / if user logged in. Renders auth/login |
| POST   | /auth/login | redirects to / if user logged in                     |

```
body:
    - username
    - password

```

GET | /auth/signup| redirects to / if user logged in. Renders auth/signup

```
body:
    - username
    - password
```
GET | / | renders the homepage. if the user is not logged in, render access. 
GET | /event/id | renders event-detail
POST | /event/id | update event. redirect /event-detail
```
body:
    - username
    - event id 
    - image
```
GET | /escape-room-list | renders escape-room-list
POST | /logout | redirects to /
GET | /escape-room-detail | renders escape-room-detail
POST | /escape-room/id | 
```
body:
    - username
    - escape-room
    - date
    - reserved time
    - escape-room id
```



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
``` 

## Links

### Wireframes

[Wireframes] (https://excalidraw.com/#json=6310275766550528,jC9GmdLS5-t-SHJT2pUBkw)

### Git

[Repository Link] (http://github.com)

[Deploy Link] ('https://escape-rooms-fm.herokuapp.com/ ')


### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
