# Generated by Django 4.2.2 on 2023-08-15 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0003_project_progress_project_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='type',
            field=models.CharField(default=None, max_length=50),
        ),
    ]