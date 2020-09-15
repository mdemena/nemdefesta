# Nem De Festa '!!!'

## Developers

[Marc De Mena](@mdemena)

## Link to App

https://www.nemdefesta.cat

## Description

An app where users can enjoy experience in local events/parties in catalonia, in my first iteration of this application.

## User Stories

- **event list** - As a user I want to be able to know and search local partys around me or a location of my election.
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

## Backlog

List of other features outside of the MVPs scope

Backoffice:
As an user logged, can manage events, locations of events, activities, etc..

- User can create/edit/delete events
- User can create/edit/delete locations
- User can create/edit/delete actvities

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

| Method | URL    | Description                      |
| ------ | ------ | -------------------------------- |
| GET    | /login | Renders Login Components         |
| POST   | /login | Redirect to / is user logged in. |

```
body:
    - username
    - password
```

| Method | URL     | Description                                 |
| ------ | ------- | ------------------------------------------- |
| GET    | /signup | Renders Signup Component.                   |
| POST   | /signup | Redirect to / is user signed and logged in. |

```
body:
    - name
    - email
    - username
    - password
```

| Method | URL | Description                               |
| ------ | --- | ----------------------------------------- |
| GET    | /   | Renders Events Component                  |
| POST   | /   | Renders Events Component apliying filters |

```
body:
    - fromDate
    - toDate
```

| Method | URL      | Description                                                          |
| ------ | -------- | -------------------------------------------------------------------- |
| GET    | /events  | Renders Events Component                                             |
| GET    | /map     | Render Map Component                                                 |
| GET    | /profile | Redirects to / if user not logged in. Renders ProfileSetup Component |
| POST   | /profile | Redirects to / if user not logged in. Renders ProfileSetup Component |

```
body:
    - name
    - email
    - username
```

| Method | URL             | Description                      |
| ------ | --------------- | -------------------------------- |
| GET    | /profile/:id    | Renders ProfileDetail Component  |
| GET    | /events/:id     | Renders EventDetail Component    |
| GET    | /activities/:id | Renders ActivityDetail Component |

## Models

```
User model
- username: String
- email: String
- name: String
- password: String
- image: String
```

```
Event model
- name: String
- description: String
- type: String
- from: Date
- to: Date
- image: String
- location:
  - name: String
  - address: String
  - formatted_address: String
  - lat: Number
  - lng: Number
- locations: Array of Location id
- images: Array of String
- likes: Array of User id
- unlikes: Array of User id
- assistants: Array of User id
- comments: Array of Comment id
- user: User id
```

```
Location model
- name: String
- address: String
- formatted_address: String
- lat: Number
- lng: Number
- event: Event id
```

```
Activity model
- name: String
- description: String
- type: String
- from: Date
- to: Date
- image: String
- location: Location Id
- images: Array of String
- likes: Array of User id
- unlikes: Array of User id
- assistants: Array of User id
- comments: Array of Comment id
- event: Event id
```

```
Comment model
- title: String
- description: String
- likes: Array of User id,
- unlikes: Array of User id
- event: Event Id
- activity: Activity Id
- user: User Id
```

```
Image model
- title: String
- description: String
- image: String
- likes: Array of User id
- unlikes: Array of User id
- event: Event Id
- activity: Activity Id
- user: User Id
```

## Links

### Wireframes

[Wireframes](https://excalidraw.com/#json=6310275766550528,jC9GmdLS5-t-SHJT2pUBkw)

### Scrum Board

[Notion Scrum Board](https://www.notion.so/mdemena/da39d5bb8fba483eb1eabf75224c91c5?v=53e3d39586de4b6ba4b35b7c6f8efae5)

### Git

[App Repository Link](https://github.com/mdemena/nemdefesta)
[Server Repository Link](https://github.com/mdemena/nemdefesta-server)

### DEV Environment

[App Deploy Link]('https://dev.nemdefesta.cat/')
[Server Deploy Link]('https://server-dev.nemdefesta.cat/')

### PRO Environment

[App Deploy Link]('https://www.nemdefesta.cat/')
[Server Deploy Link]('https://server.nemdefesta.cat/')

### Slides

[Slides Link](https://docs.google.com/presentation/d/1TFT4MVaS1SrD95ApnqPSXj-ORZGGYm_g8NZiNooRmpg/edit?usp=sharing)
