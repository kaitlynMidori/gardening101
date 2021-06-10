/**
 * Example store structure
 */
// const store = {
// 5 or more questions are required
//     questions: [{
//             question: 'What color is broccoli?',
//             answers: [
//                 'red',
//                 'orange',
//                 'pink',
//                 'green'
//             ],
//             correctAnswer: 'green'
//         },
//         {
//             question: 'What is the current year?',
//             answers: [
//                 '1970',
//                 '2015',
//                 '2019',
//                 '2005'
//             ],
//             correctAnswer: '2019'
//         }
//     ],
//     quizStarted: false,
//     questionNumber: 0,
//     score: 0
// };

const STORE = {
    questions: [ //1
        {
            question: 'Which of the following is a health benefit from gardening?',
            answers: [
                'Reduces Stress & improves mood',
                'Reduces risk of dementia',
                'Improves heart health and reduces risk of stroke',
                'All of the above'
            ],
            correctAnswer: 'All of the above'
        },
        //2
        {
            question: 'Which of the following are indoor plants?',
            answers: [
                'Fiddle Leaf Fig',
                'Dragon Tree',
                'Rubber Plant',
                'All of the above'
            ],
            correctAnswer: 'All of the above'
        },
        //3
        {
            question: 'What are the most common ways to kill a plant?',
            answers: [
                'Overwatering',
                'Underwatering',
                'Incorrect sun exposure',
                'All of the above'
            ],
            correctAnswer: 'All of the above'
        },
        //4
        {
            question: 'What are some ways to keep your plants happy?',
            answers: ['Provide correct watering needs', 'Keep free of dust', 'Fertilize it', 'All of the above'],
            correctAnswer: 'All of the above'
        },
        //5
        {
            question: 'What are signs of an unhappy plant?',
            answers: [
                'Wilted leaves',
                'Yellowing/browning leaves',
                ' Bugs or fungal growth',
                'All of the above'
            ],
            correctAnswer: 'All of the above'
        }
    ],
    quizStarted: false,
    currentQuestion: 0,
    score: 0
};
/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

/**
 * Generates HTML for the start screen
 */
function generateStartScreenHtml() {
    return `
    <div class="start-screen">
      <p>This quiz will test your plant 101 knowledge.</p>
      <button type="button" id="start">Start Quiz</button>
    </div>
  `;
}

/**
 * Generates the HTML for the section of the app 
 * that displays the question number and the score
 */
function generateQuestionNumberAndScoreHtml() {
    return `
    <ul class="question-and-score">
      <li id="question-number">
        Question Number: ${STORE.currentQuestion + 1}/${STORE.questions.length}
      </li>
      <li id="score">
        Score: ${STORE.score}/${STORE.questions.length}
      </li>
    </ul>
  `;
}
/**
 * Generates the list of possible answers for
 * one question
 */
function generateAnswersHtml() {
    const answersArray = STORE.questions[STORE.currentQuestion].answers
    let answersHtml = '';
    let i = 0;

    answersArray.forEach(answer => {
        answersHtml += `
      <div id="option-container-${i}">
        <input type="radio" name="options" id="option${i + 1}" value= "${answer}" tabindex ="${i + 1}" required> 
        <label for="option${i + 1}"> ${answer}</label>
      </div>
    `;
        i++;
    });
    return answersHtml;
}
/**
 * Generates the HTML to display one question
 */
function generateQuestionHtml() {
    let currentQuestion = STORE.questions[STORE.currentQuestion];
    return `
    <form id="question-form" class="question-form">
      <fieldset>
        <div class="question">
          <legend> ${currentQuestion.question}</legend>
        </div>
        <div class="options">
          <div class="answers">
            ${generateAnswersHtml()}
          </div>
        </div>
        <button type="submit" id="submit-answer-btn" tabindex="5">Submit</button>
        <button type="button" id="next-question-btn" tabindex="6"> Next &gt;></button>
      </fieldset>
    </form >
  `;
}

/**
 * Generates the HTML for the results screen
 */
function generateResultsScreen() {
    return `
    <div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div class="row">
            <div class="col-12">
              <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
            </div>
          </div>
        
          <div class="row">
            <div class="col-12">
              <button type="button" id="restart"> Restart Quiz </button>
            </div>
          </div>
        </fieldset>
    </form>
    </div>
  `;
}

/**
 * @param {string} answerStatus - 'correct' / 'incorrect'
 * @returns {string} - HTML providing the user with feedback 
 * regarding whether their answer was correct or incorrect.
 */
function generateFeedbackHTML(answerStatus) {
    let correctAnswer = STORE.questions[STORE.currentQuestion].correctAnswer;
    let html = '';
    if (answerStatus === 'correct') {
        html = `
    <div class="right-answer">That is correct!</div>
    `;
    } else if (answerStatus === 'incorrect') {
        html = `
      <div class="wrong-answer">That is incorrect. The correct answer is ${correctAnswer}.</div>
    `;
    }
    return html;
}

/********** RENDER FUNCTION **********/

/**
 * All-purpose render function that will conditionally 
 * render the page based upon the state of the STORE.
 */
function render() {
    let html = '';

    if (STORE.quizStarted === false) {
        $('main').html(generateStartScreenHtml());
        return;
    } else if (STORE.currentQuestion >= 0 && STORE.currentQuestion < STORE.questions.length) {
        html = generateQuestionNumberAndScoreHtml();
        html += generateQuestionHtml();
        $('main').html(html);
    } else {
        $('main').html(generateResultsScreen());
    }
}

/********** EVENT HANDLER FUNCTIONS **********/

/**
 * Handles a click of the quiz's start button
 */
function handleStartClick() {
    $('main').on('click', '#start', function(event) {
        STORE.quizStarted = true;
        render();
    });
}

/**
 * Handles the click of the "next" button
 */
function handleNextQuestionClick() {
    $('body').on('click', '#next-question-btn', (event) => {
        render();
    });
}

/**
 * Handles the submission of the question form
 */
function handleQuestionFormSubmission() {
    $('body').on('submit', '#question-form', function(event) {
        event.preventDefault();
        const currentQuestion = STORE.questions[STORE.currentQuestion];

        // get value from checkbox checked by user
        let selectedOption = $('input[name=options]:checked').val();
        /**
         * Creates an id '#option-container' + the index of 
         * the current question in the answers array.
         * 
         * Example: #option-container-0
         */
        let optionContainerId = `#option-container-${currentQuestion.answers.findIndex(i => i === selectedOption)}`;

        if (selectedOption === currentQuestion.correctAnswer) {
            STORE.score++;
            $(optionContainerId).append(generateFeedbackHTML('correct'));
        } else {
            $(optionContainerId).append(generateFeedbackHTML('incorrect'));
        }
        STORE.currentQuestion++;
        // hide the submit button
        $('#submit-answer-btn').hide();
        // disable all inputs
        $('input[type=radio]').each(() => {
            $('input[type=radio]').attr('disabled', true);
        });
        // show the next button
        $('#next-question-btn').show();

    });
}
/**
 * Resets all values to prepare to restart quiz
 */
function restartQuiz() {
    STORE.quizStarted = false;
    STORE.currentQuestion = 0;
    STORE.score = 0;
}

function handleRestartButtonClick() {
    $('body').on('click', '#restart', () => {
        restartQuiz();
        render();
    });
}

function handleQuizApp() {
    render();
    handleStartClick();
    handleNextQuestionClick();
    handleQuestionFormSubmission();
    handleRestartButtonClick();
}

$(handleQuizApp);