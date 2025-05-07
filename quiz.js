document.addEventListener('DOMContentLoaded', function() {
    const quizData = JSON.parse(localStorage.getItem('quiz'));
    if (!quizData) {
        alert('No quiz data found!');
        window.location.href = 'index.html';
        return;
    }
    
    // Set quiz title
    document.getElementById('quizTitle').textContent = quizData.title;
    
    // Generate quiz questions
    const quizQuestionsContainer = document.getElementById('quizQuestions');
    quizData.questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.innerHTML = `
            <h3>Question ${index + 1}: ${question.text}</h3>
            ${question.options.map((option, i) => `
                <input type="radio" name="q${index}" value="${i}" required>
                <label>${option}</label><br>
            `).join('')}
        `;
        quizQuestionsContainer.appendChild(questionDiv);
    });
    
    // Handle quiz submission
    document.getElementById('takeQuizForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        let score = 0;
        quizData.questions.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
            if (selectedOption && parseInt(selectedOption.value) === question.correctOption) {
                score++;
            }
        });
        
        // Display result
        const resultDiv = document.getElementById('result');
        const scoreSpan = document.getElementById('score');
        scoreSpan.textContent = `${score} out of ${quizData.questions.length}`;
        resultDiv.style.display = 'block';
    });
});