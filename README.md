# Expence-Tracker
Made using html, css, javascript and nodejs with mongo, this expence tracker helps users to keep track of their daily expences and income.


STEPS TO RUN

1. DOWNLOAD THE REPOSITORY.

2. GO TO THE DIRECTORY AND OPEN IT WITH VSCODE.

3. INSTALL THE FOLLOWING DEPENDANCIES FROM npm
    a)express
    b)body-parser
    c)mongoose
    d)express-session
    e)ejs
    f)bcryptjs
    
4. MAKE SURE YOU HAVE MONGO INSTALLED.OPEN TWO COMMAND PROMPTS.TYPE 'mongod' IN ONE AND 'mongo' IN ANOTHER.
    TO CHECK THE DATABASE TYPE THIS COMMAND 
    a)use expenctracker
    b)db.users.find().forEach(printjson)
    
   INCASE YOU ARE USING MONGO ATLAS CHANGE THE FOLLOWING URL PRESENT IN expensetraker.js
   ![image](https://user-images.githubusercontent.com/67545429/97851624-9b320080-1d1b-11eb-9a0c-817e93768b08.png)
    
 5. RUN expencetracker.js by TYPING 'node expencetracker' in VSCODE'S TERMINAL.
    OPEN YOUR BROWSER AND PASTE THIS IN URL 'http://localhost:5000/user/register'.
    YOU ARE GOOD TO GO.


WORKING OF EXPENCETRACKER

1.NOW AFTER COMPLETIING THE ABOVE STEPS YOU WILL SEE FOLLOWING IMG

  ![image](https://user-images.githubusercontent.com/67545429/97854775-ebab5d00-1d1f-11eb-8530-200a37c20d6c.png)
  
   HERE YOU NEED TO REGISTER AND IF YOU HAVE ALREADY REGISTERED CLICK ON LOGIN.

2.THIS THE EXPENCETRACKER APP.

  ![image](https://user-images.githubusercontent.com/67545429/97854815-f82fb580-1d1f-11eb-8dd5-a9697e0ba15a.png)

  YOU WILL SEE BALANCE ,LATEST INCOME AND EXPENCE.

ADD ALL YOUR INCOME TRANSACTIONS WITH +NUMBER AS SHOWN.

![image](https://user-images.githubusercontent.com/67545429/97854874-07166800-1d20-11eb-8cb3-adf311ae1484.png)

ADD YOUR EXPENCE TRANSACTIONS WITH -NUMBER AS SHOWN.

   ![image](https://user-images.githubusercontent.com/67545429/97854915-14cbed80-1d20-11eb-8503-043adb3bfb6a.png)
   
3.YOU CAN REMOVE A PERTICULAR TRANSACTION BY CLICKING ON REMOVE ICON.

4.OTHER LINKS

![image](https://user-images.githubusercontent.com/67545429/97854969-20b7af80-1d20-11eb-96b2-4412d332ce12.png)

a)CLIKING ON incometransaction LINK YOU WILL BE ABLE TO SEE ALL ONLY YOUR INCOME TRASACTIONS 
b)CLIKING ON expencetransaction LINK YOU WILL BE ABLE TO SEE ALL ONLY YOUR EXPENCE TRANSACTIONS 
c)CLIKING ON alltransaction LINK YOU WILL BE ABLE TO SEE ALL TRANSACTIONS WITH DATE.

5)MAKE SURE YOU LOGOUT.
