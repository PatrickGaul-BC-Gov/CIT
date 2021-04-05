from rest_framework import generics
from pipeline.serializers.opportunity.edit import OpportunitySerializer
from pipeline.permissions.IsAuthenticated import IsAuthenticated


class OpportunityView(generics.UpdateAPIView):
    """
    View used to put and patch opportunities in the DB
    """
    serializer_class = OpportunitySerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]
