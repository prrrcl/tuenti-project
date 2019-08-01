# Tuentiyo
## Description
Tuentiyo is a social media that the users can sign-up. When they create their account, they will be able to upload photos, add friends and comment on their photos. Also, they will be able to agrupate those photos on albums and show them on their profile.


## User Stories
**404** - As a User I want to see 404 error page when I go to a non-existance page.

**500** - As a User I want to see 500 error page when I did nothing wrong and it's server problem and not mine.

**Signup** - As a User I want to see a signup page to create my own account.

**Login** - As a User I want to see a login page where I can log in on my account.

**Logout** - As a User I want to be able to logout from the page.

**Personal Page** - As a User I want to see my personal page with my information, my photos, my albums and the comments of my friends on my profile.

**Photos** - As a User I want to be able to upload photos to my profile.

**Albums** - As a User I want to be able to create albums with the photos that I uploaded.

**Search Bar** - As a User I want a search bar to find my friends.

**Friends Page** - As a User I want to get into a friend page and comment their photos.

## Backlog

List of other features outside of the MVPs scope:

- **HomePage**: A home page to show the photos and new feed of your friends.

- **Likes**: See who liked your photo.

- **Personal Space**: A section on my Personal Page that shows some featured posts.

- **Wall**: A section on my Personal Page that shows the comments of my friends.

- **Privacity Profile**: The possibility to change my profile from public to private.



## Routes

Auth routes:

- **"/" -> Login**:
    - **GET**: renders the login form (with flash msg). If User is logged in, it redirect to "/t/home".
    - **POST**: check if the form is filled and check the encrypted password, if it's true, redirect to "/t/home". If not, redirect to "/".

- **"/signup" -> Signup**:
    - **GET**: renders the signup form (with flash msg). If User is logged in, it redirect to "/t/home".
    - **POST**: check if the form is filled and check the encrypted password, if it's true, redirect to "/t/home". If not, redirect to "/".


Main routes:

- **"/t" -> The application will run inside this path:**

- **"/t/home"**:
    - **GET**: render a hbs template.

- **"/t/profile"**: 
    - **GET**: render a hbs template.

- **"/t/profile/edit"**:
    - **GET**: render a hbs template with a form. Shows the User information related to a UserID.
    - **POST**: makes changes to the user information on the db and redirect to "/t/profile".

## Models
User model:
```JavaScript
Username: "String"
Password: "String"
Album: "ObjectID (Model)"
EspacioPersonal: "ObjectID (Model)"
Tablon: "ObjectID(Model)"
Amigos: "Array -> IDs"
Informacion: "ObjectID(Model)"
Mensajes: "ObjectID(Model)"
Estados: "Array"
Privacity: "Boolean"
```

Album model:
```JavaScript
IdUser: "ObjectID"
Nombre: "String"
Fotos: "Array -> ObjectID(Model)"
```

Fotos model:
```JavaScript
IdAlbum: "ObjectID"
Nombre: "String"
Foto: "String"
Comentarios: "ObjectID(Model)"
Like: "Array -> ObjectID"
```

PersonalSpace model:
```JavaScript
IdUser: "ObjectID"
Titulo: "String"
Fecha: "Date"
Content: "String"
```

Tablon model:
```JavaScript
IdUser: "ObjectID"
Fecha: "Date"
Comentario: "String"
Autor: "ObjectID (Usuario que hace el comentario)"
```

ComentariosFoto model:
```JavaScript
IdFoto: "ObjectID"
IdUser: "ObjectID"
Comentario: "String"
```

Like model:
```JavaScript
IdFoto: "ObjectID"
IdUser: "ObjectID"
```

## Links

### Git
Repository Link:
https://github.com/prrrcl/tuenti-project

Deploy link:
http://tuentiyo.herokuapp.com/
