from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
CORSMiddleware,
allow_origins = ['*'],
allow_credentials = True,
allow_methods = ["GET","OPTIONS","POST","DELETE","PUT"],
allow_headers = ["*"],
expose_headers=["*"],
)


from new1 import router as authentication_router
from send_questions import router as questions_router


app.include_router(authentication_router, prefix = '/exam', tags = ['Chistats Internship Exams'])
app.include_router(questions_router, prefix = '/exam', tags = ['Chistats Internship Exams'])