# Headless CMS

Objective:
Create a very rudimenatary headless CMS with extremely basic CRUD functionality. You can imagine this to be an extremely basic version of strapi.js. As an end user, when I run your project, I should be able to create different entities from the frontend by specifying its attributes and their types. (Eg. Person is an entity with attributes name<string>, email<string>, mobileNumber<number>, dateOfBirth<Date>). When an entity is created from frontend, the app should automatically create a table definition, depending on the attributes in an RDMBS (mysql or postgresql only). After creating an entity, I should be able to Create, Read, Update and Delete data in that entity from the frontend itself. (Eg. I should be able to create an entry in the Person entity using name as Ketan, ketan@test.com as the email, 9876543210 as the mobile number and 1-Jan-1990 as the date of birth. I should be able to add, update existing entry, view created entries and delete an existing entry.)

## Technologies Used
- Node.js
- Express.js
- PostgreSQL
- React.js
- Tailwind
Other necessary dependencies

## Setup

1. Clone the repository:

   ```bash
   https://github.com/imsachin49/cms-dynamic-table
   cd cms-dynamic-table
   cd client
   npm install

   Open new terminal:
   cd Vahan-Assignment
   cd server
   npm install

2. Start:

   ```bash
   cd Vahan-Assignment
   cd client
   npm start

   Open new terminal:
   cd Vahan-Assignment
   cd server
   npm start

## Enviornment Variables

- USER
- PASSWORD
- HOST
- PORT
- DATABASE

## ScreenShots:-
![pag1](https://github.com/imsachin49/cms-dynamic-table/assets/108334265/e2f23fa4-623e-4bc9-bb3b-bf678ac9520e)
![page2](https://github.com/imsachin49/cms-dynamic-table/assets/108334265/498b5459-176a-487c-ac40-662c91d29045)
![page4](https://github.com/imsachin49/cms-dynamic-table/assets/108334265/4d884d54-b989-428c-b9e5-559e31fceadb)
![page3](https://github.com/imsachin49/cms-dynamic-table/assets/108334265/c4c6a21f-2de2-4d69-8f23-41ee3e017535)


