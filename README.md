# BigID Script2App

Script2App allows you to run NodeJS, Python, and Bash scripts as BigID apps. 

## Install

Run the Script2App Docker image inside your BigID App Server (Docker Compose install) or BigID Kubernetes Cluster (Kubernetes install). This allows the application to be accessible to your BigID install, but not to the internet. You will also want to create a directory for your scripts to be run and mount that as a volume.

For example:
```
mkdir scripts
docker run --network compose_default --hostname script2app -v ${PWD}scripts:/usr/src/app/scripts ghcr.io/bigexchange/script2app:release
```

Then inside BigID you can install the app with the URL ``http://script2app:3000/``


## Usage

The app will have actions for each script you placed inside the scripts folder created during install. The following environment variables will be passed into your app:

   - bigidToken - The BigID API token to access API endpoints
   - executionId - The ID of this execution of your script. This can be used to update the status displayed in BigID or for storing files
   - updateResultCallback - The URL you can send status updates to. This will be stored within the Activity Log of your app.
   - bigidBaseUrl - The API of the BigID server that has called your app
   - tpaId - The app ID of the installed application. You can use this to access TPA storage

There are Python, NodeJS, and Bash sample scripts in the /scripts directory of this repository to give you a start.