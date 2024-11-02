import json
from fastapi import FastAPI,APIRouter
from fastapi.responses import JSONResponse

app = FastAPI()
router = APIRouter()

def read_questions(file_path: str):
    with open(file_path, 'r') as f:
        return json.load(f)
    
@router.get("/quiz", response_class=JSONResponse)
async def get_quiz():
    questions_file = "new_questions.json" 
    try:
        questions_data = read_questions(questions_file)
        for category in questions_data['categories']:
            for question in category['questions']:
                question.pop('answer', None)
        return questions_data
    except FileNotFoundError:
        return JSONResponse(status_code=404, content={"message": "Questions file not found."})
    except json.JSONDecodeError:
        return JSONResponse(status_code=500, content={"message": "Error decoding JSON."})