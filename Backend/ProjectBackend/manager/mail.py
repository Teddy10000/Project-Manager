from django.core.mail import send_mail
from django.template.loader import render_to_string

from_email = 'projectmanagerworldwide100@gmail.com'
recipient_list = ['Akrongkofi@gmail.com'] 


## THIS FUNCTION RENDERS THE HTML TO STRING
def rendering_to_string(url1,url2,header,message):
    email_template = 'account_created.html'
    html_message = render_to_string(email_template, {
    'header': header,
    'message':message,
    'links': [
        {'name': 'Link 1', 'url': url1},
        {'name': 'Link 2', 'url': url2},
    ], 
    })
    return html_message 


def send_email(subject, msg ,Header ,recipient):
    message = rendering_to_string('www.127/00/00','www.127/003', Header, msg)
    send_mail(subject, message,from_email, recipient)
    return print("Email sent successfully!") 


