const express = require('express');
const fs = require('fs');
const path = require('path');
const forms = require('form-data');
const fetch = require('node-fetch');
const app = express();
const port = 3000 || process.env.PORT;

const spawn = require("child_process").spawn;

const supportedFormats = { 'py': 'python3', 'js': 'node', 'sh': 'sh' }

app.use(express.json());

app.get('/manifest', (req, res) => {
    const scripts = fs.readdirSync(path.resolve('./scripts/'));
    const actions = [];
    scripts.forEach(item => {
        actions.push(
            {
                "action_id": item,
                "description": 'Runs the script ' + item,
                "is_sync": true,
                "action_params": []
            })
    });

    res.json({
        "app_name": "Script2App",
        "description": "This app allows you to execute scripts as a BigID app.",
        "category": "utility",
        "license_type": "FREE",
        "vendor": "BigID",
        "is_interactive": false,
        "actions": actions,
        "global_params": []
    })
});


app.post('/execute', (req, res) => {
    const file = req.body.actionName;
    if (fs.existsSync(path.resolve('./scripts/', file)) == false) {
        console.error('Attempted hack. Is your application internet accessible?');
        return res.status(500).json({
            'statusEnum': 'ERROR',
            'executionId': bigIdData.executionId || 0,
            'progress': 0,
            'message': "Intrusion detected. Invalid action."
        });
    }

    const filetype = file.split('.').pop();
    if (supportedFormats[filetype] === undefined) {
        return res.status(500).json({
            'statusEnum': 'ERROR',
            'executionId': bigIdData.executionId || 0,
            'progress': 0,
            'message': "Intrusion detected. Invalid action."
        });
    }
    const command = spawn(supportedFormats[filetype], [path.resolve('./scripts/', file)], {
        env: {
            ...process.env,
            bigidToken: req.body.bigidToken,
            executionId: req.body.executionId,
            updateResultCallback: req.body.updateResultCallback,
            bigidBaseUrl: req.body.bigidBaseUrl,
            tpaId: req.body.tpaId
        }
    });

    let result = '';
    command.stdout.on('data', function (data) {
        result += data.toString();
    });
    command.on('error', async function (err) {
        result += err.toString();
        result += err.stack.toString();
    });
    command.on('close', async function (code) {
        let form = new forms();
        form.append('file', Buffer.from(result, 'utf8'), { filename: "Log.txt" })
        await fetch(req.body.bigidBaseUrl + "tpa/executions/" + req.body.executionId + "/attachment", {
            method: 'POST',
            headers: {
                'Authorization': req.body.bigidToken
            },
            body: form
        });

        await fetch(req.body.updateResultCallback, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.body.bigidToken
            },
            body: JSON.stringify({
                'statusEnum': code == 0 ? "COMPLETED" : "ERROR",
                'progress': 1,
                'message': "Completed script. Check log for information."
            })
        });
    });

    res.json({
        'statusEnum': 'IN_PROGRESS',
        'executionId': req.body.executionId,
        'progress': 0,
        'message': "Script started"
    });

});

app.listen(port, () => {
    console.log(`Script2App listening on port ${port}`)
})