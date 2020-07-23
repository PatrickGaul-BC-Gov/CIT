# Generated by Django 2.2.13 on 2020-07-22 16:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0038_hex_isp_service'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='technology',
            field=models.CharField(default='', max_length=63),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='community',
            name='hexuid',
            field=models.ForeignKey(db_column='hexuid', help_text='ID of spatial hex used to color province by connectivity quality.', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='pipeline.Hex'),
        ),
        migrations.AlterField(
            model_name='hex',
            name='avail_10_2',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='hex',
            name='avail_25_5',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='hex',
            name='avail_50_10',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='hex',
            name='avail_5_1',
            field=models.BooleanField(default=False),
        ),
    ]
