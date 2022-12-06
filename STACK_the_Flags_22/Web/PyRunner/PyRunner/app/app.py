import uvicorn
from fastapi import FastAPI, Request, Response, Form, File
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse, FileResponse
import subprocess
import random

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/scripts", StaticFiles(directory="scripts"), name="scripts")
templates = Jinja2Templates(directory="templates")
disallowed = ["import", ";", "\n", "eval", "exec", "os"]

scripts = {
    '1': {'name': 'Webserver Template', 
    'file': 'template.py', 
    'arguments': ['title','host','port']}
    ,'2': {'name': 'Webserver Template Duplicate', 
    'file': 'template.py',
    'arguments': ['title','host','port']}
}

def textfilter(text):
    for i in disallowed:
        if i in text:
            text = text.replace(i, "")
    return text


@app.get("/")
def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "scripts": scripts})


@app.get('/template/{id}')
def get_template(id: str):
    if id in scripts:
        with open(f'scripts/{scripts[id]["file"]}', 'r') as file:
            contents = file.read()
            return JSONResponse({'contents': contents, 'arguments': scripts[id]['arguments']})


@app.post('/save-template')
async def save_template(request: Request):
    data = await request.json()
    template = scripts[data['template']]
    with open(f'scripts/{template["file"]}', 'r') as file:
        contents = file.read()
        print(data)
        for argument in template['arguments']:
            contents = contents.replace(f'<{argument}>', textfilter(data['arguments'][argument]))
        filename = f'{random.randint(100000, 999999)}.py'
        with open(f'scripts/{filename}', 'w') as newfile:
            newfile.write(contents)
        return JSONResponse({'url': f'/scripts/{filename}'})


@app.post('/run-template')
async def run_template(request: Request):
    data = await request.json()
    template = scripts[data['template']]
    with open(f'scripts/{template["file"]}', 'r') as file:
        contents = file.read()
        print(data)
        for argument in template['arguments']:
            contents = contents.replace(f'<{argument}>', textfilter(data['arguments'][argument]))
        filename = f'{random.randint(100000, 999999)}.py'
        with open(f'scripts/{filename}', 'w') as newfile:
            newfile.write(contents)
        output = subprocess.run(['python', f'scripts/{filename}'], capture_output=True, text=True)
        # check if output has error
        if output.stderr:
            return JSONResponse({'output': output.stderr})
        return JSONResponse({'output': output.stdout})  


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8888, reload=True)