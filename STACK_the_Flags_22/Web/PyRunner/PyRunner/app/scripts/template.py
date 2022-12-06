import uvicorn
from fastapi import FastAPI, Request, Response, Form, File
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

print("Webserver: <title>")

@app.get("/")
def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

if __name__ == "__main__":
    print("Hello!")
    #uvicorn.run("app:app", host="<host>", port=<port>, reload=True) #TODO: add support for files that don't exit
