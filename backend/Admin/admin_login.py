from fastapi import FastAPI, HTTPException, Depends,APIRouter
from pydantic import BaseModel


router = APIRouter()

class Admin(BaseModel):
    username: str
    password: str

admin_user = 'chistats'
admin_password = 'chistats@123'

@router.post('/admin_login')
def admin_login(data:Admin):
    response = {'status':False}
    username = data.username
    password = data.password

    if username == admin_user and password == admin_password:
        response['status'] = True
        response['message'] = "Admin logged in successfully"
        # return {"message": "Admin logged in successfully"}
    else:
        response['status'] = False
        response['message'] = 'Incorrect password'
        # return {'message': 'Incorrect password'}
    
    return response
