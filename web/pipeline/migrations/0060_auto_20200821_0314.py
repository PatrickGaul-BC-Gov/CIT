# Generated by Django 2.2.13 on 2020-08-21 03:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0059_regionaldistrict_schooldistrict'),
    ]

    operations = [
        migrations.RenameField(
            model_name='schooldistrict',
            old_name='school_district_number',
            new_name='sd_num',
        ),
    ]
