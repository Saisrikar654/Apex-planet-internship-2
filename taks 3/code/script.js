// Quiz functionality
const quizData = [
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Creative Style Syntax", "Colorful Simple Syntax", "Code Styling Sheet"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which HTML tag is used to include JavaScript?",
        options: ["<js>", "<script>", "<javascript>", "<code>"],
        answer: "<script>"
    }
];

let currentQuestion = 0;

function loadQuiz() {
    const quizBox = document.getElementById('quiz-box');
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');

    const currentData = quizData[currentQuestion];
    questionEl.textContent = currentData.question;
    optionsEl.innerHTML = "";

    currentData.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => {
            if (option === currentData.answer) {
                alert("Correct!");
            } else {
                alert("Wrong!");
            }
            currentQuestion = (currentQuestion + 1) % quizData.length;
            loadQuiz();
        };
        optionsEl.appendChild(btn);
    });
}

document.addEventListener('DOMContentLoaded', loadQuiz);

// Weather API
function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '90d7b2fd908b7ef36a27ad4f9c124df9'; // Replace with your own key for production
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherDiv = document.getElementById('weatherResult');
            if (data.main) {
                weatherDiv.innerHTML = `
                    <h3>${data.name}</h3>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                `;
            } else {
                weatherDiv.innerHTML = `<p>City not found!</p>`;
            }
        })
        .catch(error => {
            document.getElementById('weatherResult').innerHTML = `<p>Error fetching data</p>`;
            console.error('Error:', error);
        });
}

 // Carousel setup
 let currentSlide = 0;
 const slides = document.querySelectorAll('.carousel-item');
 const nextBtn = document.querySelector('.carousel-control.next');
 const prevBtn = document.querySelector('.carousel-control.prev');

 function updateCarousel() {
     const inner = document.querySelector('.carousel-inner');
     inner.style.transform = `translateX(-${currentSlide * 100}%)`;
 }

 nextBtn.addEventListener('click', () => {
     currentSlide = (currentSlide + 1) % slides.length;
     updateCarousel();
 });

 prevBtn.addEventListener('click', () => {
     currentSlide = (currentSlide - 1 + slides.length) % slides.length;
     updateCarousel();


 updateCarousel();  // Initial position

});

