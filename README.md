# **API User Guide**

|**Table of Contents:**|
|-|
|[Authentication Routes](#Authentication-Routes)|
|[Buggies Routes](#Buggies-Routes)|

### **Authentication Routes**

Server located at: https://obscure-scrubland-65975.herokuapp.com/

###  **User Registration**:

#### POST */api/register*

Creates a new user.
Returns an object with user info.

Request:
```javascript
{
  username: "testinguser1", // string (required), must be unique
  password: "testing123!", // string (required) 
}
```
Response:

```javascript
{
    id: 6,
    username: "testinguser5",
    password: "encrypted string"
}
```

### **User Login** 
[back to top](#api-user-guide)
#### POST */api/login*

Validates user credentials.
Returns an object with user info and a JSON web token.

Request:
```javascript
{
  username: "tyler", // string (required)
  password: "testing", // string (required)
}
```

Response:
```javascript
{
    "user": {
        "id": 1,
        "username": "tyler",
        "password": "$2a$10$YPwUvaR8euT0fxQDCXPKBerk8YFLZWj.y.cuFB4UAFI3ZxCdKJiqW",
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb25hdGhhbmNoZW4iLCJ1c2VyX3R5cGUiOnRydWUsImlhdCI6MTU4MDgzODEwOCwiZXhwIjoxNTgwODQxNzA4fQ.9OM5MC6Ekel0H3ibvQs6ceX-SgUEPqs7IbFScrZ9q-M"
}
```

## **Buggies Routes**
[back to top](#api-user-guide)

#### GET *api/buggies*

Returns an array of buggies. Available to all users.

Request:
```javascript
// No input needed
```
Response:
```javascript
[
    {
        "id": 1,
        "is_double": true,
        "available": true,
        "location": "toystory"
    },
    {
        "id": 2,
        "is_double": true,
        "available": false,
        "location": "humptydumpty"
    },
    {
        "id": 3,
        "is_double": false,
        "available": true,
        "location": "buzzlightyear"
    }
]
```

#### GET *api/buggies/:id*

Return a buggie object at the specified id.

Request:
```javascript
// No input needed
```
Response:
```javascript
    {
        "id": 1,
        "is_double": true,
        "available": true,
        "location": "toystory"
    }
```

#### GET *api/buggies/pickedup*

An array of buggies that have been picked up by specific users.

Request:
```javascript
// No input needed
```
Response:
```javascript
[
	{
        	"id": 1,
        	"user_id": 2,
        	"buggie_id": 1
    	},
	{
        	"id": 2,
        	"user_id": 1,
        	"buggie_id": 2
    	},
]
```

#### PUT *api/buggies/:id*

Updating buggie, most likely for changing the buggies availability from true to false, and some times for editing a buggies location.

Request:
```javascript
{
	"available": false // required
}
```
Response:
```javascript
{
        "id": 1,
        "is_double": true,
        "available": false,
        "location": "toystory"
    }
```

#### POST *api/buggies*

Posting a new buggie. Available will default to true, and is_double will default to false just incase of input issues. 

Request:
```javascript
{
	"location": "toystory" // required
}
```
Response:
```javascript
{
        "id": 1,
        "is_double": false,
        "available": true,
        "location": "toystory"
    }
```

#### POST *api/buggies/:id/pickup*

When picking a buggy up, a user will navigate to a buggies page. Pass the currently logged in users ID to show relationship between the user and their neww buggie.

Request:
```javascript
{
	"user_id": 2 // required
}
```
Response:
```javascript
{
        "id": 1,
        "user_id": 2,
        "buggie_id": 1
    }
```

