# Blogpost - STF22 Web Challenge

Here is the challenge task:

![challenge_task](images/Challenge_Task.png)

Files: [`Source Files`](Blogpost/)

## Overview

For this challenge, the source code of the challenge is provided.

Jumping straight into the web application, we are greeted with a login
page. We can get past the login page by registering an account.

![login](images/step_1_register_login.png)

![blog](images/step_2_logged_in_blog.png)

Looking through the source files, we spot 
[`bot.js`](Blogpost/src/app/bot.js) which sets the flag for this 
challenge as its cookie and visits the blog. This means that to solve
this challenge, we need to leak that cookie likely via some Cross-Site
Scripting (XSS) methods.

The `Create Post` tab on the left allows us to post a title and message 
onto the blog. From a brief `<script>alert(1)</script>` that was 
stored and executed, we noted that XSS is possible.

## Solution

For this solution, you will need a proxy or server which you have access
to and can view incoming requests. One such option is 
[Burp Collaborator](
    https://portswigger.net/burp/documentation/collaborator).

This XSS makes use of the `<img>` tag and changes the location of page
when the image fails to load. The page is our Burp Collaborator URL
appended with `?c=document.cookie` to leak the victim's cookie into
a GET request for our URL.

![XSS](images/step_4_xxs.png)

By checking the recorded incoming request, we obtain our flag.

![flag](images/step_5_check_OOB.png)