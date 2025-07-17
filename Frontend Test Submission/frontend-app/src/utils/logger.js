// frontend-app/src/utils/logger.js
const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ0ZW9tYXg0MzBAZ21haWwuY29tIiwiZXhwIjoxNzUyNzM0MDM4LCJpYXQiOjE3NTI3MzMxMzgsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI3ODU1MjQ0OC1lMzUzLTRlNDUtOGM4NS0yMDM5NTgzZTI0YmQiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJ0ZW8gbWF4IGoiLCJzdWIiOiI0NzdmYmI0My05MTUzLTQ5OTktYjY5OS1mYWVmZDg5Y2MzYTIifSwiZW1haWwiOiJ0ZW9tYXg0MzBAZ21haWwuY29tIiwibmFtZSI6InRlbyBtYXggaiIsInJvbGxObyI6IjMxMjgyMjI0MzA0OSIsImFjY2Vzc0NvZGUiOiJ2QUh6S24iLCJjbGllbnRJRCI6IjQ3N2ZiYjQzLTkxNTMtNDk5OS1iNjk5LWZhZWZkODljYzNhMiIsImNsaWVudFNlY3JldCI6IktIZ3h0d21ZdE5FWUNWZkMifQ.RlRh6FKuXH4-4o5sbAHHl-nu-BKkF1Wej25yN39jOy0'; // <<< PASTE IT HERE!

export async function clientLog(stack, level, packageName, message) {
    try {
        if (!ACCESS_TOKEN || ACCESS_TOKEN === 'PASTE_YOUR_SAVED_ACCESS_TOKEN_HERE') {
            console.error("Client Log: ACCESS_TOKEN is missing or not updated. Cannot send log.");
            return;
        }
        const response = await fetch(LOG_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            },
            body: JSON.stringify({ stack, level, package: packageName, message })
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Client Log API Error Response:', response.status, errorData);
        } else {
            console.log('Client Log sent successfully from frontend');
        }
    } catch (error) {
        console.error('Error in Client Log function (frontend):', error);
    }
}