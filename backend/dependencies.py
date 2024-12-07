import pymongo

try:
    client = pymongo.MongoClient('mongodb://localhost:27017/')


    user = client["user"]
    user_details = user['user_details']
    otp_coll = user['OTP']
    exam_report = user['Exam_Report']

    user_exams = client['User_Exams']
except ConnectionError:
    print("Failed to connect to MongoDB server")