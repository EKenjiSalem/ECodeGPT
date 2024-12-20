// API Key deleted for security purposes
const submitButton = document.getElementById('submit');
const outPutElement = document.getElementById('output');
const inputValue = document.querySelector('input');
const historyElement = document.querySelector('.history');
const buttonElement = document.getElementById('new-chat');
const outputContainer = document.querySelector('.output-container');

function changeInput(value) {
    const inputElement = document.querySelector('input');
    inputElement.value = value;
}

async function getMessage() {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: inputValue.value }],
            max_tokens: 100,
        }),
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();

        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            outPutElement.textContent = data.choices[0].message.content;

            outputContainer.style.display = 'block';

            const pElement = document.createElement('p');
            pElement.textContent = inputValue.value;
            pElement.addEventListener('click', () => changeInput(pElement.textContent));
            historyElement.append(pElement);

            inputValue.value = ''; 
        } else {
            console.error('Unexpected response structure:', data);
        }
    } catch (error) {
        console.error('Error fetching message:', error);
    }
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    getMessage();
});

function clearInput() {
    inputValue.value = ''; 
    outPutElement.textContent = ''; 
    outputContainer.style.display = 'none';
}

buttonElement.addEventListener('click', clearInput);

