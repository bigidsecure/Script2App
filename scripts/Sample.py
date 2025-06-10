import os
import requests

print('Welcome to Script2App!')
print('This script has been called from a BigID server with the following data:')
print('Base URL: '+os.getenv('bigidBaseUrl'))
print('Token: '+os.getenv('bigidToken'))
print('Third Party Application (TPA) ID: '+os.getenv('tpaId'))
print('Execution ID: '+os.getenv('executionId'))

print("\nHere's that system's DS connections:")
response = requests.request("GET", os.getenv('bigidBaseUrl')+'ds_connections', headers={'Authorization': os.getenv('bigidToken')})
print(response.text)