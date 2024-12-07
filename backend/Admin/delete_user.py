from fastapi import FastAPI, HTTPException, Depends,APIRouter
from dependencies import user_details, otp_coll, exam_report

router = APIRouter()


@router.delete("/delete-user/{email}")
def delete_user(email: str):
    querry = {'email' : email}

    res = user_details.delete_one(querry)
    if not res:
        raise HTTPException(status_code=404, detail="User not found")
    
    res1 = exam_report.delete_one(querry)
    if not res1:
        raise HTTPException(status_code=404, detail="User not found in Exam Report")
    
    if res.deleted_count > 0:
        return {"message": f"User with email {email} has been deleted successfully."}
    else:
        return 'User not Found'