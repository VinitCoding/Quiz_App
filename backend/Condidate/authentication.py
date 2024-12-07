from fastapi import FastAPI, HTTPException, Depends,APIRouter
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from sqlalchemy import Column, String, Integer, DateTime
from sqlalchemy.orm import sessionmaker, Session
from sqlmodel import SQLModel, Field, create_engine
from datetime import datetime, timedelta
from typing import Optional
import random
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv
import os
import uvicorn
import pytz
from dependencies import user_details, otp_coll, exam_report

app = FastAPI()
router = APIRouter()

SECRET_KEY = "1f722951528fc31ae012c37d7bbaf8f2d0e4e10a70f1b1dd67beeec83075eaa5"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
bearer_scheme = HTTPBearer()


class User(BaseModel):
    id: Optional[int]
    full_name: str
    email: str
    password: str
    mobile_no: int

class OTP(BaseModel):
    id: Optional[int]
    email: str 
    otp: str 

class Token(BaseModel):
    access_token: str
    token_type: str


class UserDetails(BaseModel):
    full_name: str
    email: str
    password: str
    confirm_password: str
    mobile_no: int

class LoginUser(BaseModel):
    email: str
    password: str

class VerifyOTP(BaseModel):
    email: str
    user_otp: str

    
# SQLModel.metadata.create_all(bind=engine)

def get_password_hash(password: str) -> str:
    return password_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

def one_time_password(to_mail: str) -> str:
    otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])
    expiration_time = datetime.utcnow() + timedelta(minutes=5)

    otp_db = {'email': to_mail,
              'otp':otp,
               'expiration_time': expiration_time}

    load_dotenv()
    password = os.getenv('password')
    server = smtplib.SMTP('smtp.office365.com', 587)
    from_mail = 'aditya.singh@chistats.com'
    server.starttls()
    server.login(from_mail, password)

    message = EmailMessage()
    message['subject'] = "OTP Verification"
    message['from'] = from_mail
    message['To'] = to_mail
    message.set_content(f'Your OTP for chistats Internship exam is: {otp}')

    server.send_message(message)
    server.quit()

    otp_coll.insert_one(otp_db)

    return otp

def check_otp(email: str, user_otp: str) -> dict:

    otp_record = otp_coll.find_one({'email':email})
    otp_str = otp_record['otp']
    expiration_time = otp_record['expiration_time']
    print(otp_str)
    if otp_str == user_otp and expiration_time > datetime.utcnow():
        return {"status": True, "Message": "OTP Verification Successful"}
    else:
        return {"status": False, "Message": "OTP Verification Failed"}


@router.post("/users/", response_model=dict)
def create_user(user_detail:UserDetails):
    response = {'status':False}
    full_name = user_detail.full_name
    email = user_detail.email
    password = user_detail.password
    confirm_password = user_detail.confirm_password
    mobile_no = user_detail.mobile_no

    existing_user = user_details.find_one({"email": email})
    if existing_user:
        raise Exception("User with this email or phone number already exists.")
    
    if password != confirm_password:
        raise HTTPException(status_code=400, detail="Password and confirm password do not match")
    

    hashed_password = get_password_hash(password)
    
    gmt_time = datetime.utcnow()
    ist_timezone = pytz.timezone('Asia/Kolkata')
    ist_time = gmt_time.astimezone(ist_timezone)
    save_date = ist_time.now().strftime('%Y-%m-%d %H:%M:%S')

    user_data = {
        "full_name": full_name,
        "email": email,
        "mobile_no": mobile_no,
        "password": hashed_password,
        "created_on": save_date
    }

    user_report = {
        "full_name": full_name,
        "email": email,
        "exam": "Not Completed",
        "exam_date": None,
        "zone": None,
        "exam_report": {
        "total_questions": None,
        "correct_answers": None,
        "percentage": None
    }
    }

    user_details.insert_one(user_data)

    exam_report.insert_one(user_report)

    response["status"] = True
    response['full_name'] = full_name
    response['email'] = email
    
    return response

    
    
@router.post("/login", response_model=Token)
def login(login_details:LoginUser):
    email = login_details.email
    password = login_details.password

    user = user_details.find_one({"email": email})
    if user is None or not verify_password(password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": email}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/protected-page")
def protected_page(credentials: HTTPAuthorizationCredentials):
    user = authenticate_user(credentials)
    if not user:
        raise HTTPException(status_code=403, detail="Not authorized")
    return {"message": "Welcome to the protected page!", "user": user}

def authenticate_user(credentials: HTTPAuthorizationCredentials):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

    user = user_details.find_one({"email": email})
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    return User(username=user["email"], email=user["email"])

# @router.delete("/delete-user/{email}")
# def delete_user(email: str):
#     querry = {'email' : email}

#     res = user_details.delete_one(querry)
#     if not res:
#         raise HTTPException(status_code=404, detail="User not found")
    
#     res1 = exam_report.delete_one(querry)
#     if not res1:
#         raise HTTPException(status_code=404, detail="User not found in Exam Report")
    
#     if res.deleted_count > 0:
#         return {"message": f"User with email {email} has been deleted successfully."}
#     else:
#         return 'User not Found'



@router.get('/send_otp')
def send_otp(email: str):
    otp = one_time_password(to_mail=email)
    return f'OTP sent to {email}'


@router.post('/otp-verification')
def otp_verification(verification:VerifyOTP):
    response = {'status':False}
    email = verification.email
    user_otp = verification.user_otp

    print('user_otp : ', user_otp)
    access = check_otp(email=email, user_otp=user_otp)
    if access['status']:
        response["status"] = True
        response['message'] = 'OTP Verification Successful'
        # return 
    else:
        response["status"] = False
        response['message'] = 'OTP Verification Failed'
    
    return response

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)