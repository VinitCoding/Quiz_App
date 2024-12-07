from fastapi import FastAPI

from Admin.admin_login import router as admin_login_router
from Admin.show_result_details import router as result_details_router
from Admin.auto_que import router as auto_question_router
from Admin.delete_user import router as delete_user_router

app = FastAPI()

app.include_router(admin_login_router, prefix = '/admin')
app.include_router(result_details_router, prefix = '/admin')
app.include_router(auto_question_router, prefix = '/admin')
app.include_router(delete_user_router, prefix = '/admin')