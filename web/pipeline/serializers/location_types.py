from rest_framework import serializers

from pipeline.models.location_assets import (
    FirstResponder, DiagnosticFacility, TimberFacility, CivicFacility, Hospital, NaturalResourceProject,
    EconomicProject, ServiceBCLocation, School, Clinic, Court, PostSecondaryInstitution,
    ClosedMill, ResearchCentre, Airport,
)


class FirstResponderSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")

    class Meta:
        model = FirstResponder
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_phone",
            "location_website",
            "location_email",
            "category",
            "subcategory",
        )


class DiagnosticFacilitySerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")

    class Meta:
        model = DiagnosticFacility
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "ser_cd_dsc",
        )


class TimberFacilitySerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")

    class Meta:
        model = TimberFacility
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "bus_cat_ds",
        )


class CivicFacilitySerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")

    class Meta:
        model = CivicFacility
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_website",
            "category",
            "subcategory",
            "bus_cat_cl",
            "bus_cat_ds",
        )


class HospitalSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")

    class Meta:
        model = Hospital
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_phone",
            "location_website",
            "location_email",
            "rg_name",
            "sv_description",
            "hours",
        )


class NaturalResourceProjectSerializer(serializers.ModelSerializer):
    standardized_start_date = serializers.DateField(source='get_standardized_start_date_as_date')
    standardized_completion_date = serializers.DateField(source='get_standardized_completion_date_as_date')
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")

    class Meta:
        model = NaturalResourceProject
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_phone",
            "location_website",
            "project_comments",
            "project_description",
            "estimated_cost",
            "update_activity",
            "construction_type",
            "construction_subtype",
            "project_type",
            "developer",
            "architect",
            "project_status",
            "project_stage",
            "project_category_name",
            "provinvial_funding",
            "federal_funding",
            "municipal_funding",
            "green_building_ind",
            "green_building_desc",
            "clean_energy_ind",
            "construction_jobs",
            "operating_jobs",
            "standardized_start_date",
            "standardized_completion_date",
        )


class EconomicProjectSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")

    class Meta:
        model = EconomicProject
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_website",
            "flnro_project_status",
            "project_type",
            "project_category",
            "proponent",
            "eao_project_status",
            "project_comments",
        )


class ServiceBCLocationSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")

    class Meta:
        model = ServiceBCLocation
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_phone",
            "location_website",
        )


class SchoolSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")
    school_district = serializers.SerializerMethodField()

    class Meta:
        model = School
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "district_number",
            "public_or_independent",
            "school_education_level",
            "school_district",
        )

    def get_school_district(self, obj):
        return obj.school_district.name if obj.school_district else None


class PostSecondaryInstitutionSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")

    class Meta:
        model = PostSecondaryInstitution
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "institution_type",
            "economic_development_region",
        )


class ClinicSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")

    class Meta:
        model = Clinic
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_phone",
            "location_website",
            "location_email",
            "sv_description",
            "hours",
        )


class CourtSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")

    class Meta:
        model = Court
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_phone",
            "hours_of_operation",
            "court_level",
        )


class ClosedMillSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")

    class Meta:
        model = ClosedMill
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
        )


class ResearchCentreSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")

    class Meta:
        model = ResearchCentre
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_website",
            "research_specialties",
            "research_centre_affiliation",
            "institution",
            "inst_acrnm",
            "research_sector",
            "cntr_type",
        )


class AirportSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")

    class Meta:
        model = Airport
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_website",
            "location_phone",
            "descriptn",
            "keywords",
            "aer_status",
            "aircr_acs",
            "data_srce",
            "datasrc_yr",
            "elevation",
            "fuel_avail",
            "heli_acs",
            "iata",
            "mx_rway_ln",
            "num_rway",
            "rway_surf",
            "oil_avail",
            "seapln_acc",
        )
