// Define data
const students = [
    {
        "name": "La Última Cena",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg/1920px-The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg"
    },
    {
        "name": "La Gioconda (Mona Lisa)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
    },
    {
        "name": "La Creación de Adán",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1920px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg"
    },
    {
        "name": "La Capilla Sixtina",
        "image": "https://upload.wikimedia.org/wikipedia/commons/8/82/Sistina-interno.jpg"
    },
    {
        "name": "La persistencia de la memoria",
        "image": "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg"
    },
    {
        "name": "La Noche Estrellada",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"
    },
    {
        "name": "El jardín de las delicias",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/El_jard%C3%ADn_de_las_Delicias%2C_de_El_Bosco.jpg/1920px-El_jard%C3%ADn_de_las_Delicias%2C_de_El_Bosco.jpg"
    },
    {
        "name": "El nacimiento de Venus",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1920px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg"
    },
    {
        "name": "El grito",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/800px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg"
    },
    {
        "name": "Las Meninas",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Las_Meninas_01.jpg/800px-Las_Meninas_01.jpg"
    },
    {
        "name": "El beso",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/1024px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg"
    },
    {
        "name": "La primavera",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Sandro_Botticelli_-_La_Primavera_-_Google_Art_Project.jpg/1920px-Sandro_Botticelli_-_La_Primavera_-_Google_Art_Project.jpg"
    }
];

// Initialize 
let numberOfQuestions = 8;
let studentsSelection = [];
let score = 0;
let highscore = null;

// Declare element references
const questionsWrapperEl = document.querySelector('.questions-wrapper');
const quizFormEl = document.querySelector('#quiz-form');
const submitBtn = document.querySelector('#submit-button');
const numberOfQuestionsEl = document.querySelector('#numberOfQuestions');
const scoreEl = document.querySelector('#score');
const resultsWrapperEl = document.querySelector('.results-wrapper');
const highScoreEl = document.querySelector('#high-score');
const newGameBtn = document.querySelector('#new-game-button');

// Declare event listeners
quizFormEl.addEventListener('submit', event => {
    event.preventDefault();
    submitBtn.disabled = true;
    correctAnswers = studentsSelection.map(student => student.name);
    let nodes = document.querySelectorAll('input[type=radio]:checked');
    let userAnswers = [...nodes].map(node => node.value);
    userAnswers.forEach((answer, index) => {
        if(answer === correctAnswers[index]) {
            score++;
            quizFormEl.querySelector(`input[name=questionIndex${index}]:checked`).classList.add('is-valid');
            if (highscore) {
                if (score > highscore) {
                    highscore = score;
                } else {
                }
            } else {
                highscore = score;
            }
        } else {
            quizFormEl.querySelector(`input[name=questionIndex${index}]:checked`).classList.add('is-invalid');
        }
    });

    scrollTo(0,0);
    scoreEl.textContent = score;
    numberOfQuestionsEl.textContent = numberOfQuestions;
    highScoreEl.textContent = highscore;
    resultsWrapperEl.classList.remove('d-none');
});

newGameBtn.addEventListener('click', event => {
    resultsWrapperEl.classList.add('d-none');
    submitBtn.disabled = false;
    score = 0;
    startGame();
});

// Implement functions
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

const getRandomStudents = (array) => {
    shuffleArray(array);
    const randomStudents = array.slice(0, numberOfQuestions);
    return randomStudents;
};

const addRandomizedOptions = (array) => {
    array.forEach(element => {
        const correctName = element.name;
        const filtered = students.filter(student => {
            return student.name !== correctName;
        });
        shuffleArray(filtered);
        const options = filtered
            .slice(0, 3)
            .map(student => student.name);
        options.push(correctName);
        shuffleArray(options);
        element.options = options;
    });
};

const renderQuestions = (array) => {
    questionsWrapperEl.innerHTML = array.map((student, index) => `
        <div id="question" class="col-sm-12 col-md-6 col-lg-3 p-2">
            <div class="border rounded">
                <div class="image-wrapper p-4">
                    <img src="${student.image}" class="img-fluid rounded-circle" alt="${student.name}">
                </div>
                <div class="options-wrapper bg-secondary border rounded p-2 m-3 ">
                ${(student.options).map(option => `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="questionIndex${index}" id="${option}_${index}" value="${option}" autocomplete="off" required>
                        <label class="form-check-label" for="${option}_${index}">${option}</label>
                    </div>
                    `).join('')} 
                </div>
            </div>
        </div>
    `).join('');
};

// Program loop is defined here
const startGame = () => {
    studentsSelection = getRandomStudents(students);
    addRandomizedOptions(studentsSelection);
    renderQuestions(studentsSelection);
};

// Run program
startGame();