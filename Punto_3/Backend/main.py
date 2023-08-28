from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import requests
import json
import environ
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta

ALGORITHM = "HS256"
ACCESS_TOKEN_DURATION = 20
SECRET = "201d573bd7d1344d3a3bfce1550b69102fd11be3db6d379508b6cccc58ea230b"

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2 = OAuth2PasswordBearer(tokenUrl="login")

crypt = CryptContext(schemes=["bcrypt"])

env = environ.Env()
environ.Env.read_env()

class User(BaseModel):
    user_name: str
    password: str

class UserDB(User):
    password: str
   
class Data(BaseModel):
    id: str
    tocken: str

users_db = {
    "testuser": {
        "user_name": "testuser",
        "password": "$2a$12$AnV3fz7PzJ7kIBTj5.J1NuxeDFelwXXYIEexqKs8RUtLydXI/Oxc2"
    },
    "testuser2": {
        "user_name": "testuser2",
        "password": "$2a$12$OkG/shazYYWcRU6c/TXPhe7n7su2skoIx4wlzhlHCsnWDQM/sgd0y"
    }
}

def search_user_db(username: str):
    if username in users_db:
        return UserDB(**users_db[username])
    
def user_auth(tocken: str = Depends(oauth2)):
    exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciales de autenticación inválidas",
        headers={"WWW-Authenticate": "Bearer"})

    try:
        username = jwt.decode(tocken, SECRET, algorithms=[ALGORITHM]).get("sub")
        if username is None:
            raise exception

    except JWTError:
        raise exception
    return tocken

@app.post("/login")
async def login(userform: User):

    user_db = users_db.get(userform.user_name)
    if not user_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="El usuario no es correcto")
    
    user = search_user_db(userform.user_name)

    if not crypt.verify(userform.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="La contraseña no es correcta")

    access_token = {"sub": user.user_name,
                    "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_DURATION)}

    return {"access_token": jwt.encode(access_token, SECRET, algorithm=ALGORITHM), "token_type": "bearer"}

@app.get("/{id}")
async def root(id: str):
    
    ## Get card information
    url = env('API_URI_INFO')
    headers = {'accept': 'application/json', 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJtYWFzIiwibmJmIjoxNjkyODE5MTY5LCJpc3MiOiJyYnNhcy5jbyIsImNvbXBhbnkiOiIxMDAyIiwiZXhwIjoxNjk0NTM5OTY5LCJ1c2VyIjoibWlndWVsLnN1YXJleiIsImlhdCI6MTY5MjgxMTk2OSwiR3J1cG9zIjoiW1wiVW5pdmVyc2FsUmVjaGFyZ2VyXCJdIn0.qro57BcxtZCqshoptzTMwuQbmO5fpSBZb0M-Gqwt-_LfY7-j8istQhoNZAxPkSZHBiFlUciBxj4-F4Gy6XIpx5uyfWrG7lyXYZYZsHlXJ9zMpOvKYY8Yj4gPIGw_W4Ui8asCLZjVcehlqF2Mxpvfrn8yxHsPoc3Ki-bOJoGSqMpFf55HG_34OnQ_ZhoZGHk7qqs2YbvNoZ5LuC3CXZ3LBYbktgHRaECEQnr688-XgTMdH6-0vhIxP-GcrmF_ZvfuwTb2RiMMkYTRLy4Q-UVaIv-oRD-cXWNvLoC7PRsfJgIc2tqHfTmeBoskHhotyVKDh-zptIX7_z2IN64IRRtgSw'}
    res = requests.get(url + id, headers=headers)
    

    #Get card balance
    url_balance = env('API_URI_BALANCE')
    res_balance = requests.get(url_balance + id, headers=headers)
    response = {'headers': res.headers, 'status_code': res.status_code, 'content': json.loads(res.text), 'timeElapsed': res.elapsed, 'request': res.request, 'balance': json.loads(res_balance.text), 'status_code_balance': res_balance.status_code}
    return response