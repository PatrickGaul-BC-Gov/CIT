# Generated by Django 2.2.16 on 2021-04-13 16:15

import django.contrib.gis.db.models.fields
from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0179_auto_20220507_2312'),
    ]

    operations = [
        migrations.RunSQL("""DROP VIEW IF EXISTS public.cit_regions_distribution_vw;
        CREATE OR REPLACE VIEW public.cit_regions_distribution_vw AS
          SELECT DISTINCT 'All of British Columbia'::text AS zone_type,
    'All of British Columbia'::text AS zone_name,
	1::text AS zone_id,
    csd.census_subdivision_id
   FROM pipeline_cen_prof_detailed_csd_attrs_sp csd
UNION
 SELECT DISTINCT 'Regional District'::text AS zone_type,
    rd.name AS zone_name,
	rd.area_id::text AS zone_id,
    csd.census_subdivision_id
   FROM pipeline_linkagewithcensus lk
     JOIN pipeline_cen_prof_detailed_csd_attrs_sp csd ON lk.census_subdivision_id = csd.census_subdivision_id
     JOIN pipeline_regionaldistrict rd ON lk.regional_district_id = rd.area_id::bigint::double precision
UNION
 SELECT DISTINCT 'Census Subdivision'::text AS zone_type,
    csd.census_subdivision_name AS zone_name,
	csd.census_subdivision_id::text AS zone_id,
    csd.census_subdivision_id
   FROM pipeline_cen_prof_detailed_csd_attrs_sp csd
UNION
 SELECT 'Tourism Region'::text AS zone_type,
    tr.tourism_region_name AS zone_name,
	tr.tourism_region_id::text AS zone_id,
    csd.census_subdivision_id
   FROM pipeline_linkagewithcensus lk
     JOIN pipeline_cen_prof_detailed_csd_attrs_sp csd ON lk.census_subdivision_id = csd.census_subdivision_id
     JOIN pipeline_tourismregion tr ON lk.tourism_region_id = tr.tourism_region_id::text
UNION
 SELECT 'Economic Region'::text AS zone_type,
    er.name AS zone_name,
	er.economic_region_id::text AS zone_id,
    csd.census_subdivision_id
   FROM pipeline_linkagewithcensus lk
     JOIN pipeline_cen_prof_detailed_csd_attrs_sp csd ON lk.census_subdivision_id = csd.census_subdivision_id
     JOIN pipeline_censuseconomicregion er ON lk.economic_region_id = er.economic_region_id
UNION
 SELECT 'Wildfire Zone'::text AS zone_type,
    wf.zone_name,
	wf.zone_id::text,
    csd.census_subdivision_id
   FROM pipeline_linkagewithcensus lk
     JOIN pipeline_cen_prof_detailed_csd_attrs_sp csd ON lk.census_subdivision_id = csd.census_subdivision_id
     JOIN pipeline_bcwildfirezone wf ON lk.bc_fire_zone_id = wf.zone_id
UNION
 SELECT 'Tsunami Zone'::text AS zone_type,
    tz.tsunami_zone_name AS zone_name,
	tz.name::text AS zone_id,
    csd.census_subdivision_id
   FROM pipeline_linkagewithcensus lk
     JOIN pipeline_cen_prof_detailed_csd_attrs_sp csd ON lk.census_subdivision_id = csd.census_subdivision_id
     JOIN pipeline_tsunamizone tz ON lk.tsunami_notification_zone_id = tz.name::bigint::double precision
UNION
 SELECT 'Health Authority'::text AS zone_type,
    ha.name AS zone_name,
	ha.id::text AS zone_id,
    csd.census_subdivision_id
   FROM pipeline_linkagewithcensus lk
     JOIN pipeline_cen_prof_detailed_csd_attrs_sp csd ON lk.census_subdivision_id = csd.census_subdivision_id
     JOIN pipeline_healthauthorityboundary ha ON lk.health_authority_id = ha.id
UNION
 SELECT 'School District'::text AS zone_type,
    sd.name AS zone_name,
	sd.area_id::text AS zone_id,
    csd.census_subdivision_id
   FROM pipeline_linkagewithcensus lk
     JOIN pipeline_cen_prof_detailed_csd_attrs_sp csd ON lk.census_subdivision_id = csd.census_subdivision_id
     JOIN pipeline_schooldistrict sd ON lk.school_district_id = sd.area_id
UNION
 SELECT 'Natural Resource Region'::text AS zone_type,
    nrr.name AS zone_name,
	nrr.id::text AS zone_id,
    csd.census_subdivision_id
   FROM pipeline_linkagewithcensus lk
     JOIN pipeline_cen_prof_detailed_csd_attrs_sp csd ON lk.census_subdivision_id = csd.census_subdivision_id
     JOIN pipeline_naturalresourceregion nrr ON lk.natural_resource_region_id = nrr.id;;""")
    ]
