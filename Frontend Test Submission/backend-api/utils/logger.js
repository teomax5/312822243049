

const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';


const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ0ZW9tYXg0MzBAZ21haWwuY29tIiwiZXhwIjoxNzUyNzMzNDgyLCJpYXQiOjE3NTI3MzI1ODIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI3ODg5Zjg0Yy02MGM2LTQ3NmEtOGE1Yi1mMzQzZWE0ZGU0ZTYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJ0ZW8gbWF4IGoiLCJzdWIiOiI0NzdmYmI0My05MTUzLTQ5OTktYjY5OS1mYWVmZDg5Y2MzYTIifSwiZW1haWwiOiJ0ZW9tYXg0MzBAZ21haWwuY29tIiwibmFtZSI6InRlbyBtYXggaiIsInJvbGxObyI6IjMxMjgyMjI0MzA0OSIsImFjY2Vzc0NvZGUiOiJ2QUh6S24iLCJjbGllbnRJRCI6IjQ3N2ZiYjQzLTkxNTMtNDk5OS1iNjk5LWZhZWZkODljYzNhMiIsImNsaWVudFNlY3JldCI6IktIZ3h0d21ZdE5FWUNWZkMifQ.tw5zExaX72M30wuFF8W0Mn8mO-ck2xBp0ZwmhCgoIKI';

async function Log(stack, level, packageName, message) {
    try {
        if (!ACCESS_TOKEN || ACCESS_TOKEN === 'PASTE_YOUR_SAVED_ACCESS_TOKEN_HERE') {
            console.error("Log: ACCESS_TOKEN is missing or not updated. Cannot send log.");
            return; 
        }

    
        console.log(`Log function called with packageName (from original caller): '${packageName}' (Type: ${typeof packageName})`);

        const response = await fetch(LOG_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                stack: stack,
                level: level,
                
                package: "handler",
                
                message: message
            })
        });

        if (!response.ok) {
            
            let errorData;
            try {
                errorData = await response.json();
            } catch (jsonError) {
                errorData = await response.text();
            }
            console.error('Log API Error Response:', response.status, errorData);
        } else {
            const logResponse = await response.json();
            console.log('Log sent successfully from backend:', logResponse);
        }
    } catch (error) {
        console.error('Error in Log function (backend):', error);
    }
}

module.exports = { Log };