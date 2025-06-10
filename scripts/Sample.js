const fetch = require('node-fetch')

async function main() {
    console.log("Welcome to Script2App!\n")

    console.log("This script has been called from a BigID server with the following data:")
    console.log("Base URL: " + process.env.bigidBaseUrl)
    console.log("Token: " + process.env.bigidToken)
    console.log("Third Party Application (TPA) ID: " + process.env.tpaId)
    console.log("Execution ID: " + process.env.executionId)

    console.log("\nHere's that system's DS connections:")
    const req = await fetch(process.env.bigidBaseUrl + 'ds_connections',
        {
            headers: {
                "content-type": "application/json",
                "authorization": process.env.bigidToken
            }
        }
    );

    console.log(await req.text())
}
return main();