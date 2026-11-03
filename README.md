# Script2App

A Node.js BigID TPA sample that discovers scripts in `scripts/` as app actions and runs selected JavaScript, Python, or shell scripts. The scripts receive BigID execution context through environment variables; their standard output is uploaded as an execution attachment and the result callback is updated when the process exits.

## Supported scripts and context

The action name must match a file under `scripts/`. Supported extensions are `.js` (Node.js), `.py` (Python 3), and `.sh` (sh). The process receives `bigidToken`, `executionId`, `updateResultCallback`, `bigidBaseUrl`, and `tpaId`.

`GET /manifest` builds the manifest from the scripts directory. `POST /execute` starts the selected script. The app listens on **port 3000**.

## Run locally

Requires Node.js and npm; Python 3 is needed for Python scripts, and a POSIX shell for `.sh` scripts.

```sh
npm install
node index.js
```

For Docker:

```sh
docker build -t script2app .
docker run --rm -p 3000:3000 script2app
```

The Dockerfile declares port 8080, but the application code currently listens on 3000; map the container’s actual listening port as shown above.

## Security

This service executes files from `scripts/` and has no authentication layer. Run it only in a trusted, isolated environment and include only reviewed scripts. The sample scripts currently print the BigID token; remove that logging before using real credentials. Do not expose the service or execution logs publicly.

<!-- bigidsecure-community-guidance -->
## BigID Community

This repository is part of [BigID Community](https://github.com/bigidsecure), a place for community members to share code, integrations, examples, and projects with other BigID customers.

Project ownership and support vary by repository. Check the maintainers, license, prerequisites, and compatibility notes before use, and validate the project in your own environment. Unless this repository explicitly says otherwise, do not assume the project is officially supported or maintained by BigID.

Please do not commit credentials, customer data, or other confidential information. Check this repository’s contribution guidance before submitting changes.
