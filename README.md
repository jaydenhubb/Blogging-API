# Blogging-API 
This is an Api for a blog app

#### Note:
***I added views to this project to make api calls alot easier for users so in a way,
it's a fullstack app albeit one that still requires a few touches on the frontend since my focus was basically the backend api.***


# Base URL
[blog.com](https://fair-plum-sturgeon-cape.cyclic.app/)

## Navigating the live app
* The home page automacally makes an api call to the server which provides all ***published*** blogs in the database.
   * This home route is paginated and dispalys only 20 blogs at a time. To view next page, add ***"?page=1"*** to the end of the home route. you can change pages by increasing the page number on the home route.
  * On the top of the page are four links:
    * ***jay Blog***: which takes a user to the home page("/').
    * ***sign up***: which takes a user to the sign up page("/signup").
    * ***log in***: which takes a user to the login page("/login").
    * ***jay Blog***: which takes a user to the home page("/create"): This is a protected route that only authenticated users can access.
* Each blog displays the title, author, tags, number of views as well as the time taken to read the blog.
* Both autenticated and unauthenticated users can access all ***published*** blogs by a particular author by clicking ***"here"*** on that particular blog.
* Both autenticated and unauthenticated users can access a single ***published*** blog by a particular author by clicking ***"Get this blog"*** on that particular blog. This increases the number of views on that particular blog.
* Only authenticated users can create a blog.
* creating a blog with an already existing title will fail.
* All newly created blogs are automatically saved in a ***"draft"*** state unless otherwise stated by the author during creation.
* Authenticated users can access their published blogs by clicking ***my published blog*** and access their draft blogs by clicking ***my draft blog***. 
* Draft stated blogs are not displayed on the homepage but authenticated users can acces their own personal draft blogs.
* Authenticated users can update or delete their own person blogs.
* Unauthenticated users cannot update, delete or create blogs.

## Extra info
* MVC pattern 
* Jsonwebtoken for authentication.
* Mongodb for database
