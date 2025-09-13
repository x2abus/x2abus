from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime
import smtplib
from email.mime.text import MimeText
from email.mime.multipart import MimeMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class LeadFunnelSubmission(BaseModel):
    firstName: str
    lastName: str
    email: str
    phone: str = ""
    company: str
    role: str
    businessGoals: str
    currentChallenges: str
    budget: str
    timeline: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

def send_lead_email(lead_data: LeadFunnelSubmission):
    """Send lead information to Windsor Online Services email"""
    try:
        # Email configuration (using Gmail SMTP as example)
        # In production, you would use proper email service credentials
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        
        # Create message
        msg = MimeMultipart()
        msg['From'] = "noreply@windsoronlineservices.com"
        msg['To'] = "windsoronlineservices@gmail.com"
        msg['Subject'] = f"New Lead: {lead_data.firstName} {lead_data.lastName} from {lead_data.company}"
        
        # Create email body
        body = f"""
New Lead Submission from Windsor AI Landing Page

CONTACT INFORMATION:
Name: {lead_data.firstName} {lead_data.lastName}
Email: {lead_data.email}
Phone: {lead_data.phone if lead_data.phone else 'Not provided'}
Company: {lead_data.company}
Role: {lead_data.role}

BUSINESS DETAILS:
Business Goals: {lead_data.businessGoals}
Current Challenges: {lead_data.currentChallenges}
Budget: {lead_data.budget}
Timeline: {lead_data.timeline}

Submitted at: {lead_data.timestamp}

---
This lead was generated from the Windsor AI landing page.
Follow up within 24 hours for best conversion rates.
        """
        
        msg.attach(MimeText(body, 'plain'))
        
        # For demo purposes, we'll just log the email content
        # In production, you would configure actual SMTP credentials
        logger.info(f"Lead email would be sent to windsoronlineservices@gmail.com:")
        logger.info(body)
        
        return True
        
    except Exception as e:
        logger.error(f"Error sending lead email: {str(e)}")
        return False

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/lead-funnel")
async def submit_lead_funnel(lead_data: LeadFunnelSubmission):
    """Handle lead funnel form submission"""
    try:
        # Store lead in database
        lead_dict = lead_data.dict()
        await db.leads.insert_one(lead_dict)
        
        # Send email notification
        email_sent = send_lead_email(lead_data)
        
        if email_sent:
            logger.info(f"New lead received from {lead_data.firstName} {lead_data.lastName} ({lead_data.email})")
            return {"success": True, "message": "Lead submission received successfully"}
        else:
            logger.warning(f"Lead stored but email notification failed for {lead_data.email}")
            return {"success": True, "message": "Lead submission received, email notification pending"}
            
    except Exception as e:
        logger.error(f"Error processing lead submission: {str(e)}")
        return {"success": False, "message": "Error processing submission"}

@api_router.get("/leads")
async def get_leads():
    """Get all leads for admin purposes"""
    try:
        leads = await db.leads.find().to_list(1000)
        return {"success": True, "leads": leads}
    except Exception as e:
        logger.error(f"Error fetching leads: {str(e)}")
        return {"success": False, "message": "Error fetching leads"}

# Include the router in the main app
# Mount ForgePilot router
try:
    from .forgepilot.router import router as forgepilot_router
    app.include_router(forgepilot_router)
except Exception as e:
    logger = logging.getLogger(__name__)
    logger.error(f"ForgePilot router failed to mount: {e}")

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
