### Sending email to remind people living near industrial area about bad air quality
# Yagmail module
Yagmail is one of the python module using for sending emails

```
yag = yagmail.SMTP(user='Your email account', password=Authentication code, host='smtp.qq.com')
```

This function is used to connect to your email account and the email will be sent through this account

```
yag.send(to=['Email address you want to send'], subject='Warn for Air Quality',
                 contents=['contents', 'The air quality is not very well right now. Please wear mask when you get out'])
```

This function is used to decide who you want to send emails and the subject and contents in the mail

# Email sent
In this program, when the value of PM 0.3 exceeds the level we set and the value keep high for a while, it will send an e-mail to remind user about the bad air quality
