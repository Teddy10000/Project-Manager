# Generated by Django 4.2.2 on 2023-07-14 11:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0002_issue_reported_by_issue_task_alter_issue_severity_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='progress',
            field=models.IntegerField(default=0, max_length=2),
        ),
        migrations.AddField(
            model_name='project',
            name='status',
            field=models.CharField(choices=[('completed', 'completed'), ('not completed', 'not completed'), ('In Progress', 'in progress'), ('on Hold', 'on hold')], default='not completed', max_length=20),
        ),
    ]
