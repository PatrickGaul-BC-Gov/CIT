# Generated by Django 2.2.13 on 2020-09-10 19:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0083_hospital_num_communities_served'),
    ]

    operations = [
        migrations.RenameField(
            model_name='hospital',
            old_name='num_communities_served',
            new_name='num_communities_within_50km',
        ),
    ]
