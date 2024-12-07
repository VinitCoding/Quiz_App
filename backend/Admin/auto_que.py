from fastapi import FastAPI,APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
import json
import os
import base64
from typing import Dict

app = FastAPI()
router = APIRouter()

class QuestionInput(BaseModel):
    category: str
    question: str
    options: Dict[str, str]
    answer: str

def read_questions(file_path: str):
    if not os.path.exists(file_path):
        return {"categories": []}
    with open(file_path, 'r') as file:
        return json.load(file)

def write_questions(file_path: str, data):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

@router.post("/add-question")
async def add_question(question_input: QuestionInput):
    questions_file = "new_questions.json"
    
    questions_data = read_questions(questions_file)
    
    question_data = {
        "question": question_input.question,
        "options": question_input.options,
        "answer": question_input.answer,
        "type": "text based" 
    }

    category_exists = False
    for category in questions_data['categories']:
        if category['name'] == question_input.category:
            category_exists = True
            category['questions'].append(question_data)
            break
    
    if not category_exists:
        questions_data['categories'].append({
            "name": question_input.category,
            "questions": [question_data]
        })
    
    write_questions(questions_file, questions_data)
    
    return {"message": "Question added successfully", "data": question_input}

@router.post("/add-image-question")
async def add_image_question(
    file: UploadFile = File(...),
    category: str = Form(...),
    options: str = Form(...),
    answer: str = Form(...) 
):
    questions_file = "new_questions.json"

    options_list = options.split(",")
    options_dict = {
        chr(97 + i): option  # Mapping 'a', 'b', 'c', etc. to the options
        for i, option in enumerate(options_list)
    }

    image_content = await file.read()
    image_base64 = base64.b64encode(image_content).decode('utf-8')

    question_data = {
        "question": image_base64,  
        "options": options_dict,  
        "answer": answer,
        "type": "image based" 
    }

    questions_data = read_questions(questions_file)

    category_exists = False
    for category_item in questions_data['categories']:
        if category_item['name'] == category:
            category_exists = True
            category_item.setdefault('questions', []).append(question_data)
            break

    if not category_exists:
        questions_data['categories'].append({
            "name": category,
            "questions": [question_data]
        })

    write_questions(questions_file, questions_data)

    return {"message": "Image question added successfully", "data": question_data}
