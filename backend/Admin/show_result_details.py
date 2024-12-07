from fastapi import FastAPI,  APIRouter
from dependencies import user_exams, exam_report

app = FastAPI()
router = APIRouter()


@router.get('/UsersInfo')
def users_info():
    res = exam_report.find()
    result = []

    for i in res:
        user_report = {
            "full_name": i['full_name'],
            "email": i['email'],
            "exam": i['exam'],
            "exam_date": i['exam_date'],
            "zone": i['zone'],
            "exam_report": i['exam_report']
        }
        result.append(user_report)


    return {"user_report": result}

@router.get('/details')
def details(username:str):
    coll_name = f'user_{username}'
    exam_details = user_exams[coll_name]
    res = exam_details.find()

    result = []

    for i in res:
        question_data = {
            "category": i['category'],
            "Qtype": i['type'],
            "question": i['question'],
            "options": i['options'],
            "correct_answer": i['correct_answer'],
            "selected_answer": i['selected_answer'],
            "is_correct": i['is_correct']
        }
        result.append(question_data)


    return {"exam_details": result}