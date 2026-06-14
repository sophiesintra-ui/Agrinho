// Banco de dados de perguntas traduzidas para evitar repetição de código estrutural
const translations = {
    pt: {
        title: "Agro Forte, Futuro Sustentável",
        subtitle: "Equilíbrio entre produção e meio ambiente",
        welcome: "Olá, amigo! Vamos testar seus conhecimentos sobre a nossa terra?",
        correctMsg: "Muito bem! Você acertou! 🎉",
        wrongMsg: "Ah, não foi dessa vez! A resposta certa era: ",
        questionOf: "Pergunta {current} de {total}",
        finished: "Você terminou o desafio!",
        scoreText: "Você acertou {score} de {total} perguntas.",
        restart: "Jogar Novamente",
        next: "Próxima Pergunta",
        questions: [
            { q: "O que é agricultura sustentável?", env: ["Produzir alimentos sem destruir a natureza.", "Usar todo o espaço sem plantar árvores.", "Usar muito agrotóxico."], ans: 0 },
            { q: "Qual a importância das abelhas para o agro?", env: ["Elas só fazem mel.", "Elas ajudam a polinizar as plantas para gerarem frutos.", "Elas não têm importância."], ans: 1 },
            { q: "O que podemos fazer com os restos de alimentos vegetais?", env: ["Queimar tudo.", "Jogar no rio.", "Fazer adubo natural (compostagem)."], ans: 2 },
            { q: "Para economizar água na plantação, o melhor método é:", env: ["Gotejamento direto na raiz.", "Deixar a mangueira aberta o dia todo.", "Esperar apenas que chova."], ans: 0 },
            { q: "O que são árvores nativas em uma fazenda?", env: ["Árvores trazidas de outros países.", "Árvores que já nascem naturalmente na própria região.", "Plantas artificiais."], ans: 1 },
            { q: "O que é a rotação de culturas?", env: ["Mudar as plantas de lugar toda semana.", "Alternar o tipo de plantação para proteger o solo.", "Girar as sementes antes de plantar."], ans: 1 },
            { q: "Como a tecnologia ajuda o meio ambiente no campo?", env: ["Drones e sensores que calculam a quantidade certa de água.", "Criando robôs que destroem matas.", "A tecnologia não ajuda."], ans: 0 },
            { q: "As florestas perto de rios servem para:", env: ["Proteger a água e evitar que a terra caia no rio.", "Enfeitar a fazenda.", "Atrapalhar a passagem de tratores."], ans: 0 },
            { q: "O que é energia limpa usada nas fazendas?", env: ["Energia solar e eólica (do vento).", "Energia vinda de combustíveis que poluem.", "Energia que limpa o chão."], ans: 0 }
        ]
    },
    es: {
        title: "Agro Fuerte, Futuro Sustentable",
        subtitle: "Equilibrio entre producción y medio ambiente",
        welcome: "¡Hola, amigo! ¿Probamos tus conocimientos sobre nuestra tierra?",
        correctMsg: "¡Muy bien! ¡Acertaste! 🎉",
        wrongMsg: "¡Oh, esta vez no! La respuesta correcta era: ",
        questionOf: "Pregunta {current} de {total}",
        finished: "¡Has terminado el desafío!",
        scoreText: "Acertaste {score} de {total} preguntas.",
        restart: "Jugar de Nuevo",
        next: "Siguiente Pregunta",
        questions: [
            { q: "¿Qué es la agricultura sustentable?", env: ["Producir alimentos sin destruir la naturaleza.", "Usar todo el espacio sin plantar árboles.", "Usar muchos agroquímicos."], ans: 0 },
            { q: "¿Cuál es la importancia de las abejas para el agro?", env: ["Solo hacen miel.", "Ayudan a polinizar las plantas para generar frutos.", "No tienen importancia."], ans: 1 },
            { q: "¿Qué podemos hacer con los restos de alimentos vegetales?", env: ["Quemar todo.", "Tirarlos al río.", "Hacer abono natural (compostaje)."], ans: 2 },
            { q: "Para ahorrar agua en la plantación, el mejor método es:", env: ["Goteo directo en la raíz.", "Dejar la manguera abierta todo el día.", "Esperar solo a que llueva."], ans: 0 },
            { q: "¿Qué son los árboles nativos en una granja?", env: ["Árboles traídos de otros países.", "Árboles que crecen naturalmente en la región.", "Plantas artificiales."], ans: 1 },
            { q: "¿Qué es la rotación de cultivos?", env: ["Cambiar las plantas de lugar cada semana.", "Alternar el tipo de plantación para proteger el suelo.", "Girar las semillas antes de plantar."], ans: 1 },
            { q: "¿Cómo ayuda la tecnología al medio ambiente en el campo?", env: ["Drones y sensores que calculan el agua exacta.", "Creando robots que destruyen bosques.", "La tecnología no ayuda."], ans: 0 },
            { q: "Los bosques cerca de los ríos sirven para:", env: ["Proteger el agua y evitar que la tierra caiga al río.", "Adornar la granja.", "Obstruir el paso de los tractores."], ans: 0 },
            { q: "¿Qué es la energía limpia usada en las granjas?", env: ["Energía solar y eólica (del viento).", "Energía de combustibles que contaminan.", "Energía que limpia el suelo."], ans: 0 }
        ]
    }
};

// Estado da Aplicação
let currentLang = 'pt';
let currentQuestionIndex = 0;
let score = 0;
let fontSizePercentage = 100;

// Seletores de Elementos
const robotText = document.getElementById('robot-text');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz-container');
const scoreContainer = document.getElementById('score-container');
const scoreTitle = document.getElementById('score-title');
const scoreText = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');

// Inicialização do Quiz
function loadQuestion() {
    const langData = translations[currentLang];
    const currentQuestion = langData.questions[currentQuestionIndex];
    
    // Atualiza cabeçalho da questão
    questionNumber.innerText = langData.questionOf
        .replace('{current}', currentQuestionIndex + 1)
        .replace('{total}', langData.questions.length);
    
    questionText.innerText = currentQuestion.q;
    robotText.innerText = langData.welcome;
    
    // Limpa opções anteriores
    optionsContainer.innerHTML = '';
    nextBtn.classList.add('hidden');

    // Gera botões de alternativas
    currentQuestion.env.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(index, currentQuestion.ans));
        optionsContainer.appendChild(button);
    });
}

function selectOption(selectedIndex, correctIndex) {
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    const langData = translations[currentLang];
    
    buttons.forEach((btn, index) => {
        btn.disabled = true; // Desativa cliques repetidos
        if (index === correctIndex) {
            btn.classList.add('correct');
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
        robotText.innerText = langData.correctMsg;
    } else {
        buttons[selectedIndex].classList.add('wrong');
        robotText.innerText = langData.wrongMsg + buttons[correctIndex].innerText;
    }

    nextBtn.classList.remove('hidden');
}

// Fluxo de navegação
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    const langData = translations[currentLang];
    
    if (currentQuestionIndex < langData.questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    const langData = translations[currentLang];
    quizContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    
    scoreTitle.innerText = langData.finished;
    scoreText.innerText = langData.scoreText
        .replace('{score}', score)
        .replace('{total}', langData.questions.length);
    restartBtn.innerText = langData.restart;
}

restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.classList.remove('hidden');
    scoreContainer.classList.add('hidden');
    loadQuestion();
});

// Recursos de Acessibilidade
// 1. Alternância de Idioma
document.getElementById('toggle-lang').addEventListener('click', (e) => {
    currentLang = currentLang === 'pt' ? 'es' : 'pt';
    e.target.innerText = currentLang === 'pt' ? 'Español 🇪🇸' : 'Português 🇧🇷';
    
    // Traduz cabeçalho estático
    document.getElementById('main-title').innerText = translations[currentLang].title;
    document.getElementById('main-subtitle').innerText = translations[currentLang].subtitle;
    nextBtn.innerText = translations[currentLang].next;
    
    if (quizContainer.classList.contains('hidden')) {
        showResults();
    } else {
        loadQuestion();
    }
});

// 2. Alternância de Tema (Claro / Escuro)
document.getElementById('toggle-theme').addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
});

// 3. Controle de Tamanho de Fonte
document.getElementById('font-increase').addEventListener('click', () => {
    if (fontSizePercentage < 140) {
        fontSizePercentage += 10;
        document.documentElement.style.fontSize = fontSizePercentage + '%';
    }
});

document.getElementById('font-decrease').addEventListener('click', () => {
    if (fontSizePercentage > 80) {
        fontSizePercentage -= 10;
        document.documentElement.style.fontSize = fontSizePercentage + '%';
    }
});

// 4. Recurso Audiovisual de Áudio (Leitura do balão de fala do robô)
document.getElementById('play-audio').addEventListener('click', () => {
    const utterance = new SpeechSynthesisUtterance(robotText.innerText);
    utterance.lang = currentLang === 'pt' ? 'pt-BR' : 'es-ES';
    window.speechSynthesis.speak(utterance);
});

// Carrega a primeira execução
loadQuestion();
