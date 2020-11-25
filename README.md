# mbcbot.github.io

Just a bot Tailored for S5 CSE Mbccet Students ;)

Demo: [View](https://mbcbot.github.io)

(Only Need to authenticate with the bot once)

## Screenshots:

![preloader](loader.png)

![output](final.png)

## Scopes:

1. https://www.googleapis.com/auth/script.external_request
2. https://www.googleapis.com/auth/userinfo.email
3. https://www.googleapis.com/auth/classroom.coursework.me

## Working:

1. Splits Admission number from organization email
1. Scraps User Attendance from http://mbccet.com/login.php by passing required parameters(Admsn no.)
2. Gets Assignment submission details for the required courses(using course id's)
3. Displays the output in html
