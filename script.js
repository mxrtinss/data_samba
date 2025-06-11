// Funções do Chat
let chatOpen = false;

function toggleChat() {
    const chatBody = document.getElementById('chatBody');
    const chatToggle = document.getElementById('chatToggle');
    chatOpen = !chatOpen;
    
    if (chatOpen) {
        chatBody.classList.remove('collapsed');
        chatToggle.classList.remove('fa-chevron-down');
        chatToggle.classList.add('fa-chevron-up');
    } else {
        chatBody.classList.add('collapsed');
        chatToggle.classList.remove('fa-chevron-up');
        chatToggle.classList.add('fa-chevron-down');
    }
}

function openChat() {
    if (!chatOpen) {
        toggleChat();
    }
}

function selectOption(option) {
    const chatMessages = document.getElementById('chatMessages');
    let response = '';
    
    switch(option) {
        case 'orcamento':
            response = 'Para solicitar um orçamento, por favor, informe o modelo do seu microondas e o problema que está ocorrendo.';
            break;
        case 'duvida':
            response = 'Estou aqui para ajudar! Qual é sua dúvida?';
            break;
        case 'agendamento':
            response = 'Para agendar um serviço, por favor, informe sua disponibilidade de horário e qual unidade prefere (Rebouças, Santa Felicidade ou São José dos Pinhais).';
            break;
    }
    
    addMessage(response, 'bot');
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        // Simulação de resposta automática
        setTimeout(() => {
            addMessage('Obrigado pela sua mensagem! Um de nossos atendentes entrará em contato em breve.', 'bot');
        }, 1000);
    }
}

function addMessage(text, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Função do WhatsApp
function openWhatsApp() {
    const phone = '5541985163600'; // Número do WhatsApp
    const message = 'Olá! Gostaria de informações sobre o conserto de microondas.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Função para adicionar links do Google Maps
function addMapLinks() {
    const locations = {
        'Rebouças': 'https://www.google.com/maps/search/?api=1&query=Casa+do+Microondas+Rebouças+Curitiba',
        'Santa Felicidade': 'https://www.google.com/maps/search/?api=1&query=Casa+do+Microondas+Santa+Felicidade+Curitiba',
        'São José dos Pinhais': 'https://www.google.com/maps/search/?api=1&query=Casa+do+Microondas+São+José+dos+Pinhais'
    };

    // Adicionar links no header
    document.querySelectorAll('.location-item').forEach(item => {
        const locationName = item.querySelector('span').textContent;
        if (locations[locationName]) {
            const link = document.createElement('a');
            link.href = locations[locationName];
            link.target = '_blank';
            link.style.textDecoration = 'none';
            link.style.color = 'inherit';
            item.innerHTML = item.innerHTML.replace(locationName, '');
            link.appendChild(item.querySelector('i').cloneNode(true));
            link.appendChild(document.createTextNode(locationName));
            item.innerHTML = '';
            item.appendChild(link);
        }
    });

    // Adicionar links na seção de contato
    document.querySelectorAll('.contact-item p').forEach(p => {
        const text = p.textContent;
        Object.keys(locations).forEach(location => {
            if (text.includes(location)) {
                const link = document.createElement('a');
                link.href = locations[location];
                link.target = '_blank';
                link.style.color = 'inherit';
                link.style.textDecoration = 'none';
                p.innerHTML = p.innerHTML.replace(location, `<a href="${locations[location]}" target="_blank" style="color: inherit; text-decoration: none;">${location}</a>`);
            }
        });
    });
}

// Função para voltar ao topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Mostrar/esconder botão de voltar ao topo
window.onscroll = function() {
    const backToTop = document.getElementById('backToTop');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
};

// Menu mobile
document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
});

// Carrossel Center Mode
let currentCenter = 1;
const carouselTrack = document.querySelector('.carousel-center-mode .carousel-track');
const carouselItems = document.querySelectorAll('.carousel-center-mode .carousel-item');

function updateCarouselCenter() {
  carouselItems.forEach((item, idx) => {
    item.classList.remove('active');
    if (idx === currentCenter) item.classList.add('active');
  });
  const offset = (carouselItems[0].offsetWidth + 20) * (currentCenter - 1);
  carouselTrack.style.transform = `translateX(${-offset}px)`;
}

function moveCarouselCenter(dir) {
  currentCenter += dir;
  if (currentCenter < 0) currentCenter = carouselItems.length - 1;
  if (currentCenter >= carouselItems.length) currentCenter = 0;
  updateCarouselCenter();
}

// Inicialização
if (carouselItems.length) {
  updateCarouselCenter();
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    addMapLinks();
    
    // Adicionar evento de tecla Enter no chat
    document.getElementById('chatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}); 