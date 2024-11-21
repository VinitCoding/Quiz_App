from fastapi import FastAPI, HTTPException, Depends,APIRouter
from pydantic import BaseModel
from sqlalchemy import Column, String, Integer, DateTime
from sqlalchemy.orm import sessionmaker, Session
from sqlmodel import SQLModel, Field, create_engine
from typing import Optional, Dict
from dotenv import load_dotenv
import os 
import json

router = APIRouter()

DATABASE_URL = r"mysql+pymysql://root:Standyou_581@localhost:3306/Intern_exams"
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

load_dotenv()
password = os.getenv('password')

class QuestionSubmission(BaseModel):
    category_info : Dict

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def load_questions():
    with open('new_questions.json') as f:
        return json.load(f)

@router.post('/submit')
def submit_questions(data: QuestionSubmission, db: Session = Depends(get_db)):
    questions_data = load_questions()
    all_questions = data.category_info
    
    results = {}
    correct_count = 0
    total_count = 0

    for category, questions in all_questions.items():
        category_data = next((cat for cat in questions_data["categories"] if cat["name"] == category), None)
        if not category_data:
            continue
        
        for q_id, q_data in questions.items():
            question = next((q for q in category_data["questions"] if q["question"] == q_data["question"]), None)
            if question:
                correct_answer = question["answer"]
                is_correct = q_data["answer"].lower() == correct_answer.lower()
                results[q_id] = {"correct": is_correct, "correct_answer": correct_answer}

                total_count += 1
                if is_correct:
                    correct_count += 1

    if total_count > 0:
        percentage = (correct_count / total_count) * 100
    else:
        percentage = 0

    if percentage >= 80:
        zone = "green zone"
    elif percentage >= 50:
        zone = "yellow zone"
    else:
        zone = "red zone"

    # return {"results": results, "percentage": percentage, "zone": zone}
    return {"zone": zone}
