let questionCount = 1;

function addQuestion() {
    questionCount++;
    const questionsContainer = document.getElementById('questionsContainer');
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `
        <h3>Question ${questionCount}</h3>
        <label>Question Text:</label>
        <input type="text" class="questionText" required>
        <label>Option 1:</label>
        <input type="text" class="option" required>
        <label>Option 2:</label>
        <input type="text" class="option" required>
        <label>Option 3:</label>
        <input type="text" class="option" required>
        <label>Option 4:</label>
        <input type="text" class="option" required>
        <label>Correct Option (1-4):</label>
        <input type="number" class="correctOption" min="1" max="4" required>
    `;
    questionsContainer.appendChild(questionDiv);
}

document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const quizTitle = document.getElementById('quizTitle').value;
    const questions = [];
    
    const questionDivs = document.querySelectorAll('.question');
    questionDivs.forEach((div, index) => {
        const questionText = div.querySelector('.questionText').value;
        const options = Array.from(div.querySelectorAll('.option')).map(opt => opt.value);
        const correctOption = parseInt(div.querySelector('.correctOption').value);
        
        questions.push({
            text: questionText,
            options: options,
            correctOption: correctOption - 1 // Store as 0-based index
        });
    });
    
    // Save quiz data to localStorage
    localStorage.setItem('quiz', JSON.stringify({
        title: quizTitle,
        questions: questions
    }));
    
    // Redirect to quiz page
    window.location.href = 'quiz.html';
});