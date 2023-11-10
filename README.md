![StackUp Banner]([https://tinkerhub.frappe.cloud/files/stackup%20banner.jpeg])
# Wecontact
"weContact" distinguishes itself as an innovative, relevant, and user-friendly initiative intricately designed to simplify contact management for every user. Featuring an uncomplicated interface coupled with robust features, weContact seamlessly facilitates storing, editing, categorizing, searching, sorting, and deleting user contacts—all with just a few clicks.

An additional highlight of "weContact" is its unwavering commitment to user data security. The project incorporates a secure login and signup process, ensuring that only authorized users gain access to their personalized home pages. This stringent authentication protocol effectively prevents unauthorized access and fortifies user information against potential third-party intrusion.

Moreover, prioritizing data privacy, "weContact" has implemented rigorous measures to keep user contacts confidential and shielded from external entities. The handling of sensitive information, including user passwords, is executed with utmost care, with passwords stored in the database only after being hashed—an unreadable format for potential intruders, even administrators without access to these details.

Taking security a step further, the project employs salting, adding random characters to passwords before hashing. This additional layer of protection virtually precludes hackers from deciphering passwords, significantly enhancing overall security. During the login process, password comparison using the same hashing technique ensures that access to the home page is granted only to authorized users.

To enhance user-friendliness, a 'forgot password' section has been incorporated, allowing users to reset their passwords by receiving an OTP to their registered email in case of forgotten credentials.

The project includes robust validation measures. In the login/signup sections, invalid email syntax is promptly flagged as an error. Passwords are required to meet specific criteria, ensuring strength—having at least one uppercase letter, one lowercase letter, one digit, one special character, and a minimum length of 8 characters.

On the home page, to prevent duplicate contact cards, the program verifies new contact details against the database, generating a new card only if no duplicate details exist. This approach minimizes confusion and reduces space complexity.

In the "weContact" project, we leverage MongoDB as our database, Node and Express for our backend, and EJS view engine and Tailwind for frontend development—robust and stable platforms.

## Team members
1. Alex Mathai [https://github.com/Alexmathai2001]
2. Muhammed Rafeeq K [https://github.com/mrafeeqvr805]
3. Shibil Muhammad [https://github.com/shibilmuhammad]
4. Athul N V [https://github.com/athuldfd]
## Team Id
secure3
## Link to product walkthrough
test
[link to video]
## How it Works ?
1.Signup with your Name,Email and a strong password.
https://github.com/Alexmathai2001/stackup-teamplate/blob/master/tests/signup.png

2. Login to your account by using registered account details. you can reset your
   password by clicking on forgot password option.
https://github.com/Alexmathai2001/stackup-teamplate/blob/master/tests/login.png

4. Now You can access home page on successful login. there will be empty on new user interface.
   you can add contacts, search existing contacts and filter existing contacts by using
   contact type like friend,family etc...
https://github.com/Alexmathai2001/stackup-teamplate/blob/master/tests/home.png

5. Add contact section need Contac name,phone number,place,email and type. you can't leave fields empty while
   submitting add form.
https://github.com/Alexmathai2001/stackup-teamplate/blob/master/tests/addcontact.png

6. You can edit existing contact details by using edit option from each contact card.
https://github.com/Alexmathai2001/stackup-teamplate/blob/master/tests/editcontact.png

7. You can able to logout from this account by pressing logout button in header.
https://github.com/Alexmathai2001/stackup-teamplate/blob/master/tests/logout.png

8. Admin page. admins can view users details with username and email id. there is an option
   to sort and search users. and admin can delete user. it will remove user data and all contacts which added
   by the specific user
https://github.com/Alexmathai2001/stackup-teamplate/blob/master/tests/admin.png


## Frameworks and Libraries Used
Client: Tailwind,Javascript,HTML .
Server: Nodejs, Expressjs, and MongoDB.
## How to configure
1. Install node js in your computer
2. Now initialize npm by using npm init command
3. install all packages mentioned in package.json depencies section.
4. You have install tailwind css using postcss plugin and apply its styles by entering
   npm build command.
## How to Run
1. Go to the code section above and download it as a zip.
2. Extract the zip file, then open the extracted folder in vscode.
3. Press ctrl+j on Windows, it will open the terminal to this folder.
4. Now run the command npm start, which will launch this on localhost:4000 and the server at localhost:4000. (If it doesn't redirect you, then manually search localhost:4000).
Done! Now you will be able to see the project running on your system.
