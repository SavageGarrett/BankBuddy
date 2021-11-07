const axios = require('axios')
import react from "React"

const getTasksFromDB = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "r1rC7mLDKb1Bxc5neUsNt7JtxbSYF9ti3yYUMjkE");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({});

    var requestOptions = {
        method: 'OPTIONS',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode: 'no-cors'
    };

    fetch("https://1u6xfou096.execute-api.us-east-1.amazonaws.com/default/gettersetter_tasks", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

getTasksFromDB()