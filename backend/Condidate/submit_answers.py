from fastapi import FastAPI, HTTPException, Depends, APIRouter
from pydantic import BaseModel
from dotenv import load_dotenv
import os 
import json
from typing import Dict, Optional
from datetime import datetime
from sqlalchemy import inspect
from sqlalchemy import Column, Integer, Boolean, DateTime, Text
from dependencies import user_exams,exam_report


load_dotenv()

app = FastAPI()
router = APIRouter()

class QuestionSubmission(BaseModel):
    username: str
    category_info: Dict


def load_questions():
    with open('new_questions.json') as f:
        return json.load(f)


def store_questions(username: str, questions_data: dict):
    coll_name = f'user_{username}'
    exam_coll = user_exams[coll_name]
    
    for category in questions_data["categories"]:
        category_name = category["name"]
        for question in category["questions"]:
            question_record = {
                "category": category_name,
                "type": question.get("type", "default"),
                "question": question["question"],
                "answer": question["answer"],
                "user_answer": None,
                "is_correct": None
            }
            exam_coll.insert_one(question_record)


# @router.post('/submit')
# def submit_questions(data: QuestionSubmission):
#     questions_data = load_questions()
#     username = data.username
#     all_questions = data.category_info

#     coll_name = f'user_{username}'
#     exam_coll = user_exams[coll_name]

#     results = {}
#     correct_count = 0
#     total_count = 0

#     for category, questions in all_questions.items():
#         for q_id, q_data in questions.items():
#             category_data = next((cat for cat in questions_data["categories"] if cat["name"] == category), None)
#             print('category_data : ', category_data)
#             if category_data:
#                 question = next((q for q in category_data["questions"] if q["question"] == q_data["question"]), None)
#                 if question:
#                     correct_answer = question["answer"]
#                     # print('answers : ', q_data["answer"].lower())
#                     # print('answers : ', q_data)
#                     # print('category : ', category)
#                     # print('question: ', question)
#                     is_correct = q_data["answer"].lower() == correct_answer.lower()
                    
#                     total_count += 1
#                     if is_correct:
#                         correct_count += 1



#     if total_count > 0:
#         total_questions = sum(len(category['questions']) for category in questions_data['categories'])
#         # print('total_questions : ', total_questions)
#         # percentage = (correct_count / total_count) * 100
#         percentage = (correct_count / total_questions) * 100
#     else:
#         percentage = 0

#     if percentage >= 80:
#         zone = "green zone"
#     elif percentage >= 50:
#         zone = "yellow zone"
#     else:
#         zone = "red zone"

#     return {"zone": zone}


def calculate_score_and_percentage(correct_data, user_response):
    total_questions = 0
    correct_answers = 0
    
    for category, questions in user_response["category_info"].items():
        category_data = next((cat for cat in correct_data["categories"] if cat["name"] == category), None)
        if not category_data:
            print(f"Category '{category}' not found in the correct data.")
            continue
        
        for question_key, question_info in questions.items():
            question_index = question_info["questionIndex"]
            
            if question_index < len(category_data["questions"]):
                correct_question = category_data["questions"][question_index]
                if question_info["selectedOption"] == correct_question["answer"]:
                    correct_answers += 1
            
            total_questions += 1


    percentage = (correct_answers / total_questions) * 100 if total_questions > 0 else 0
    
    return {
        "total_questions": total_questions,
        "correct_answers": correct_answers,
        "percentage": percentage
    }
    # return percentage

@router.post('/submit')
def submit_questions(data: QuestionSubmission):
    questions_data = load_questions()
    username = data.username

    user_response = {'category_info' : data.category_info}

    coll_name = f'user_{username}'
    exam_coll = user_exams[coll_name]

    result_details = calculate_score_and_percentage(correct_data=questions_data,user_response=user_response)

    # total_questions = result_details['total_questions']
    # correct_answers = result_details['correct_answers']
    percentage = result_details['percentage']
    
    print('result_details : ', result_details)


    if percentage >= 80:
        zone = "green zone"
    elif percentage >= 50:
        zone = "yellow zone"
    else:
        zone = "red zone"
    

    for category, questions in user_response["category_info"].items():
        category_data = next((cat for cat in questions_data["categories"] if cat["name"] == category), None)
        if not category_data:
            continue
        
        for question_key, question_info in questions.items():
            question_index = question_info["questionIndex"]
            if question_index < len(category_data["questions"]):
                correct_question = category_data["questions"][question_index]
                document = {
                    "category": category,
                    "type": correct_question["type"],
                    "question": correct_question["question"],
                    "options": correct_question["options"],
                    "correct_answer": correct_question["answer"],
                    "selected_answer": question_info["selectedOption"],
                    "is_correct": question_info["selectedOption"] == correct_question["answer"]
                }
                exam_coll.insert_one(document)
    
    result = exam_report.update_one(
        {"email": username},
        {"$set": {
            "exam": "Completed",
            "exam_date": datetime.now(),
            "zone": zone,
            "exam_report": result_details
        }
    }
)

    return {"zone": zone}




