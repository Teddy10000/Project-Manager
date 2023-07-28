from django.core.mail import send_mail


from_email = 'projectmanagerworldwide100@gmail.com'
recipient_list = ['Akrongkofi@gmail.com'] 

def send_email(subject, message , recipient):
    send_mail(subject, message,from_email, recipient)
    return print("Email sent successfully!")