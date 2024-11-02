from fastapi import FastAPI

from new1 import router as authentication_router
from send_questions import router as questions_router


app = FastAPI()

app.include_router(authentication_router, prefix = '/exam')
app.include_router(questions_router, prefix = '/exam')


