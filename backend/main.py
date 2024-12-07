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


############################   Admin   ########################################
from Admin.admin_login import router as admin_login_router
from Admin.show_result_details import router as result_details_router
from Admin.auto_que import router as auto_question_router
from Admin.delete_user import router as delete_user_router

app.include_router(admin_login_router, prefix = '/admin', tags = ['Admin Portal'])
app.include_router(result_details_router, prefix = '/admin', tags = ['Admin Portal'])
app.include_router(auto_question_router, prefix = '/admin', tags = ['Admin Portal'])
app.include_router(delete_user_router, prefix = '/admin', tags = ['Admin Portal'])

############################   Condidate   ########################################
from Condidate.authentication import router as authentication_router
from Condidate.send_questions import router as questions_router
from Condidate.submit_answers import router as submition_router

app.include_router(authentication_router, prefix = '/exam', tags = ['Chistats Internship Exams'])
app.include_router(questions_router, prefix = '/exam', tags = ['Chistats Internship Exams'])
app.include_router(submition_router, prefix = '/exam', tags = ['Chistats Internship Exams'])
