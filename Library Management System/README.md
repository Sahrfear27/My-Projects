# Server Setup
## The app uses json-server to simulate a backend API. The server configuration and db.json file are located in the server directory. This serves as the data source for the application's CRUD operations.

# Features
1. Author Management (CRUD)
Create Author: A form for adding new authors. The app checks for duplicate entries to ensure no duplicate authors are created.
Read Authors: A list view displaying all authors. Users can tap on an author to view more details.
Update Author: Edit author details through a form, accessible by selecting an author from the list.
Delete Author: Authors can be removed with a confirmation prompt to prevent accidental deletion.
2. Publisher Management (CRUD)
Create Publisher: Add new publishers using a form. Similar validation checks as authors.
Read Publishers: View a list of all publishers, with additional detail views available.
Update Publisher: Edit publisher details, accessible from the list view.
Delete Publisher: Remove publishers with confirmation.
3. Book Management (CRUD)
Create Book: Add books with details like title, genre, and category. Authors and publishers are selected from dropdown lists populated with existing entries.
Read Books: Display books in a list or grid view with filtering options based on various attributes.
Update Book: Modify book details through an edit page.
Delete Book: Books can be removed with a confirmation prompt.
4. Member Management (CRUD)
Create Member: Add new members, ensuring each member has a unique ID.
Read Members: View all members in a list with options to view more details.
Update Member: Edit member details through an accessible form.
Delete Member: Members can be deleted with a confirmation prompt.
5. Book Search
Search by Title: A search bar filters the list of books based on the title as the user types.
6. Book Borrowing
Borrow a Book: Users can select a book and a member to borrow a book. The app decreases the available copies by 1 and prevents borrowing if no copies are available.
7. Book Return
Return a Book: Similar to borrowing, but increases the available copies by 1 when a book is returned.
8. User Authentication
Login: Users sign in with their email addresses. If the email exists in the database, access is granted; otherwise, a "Wrong email" message is displayed.
Persistent Login: Users remain logged in even when reopening the app.
Logout: Users can log out of the app.
