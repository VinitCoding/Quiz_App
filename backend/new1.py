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

app = FastAPI()
router = APIRouter()

DATABASE_URL = r"mysql+pymysql://root:Standyou_581@localhost:3306/Intern_exams"
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

SECRET_KEY = "1f722951528fc31ae012c37d7bbaf8f2d0e4e10a70f1b1dd67beeec83075eaa5"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
bearer_scheme = HTTPBearer()


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: str = Field(nullable=False)
    email: str = Field(unique=True, nullable=False)
    password: str = Field(nullable=False)
    mobile_no: str = Field(nullable=False)
    date: datetime = Field(default_factory=datetime.utcnow)

class OTP(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(nullable=False)
    otp: str = Field(nullable=False)
    expiration_time: datetime = Field(nullable=False)

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

    
SQLModel.metadata.create_all(bind=engine)

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

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def one_time_password(to_mail: str, db: Session) -> str:
    otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])
    expiration_time = datetime.utcnow() + timedelta(minutes=5)

    db_otp = OTP(email=to_mail, otp=otp, expiration_time=expiration_time)
    db.add(db_otp)
    db.commit()

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

    return otp

def check_otp(email: str, user_otp: str, db: Session) -> dict:
    otp_record = db.query(OTP).filter(OTP.email == email).first()
    if otp_record and otp_record.otp == user_otp and otp_record.expiration_time > datetime.utcnow():
        return {"status": True, "Message": "OTP Verification Successful"}
    else:
        return {"status": False, "Message": "OTP Verification Failed"}


# @router.post("/users/", response_model=dict)
# def create_user(full_name: str, email: str, password: str, confirm_password: str, mobile_no: str, db: Session = Depends(get_db)):
#     existing_user = db.query(User).filter((User.email == email) | (User.mobile_no == mobile_no)).first()
#     if password != confirm_password:
#         raise HTTPException(status_code=400, detail="Password and confirm password do not match")
    
#     if existing_user:
#         raise HTTPException(status_code=400, detail="User with this email or phone number already exists.")

#     hashed_password = get_password_hash(password)
#     db_user = User(full_name=full_name, email=email, password=hashed_password, mobile_no=mobile_no)
    
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
    
#     return {"id": db_user.id, "full_name": db_user.full_name, "email": db_user.email}


@router.post("/users/", response_model=dict)
def create_user(user_details:UserDetails, db: Session = Depends(get_db)):
    response = {'status':False}
    full_name = user_details.full_name
    email = user_details.email
    password = user_details.password
    confirm_password = user_details.confirm_password
    mobile_no = user_details.mobile_no

    existing_user = db.query(User).filter((User.email == email) | (User.mobile_no == mobile_no)).first()
    if password != confirm_password:
        raise HTTPException(status_code=400, detail="Password and confirm password do not match")
    
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email or phone number already exists.")

    hashed_password = get_password_hash(password)
    db_user = User(full_name=full_name, email=email, password=hashed_password, mobile_no=mobile_no)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    response["status"] = True
    response['full_name'] =db_user.full_name
    response['email'] = db_user.email
    
    return response
    # return {"id": db_user.id, "full_name": db_user.full_name, "email": db_user.email}

    


    
@router.post("/login", response_model=Token)
def login(login_details:LoginUser, db: Session = Depends(get_db)):
    email = login_details.email
    password = login_details.password

    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/protected-page")
def protected_page(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme), db: Session = Depends(get_db)):
    user = authenticate_user(credentials, db)
    if not user:
        raise HTTPException(status_code=403, detail="Not authorized")
    return {"message": "Welcome to the protected page!", "user": user}

def authenticate_user(credentials: HTTPAuthorizationCredentials, db: Session):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    return {"username": user.full_name, "email": user.email, "is_admin": user.id}

@router.delete("/delete-user/{email}", response_model=dict)
def delete_user(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()
    return {"message": f"User with email {email} has been deleted successfully."}


@router.get('/send_otp')
def send_otp(email: str, db: Session = Depends(get_db)):
    otp = one_time_password(to_mail=email, db=db)
    return f'OTP sent to {email}'


@router.post('/otp-verification')
def otp_verification(verification:VerifyOTP, db: Session = Depends(get_db)):
    response = {'status':False}
    email = verification.email
    user_otp = verification.user_otp

    print('user_otp : ', user_otp)
    access = check_otp(email=email, user_otp=user_otp, db=db)
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