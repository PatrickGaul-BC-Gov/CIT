from django.core.management.base import BaseCommand
from django.utils.timezone import now
from datetime import timedelta
import os, requests, json, re
from requests.auth import HTTPBasicAuth

from pipeline.models.opportunity import Opportunity
from pipeline.models.users.user import User

class Command(BaseCommand):
    def handle(self, *args, **options):
        email_enabled = os.environ.get("EMAIL_NOTIFICATIONS_ENABLED")
        if email_enabled not in ["True", "true"]:
            print("Email notifications are not currently enabled")
            return
        stale_time = now() - timedelta(days=90)
        print("Notifying opportunities last modified before: " + str(stale_time))
        stale_opportunities = Opportunity.objects.filter(date_updated__lte=stale_time,deleted=False,approval_status="PUBL").exclude(user_id__email__in=['', 'Unknown'])
        print("Total stale opportunities to be notified:" + str(stale_opportunities.count()))

        email_opportunity_mapping = {}
        for opportunity in stale_opportunities:
            print("Sending notification for opportunity with ID " + str(opportunity.id))
            edo_email = get_edo_email_for_opportunity(opportunity.id)
            if edo_email in email_opportunity_mapping:
                email_opportunity_mapping[edo_email].append(opportunity)
            else:
                email_opportunity_mapping[edo_email] = [opportunity]

        for email in email_opportunity_mapping:
            print(email)
            email_result = send_reminder_email(email, email_opportunity_mapping[email])
            if email_result.status_code == 201:
                print("Successfully sent notification for opportunity with ID " + str([mapped_opportunity.id for mapped_opportunity in email_opportunity_mapping[email]]))
            else:
                print("Error from email API: " + str(email_result.status_code))
                print("Unable to send notification for opportunity with ID " + str([mapped_opportunity.id for mapped_opportunity in email_opportunity_mapping[email]]))
                print(email_result.text)

def send_reminder_email(email, opportunity_list):
    token_request_body = {'grant_type': 'client_credentials'}
    response = requests.post(os.environ.get("EMAIL_AUTH_HOST"), data=token_request_body, auth=HTTPBasicAuth(os.environ.get("EMAIL_CLIENT_ID"),os.environ.get("EMAIL_CLIENT_SECRET")))       
    if response.status_code == 200:
        access_token = response.json()["access_token"]
        headers = {
            "Authorization": "Bearer " + access_token,
            "Content-Type": "application/json",
        }
        response = requests.get(os.environ.get("EMAIL_SERVICE_HOST") + "/api/v1/health", headers=headers)
        if response.status_code == 200:
            email_config = {
                "bcc": [],
                "bodyType": "html",
                "body": construct_email_body(opportunity_list),
                "cc": [],
                "delayTS": 0,
                "encoding": "utf-8",
                "from": os.environ.get("EMAIL_SENDING_ADDRESS"),
                "priority": "normal",
                "subject": "Action required: Update your Investment Opportunity Listings",
                "to": [email],
                "tag": "CIT_Admin_Notification",
            }
            email_config_json = json.dumps(email_config)
            response = requests.post(os.environ.get("EMAIL_SERVICE_HOST") + "/api/v1/email", data=email_config_json, headers=headers)
        return response

def construct_email_body(opportunity_list):
    opportunity_links = ""
    for opportunity in opportunity_list:
        opportunity_links = opportunity_links + "<p>"    
        opportunity_links = opportunity_links + build_individual_opportunity_link(opportunity)
        opportunity_links = opportunity_links + "</p>"

    email_body = "<p>Hello again! It has been over 90 days since you modified one or more of your listings on the Investment Opportunities Tool. Please help us ensure the tool remains useful for investors by confirming that your listings are still available. If a listing has been sold or is no longer available, please remove the listing. You may wish to promote a new investment opportunity in your community instead.</p>"
    email_body = email_body + "<p>To renew a listing, please log-in to <a href=\"" + build_full_dashboard_link() +  "\">your dashboard</a> on the Investment Opportunities Tool. Click “edit” to review that all the listing information is still correct. Once you re-submit your listing, it will be reviewed and published to the Opportunities Tool again. Thanks for helping investors find their next opportunity in B.C.!</p>"
    email_body = email_body + "<p>Click here to view the listing(s):</p>"
    email_body = email_body + opportunity_links
    return email_body

def get_edo_email_for_opportunity(id):
    opportunity = Opportunity.objects.get(id=id)
    edo = User.objects.get(id=opportunity.user_id)
    return edo.email

def build_full_dashboard_link():
    return os.environ.get("EMAIL_OPPORTUNITY_LINK_HOST") + "/investmentopportunities/dashboard"

def build_individual_opportunity_link(opportunity):
    opportunity_view_link = os.environ.get("EMAIL_OPPORTUNITY_LINK_HOST") + "/investmentopportunities/view/" + to_kebab_case(opportunity.opportunity_name) + "-" + str(opportunity.id)
    return opportunity_view_link

def to_kebab_case(opportunity_title):
    title_regex_match_list = re.findall("/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g", opportunity_title)
    separator = "-"
    kebab_case_title = separator.join(title_regex_match_list).lower()
    return kebab_case_title
