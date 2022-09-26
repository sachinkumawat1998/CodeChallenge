import asyncio
import requests
import httpx
import json

api_url = "http://127.0.0.1:8000/api/projects"


async def call_api(id):
    async with httpx.AsyncClient() as client:
        print(client)
        result = await client.put(f"{api_url}/{id}/", data=json.dumps({'actual_design': id, 'actual_development': id, 'actual_testing': id}), 
                headers={
                    'Content-Type': 'application/json',
                    'X-CSRFToken': "szWOzX6g0z3q9HIh7wry7hrb4jynA3Sg0URAf3K8CsLCsh1POpV5fMeqRtt61jg7",
                    'sessionid': '7v05x7q58mv08n9ggtnhf3h90hcitzpk'
                    },
                auth=("admin", "admin")
                )
    print(result)
    
async def run_tasks():
   tasks = [call_api(4) for id in range(2)]
   await asyncio.wait(tasks)

def main():
   loop = asyncio.new_event_loop()
   asyncio.set_event_loop(loop)
   loop.run_until_complete(run_tasks())
   loop.close()

main()