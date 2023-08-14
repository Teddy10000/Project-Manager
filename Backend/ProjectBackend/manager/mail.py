import threading
from threading import Thread
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import send_mail

from_email = 'projectmanagerworldwide100@gmail.com'

class EmailThread(threading.Thread):
    def __init__(self, subject, html_content, recipient_list):
        self.subject = subject
        self.recipient_list = recipient_list
        self.html_content = html_content
        threading.Thread.__init__(self)

    def run(self):
        msg = EmailMessage(self.subject, self.html_content, from_email, self.recipient_list)
        msg.content_subtype = "html"
        msg.send()

def rendering_to_string(url1, url2, header, message):
    email_template = 'account_created.html'
    html_message = render_to_string(email_template, {
        'header': header,
        'message': message,
        'links': [
            {'name': 'Link 1', 'url': url1},
            {'name': 'Link 2', 'url': url2},
        ],
    })
    text_content = strip_tags(html_message)

    return html_message, text_content

def send_email(subject, msg, header, recipient):
    with_tags, message = rendering_to_string('www.127/00/00', 'www.127/003', header, msg)
    EmailThread(subject, with_tags, recipient).start()
    return print("Email sending initiated!")

# Example usage
#recipient_list = ['Akrongkofi@gmail.com']
#send_email("Test Subject", "Hello, this is a test message.", "Test Header", recipient_list)
