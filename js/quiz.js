// =============================================
// Quiz Implementation with SVG Illustrations
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Quiz module initialized');
    
    // Quiz state
    let currentQuestion = 1;
    let selectedAnswers = [];
    let isTransitioning = false; // Flag to prevent multiple clicks during transitions

    // Get DOM elements
    const optionButtons = document.querySelectorAll('.option-btn');
    const backButton = document.querySelector('.back-button');
    const questionNumbers = document.querySelectorAll('.number');
    const quizQuestion = document.querySelector('.quiz-question');
    const illustration1 = document.querySelector('#question1-illustration');
    const illustration2 = document.querySelector('#question2-illustration');
    const illustration3 = document.querySelector('#question3-illustration');

    // Check if quiz elements exist
    console.log('Option buttons found:', optionButtons.length);
    console.log('Question numbers found:', questionNumbers.length);
    console.log('Quiz question found:', quizQuestion !== null);
    console.log('Back button found:', backButton !== null);
    console.log('Illustration 1 found:', illustration1 !== null);
    console.log('Illustration 2 found:', illustration2 !== null);
    console.log('Illustration 3 found:', illustration3 !== null);

    if (!optionButtons.length || !questionNumbers.length || !quizQuestion) {
        console.error("Quiz elements not found, can't initialize quiz");
        return;
    }

    if (!illustration1 || !illustration2 || !illustration3) {
        console.error("Quiz illustrations not found, can't initialize quiz");
        return;
    }

    console.log("Quiz elements found, initializing...");

    // Force illustration visibility
    illustration1.style.display = 'block';
    illustration2.style.display = 'none';
    illustration3.style.display = 'none';

    // Set initial styles - make sure transitions work
    illustration1.style.transition = 'opacity 0.3s ease';
    illustration2.style.transition = 'opacity 0.3s ease';
    illustration3.style.transition = 'opacity 0.3s ease';
    illustration1.style.opacity = '1';

    // Questions data
    const questions = [
        "What do you want to learn about?",
        "How much time can you dedicate to learning?",
        "What's your current experience level?"
    ];

    // Log initial state
    console.log('Initial quiz state:');
    console.log('Current question:', currentQuestion);
    console.log('Question text:', quizQuestion.textContent);
    console.log('Illustration 1 display:', illustration1.style.display);
    console.log('Illustration 1 opacity:', illustration1.style.opacity);
    console.log('Back button display:', backButton.style.display);

    // Handle option selection
    optionButtons.forEach(button => {
        button.addEventListener('click', handleOptionClick);
    });

    function handleOptionClick(event) {
        // Prevent clicks during transitions
        if (isTransitioning) {
            console.log('Ignoring click, transition in progress');
            return;
        }
        
        const button = event.currentTarget;
        console.log('Option clicked:', button.textContent); 
        
        // Remove selected class from all buttons
        optionButtons.forEach(btn => btn.classList.remove('selected'));
        
        // Add selected class to clicked button
        button.classList.add('selected');

        // Store the answer
        selectedAnswers[currentQuestion - 1] = button.textContent;

        // Mark the current number as completed
        questionNumbers[currentQuestion - 1].classList.add('completed');
        
        // Show checkmark, hide number
        const numSpan = questionNumbers[currentQuestion - 1].querySelector('.num');
        const checkSpan = questionNumbers[currentQuestion - 1].querySelector('.check');
        if (numSpan) numSpan.style.display = 'none';
        if (checkSpan) checkSpan.style.display = 'block';

        // If it's the first question, transition to question 2
        if (currentQuestion === 1) {
            console.log('Transitioning to question 2'); 
            isTransitioning = true;
            
            // Fade out first illustration
            illustration1.style.opacity = '0';
            
            setTimeout(() => {
                illustration1.style.display = 'none';
                console.log('Illustration 1 hidden');
                
                // Show and fade in second illustration
                illustration2.style.display = 'block';
                illustration2.style.opacity = '0';
                console.log('Illustration 2 showing');
                
                setTimeout(() => {
                    illustration2.style.opacity = '1';
                    console.log('Illustration 2 visible');
                    isTransitioning = false;
                }, 50);
            }, 300);

            // Update question number indicators
            questionNumbers[currentQuestion].classList.add('active');
            
            // Show back button
            backButton.style.display = 'inline-block';
            
            // Update to next question
            currentQuestion = 2;
            quizQuestion.textContent = questions[currentQuestion - 1];
            console.log('Updated to question 2:', quizQuestion.textContent);
        }
        // If it's the second question, transition to question 3
        else if (currentQuestion === 2) {
            console.log('Transitioning to question 3'); 
            isTransitioning = true;
            
            // Fade out second illustration
            illustration2.style.opacity = '0';
            
            setTimeout(() => {
                illustration2.style.display = 'none';
                console.log('Illustration 2 hidden');
                
                // Show and fade in third illustration
                illustration3.style.display = 'block';
                illustration3.style.opacity = '0';
                console.log('Illustration 3 showing');
                
                setTimeout(() => {
                    illustration3.style.opacity = '1';
                    console.log('Illustration 3 visible');
                    isTransitioning = false;
                }, 50);
            }, 300);

            // Update question number indicators
            questionNumbers[currentQuestion].classList.add('active');
            
            // Update to next question
            currentQuestion = 3;
            quizQuestion.textContent = questions[currentQuestion - 1];
            console.log('Updated to question 3:', quizQuestion.textContent);
        }
        // If it's the last question, handle quiz completion
        else if (currentQuestion === 3) {
            console.log('Quiz completed!', selectedAnswers);
            // You could redirect or show results here
        }
    }

    // Handle back button
    if (backButton) {
        backButton.addEventListener('click', handleBackButton);
    }

    function handleBackButton() {
        // Prevent multiple clicks during transitions
        if (isTransitioning) {
            console.log('Ignoring back button click, transition in progress');
            return;
        }
        
        console.log('Back button clicked, current question:', currentQuestion);
        
        if (currentQuestion > 1) {
            isTransitioning = true;
            currentQuestion--;
            
            // Update question text
            quizQuestion.textContent = questions[currentQuestion - 1];
            
            // Update number indicators
            questionNumbers.forEach((number, index) => {
                if (index === currentQuestion - 1) {
                    number.classList.add('active');
                    number.classList.remove('completed');
                    
                    // Show number, hide checkmark
                    const numSpan = number.querySelector('.num');
                    const checkSpan = number.querySelector('.check');
                    if (numSpan) numSpan.style.display = 'block';
                    if (checkSpan) checkSpan.style.display = 'none';
                } else if (index === currentQuestion) {
                    number.classList.remove('active');
                }
            });

            // If going back to first question from second
            if (currentQuestion === 1) {
                console.log('Switching back to illustration 1');
                
                // Fade out second illustration
                illustration2.style.opacity = '0';
                
                setTimeout(() => {
                    illustration2.style.display = 'none';
                    console.log('Illustration 2 hidden');
                    
                    // Show and fade in first illustration
                    illustration1.style.display = 'block';
                    illustration1.style.opacity = '0';
                    console.log('Illustration 1 showing');
                    
                    setTimeout(() => {
                        illustration1.style.opacity = '1';
                        console.log('Illustration 1 visible');
                        isTransitioning = false;
                    }, 50);
                }, 300);

                // Hide back button
                backButton.style.display = 'none';
            }
            // If going back to second question from third
            else if (currentQuestion === 2) {
                console.log('Switching back to illustration 2');
                
                // Fade out third illustration
                illustration3.style.opacity = '0';
                
                setTimeout(() => {
                    illustration3.style.display = 'none';
                    console.log('Illustration 3 hidden');
                    
                    // Show and fade in second illustration
                    illustration2.style.display = 'block';
                    illustration2.style.opacity = '0';
                    console.log('Illustration 2 showing');
                    
                    setTimeout(() => {
                        illustration2.style.opacity = '1';
                        console.log('Illustration 2 visible');
                        isTransitioning = false;
                    }, 50);
                }, 300);
            }
        }
    }

    // Add necessary styles
    const style = document.createElement('style');
    style.textContent = `
        .quiz-illustration {
            transition: opacity 0.3s ease;
        }
        .option-btn.selected {
            border-color: var(--primary-color) !important;
            background: var(--background-white) !important;
            color: var(--primary-color) !important;
        }
    `;
    document.head.appendChild(style);

    // Log completion
    console.log('Quiz initialization complete');
}); 