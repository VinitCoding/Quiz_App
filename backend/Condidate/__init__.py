from fastapi import FastAPI

from Condidate.authentication import router as authentication_router
from Condidate.send_questions import router as questions_router
from Condidate.submit_answers import router as submition_router

app = FastAPI()

app.include_router(authentication_router, prefix = '/exam')
app.include_router(questions_router, prefix = '/exam')
app.include_router(submition_router, prefix = '/exam')