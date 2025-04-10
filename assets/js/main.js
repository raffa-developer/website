// Variáveis para controle do popup
let currentImageIndex = 0;
let projectImages = [];
let projectDescriptions = [];
let projectTitle = "";

const projectsData = {
    "Plataforma Escolar": {
        descriptions: [
            "Tela inicial da plataforma escolar, com acesso rápido às principais funcionalidades.",
            "Chat interno da Plataforma.",
            "Sistema de notas que permite aos alunos visualizar as suas notas por avaliação individuais por cada disciplina ou por periodo.",
            "Sistema de notas que permite aos alunos visualizar as suas notas por avaliação individuais por cada disciplina ou por periodo.",
            "Sistema de horários que facilita a visualização, planejamento de aulas e disponibilidade de professores.",
            "Sistema de visualização de avaliações e a sua nota para monitoramento do progresso dos alunos.",
            "Agendamento de reuniões entre professores, coordenadores e pais.",
            "Detalhes das reuniões agendadas, com possibilidade de anexar documentos e definir pautas."
        ]
    },
    "App Mobile": {
        descriptions: [
            "Aplicativo móvel, ainda em desenvolvimento."
        ]
    }
};

// Destacar o link ativo ao rolar a página
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 60,
              sectionId = current.getAttribute('id'),
              link = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    });
});

// Função para abrir o popup
function openPopup(projectElement) {
    // Obtém o título do projeto
    projectTitle = projectElement.querySelector('.project__info h3').textContent;
    
    // Coleta as imagens do projeto
    projectImages = Array.from(projectElement.querySelectorAll('.project__img')).map(img => img.src);
    
    // Obtém as descrições do projeto
    projectDescriptions = projectsData[projectTitle]?.descriptions || 
                         Array(projectImages.length).fill("Descrição não disponível");
    
    // Reinicia o índice das imagens
    currentImageIndex = 0;
    
    // Exibe o popup
    const popup = document.getElementById('popup');
    popup.style.display = 'flex';
    
    // Mostra a primeira imagem e sua descrição
    updatePopupContent();
    
    // Adiciona o event listener para fechar ao clicar fora
    popup.onclick = function(event) {
        if (event.target === popup) {
            closePopup();
        }
    };
}

// Função para fechar o popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Função para atualizar o conteúdo do popup
function updatePopupContent() {
    const popupImg = document.getElementById('popup-img');
    const popupTitle = document.getElementById('popup-title');
    const popupText = document.getElementById('popup-text');
    
    if (projectImages && projectImages.length > 0) {
        popupImg.src = projectImages[currentImageIndex];
        popupTitle.textContent = projectTitle;
        
        // Verifica se existe uma descrição para esta imagem
        if (currentImageIndex < projectDescriptions.length) {
            popupText.textContent = projectDescriptions[currentImageIndex];
        } else {
            popupText.textContent = "Descrição não disponível";
        }
        
        console.log(`Imagem ${currentImageIndex + 1} de ${projectImages.length}`);
    }
}

// Filtro de projetos
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        projects.forEach(project => {
            const category = project.getAttribute('data-category');
            if (filter === 'all' || filter === category) {
                project.style.display = 'block';
                project.style.opacity = '0';
                setTimeout(() => {
                    project.style.transition = 'opacity 0.5s ease';
                    project.style.opacity = '1';
                }, 10);
            } else {
                project.style.transition = 'opacity 0.5s ease';
                project.style.opacity = '0';
                setTimeout(() => project.style.display = 'none', 500);
            }
        });
    });
});

// Função para mudar a imagem
function changeImage(direction) {
    // Evitar propagação do evento para não fechar o popup
    event.stopPropagation();
    
    // Altera o índice da imagem
    currentImageIndex += direction;
    
    // Garante que o índice esteja dentro do intervalo de imagens
    if (currentImageIndex < 0) {
        currentImageIndex = projectImages.length - 1;
    } else if (currentImageIndex >= projectImages.length) {
        currentImageIndex = 0;
    }
    
    // Atualiza o conteúdo do popup
    updatePopupContent();
}

// Inicializa os eventos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona event listeners para os botões de navegação
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            changeImage(-1);
        });
        
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            changeImage(1);
        });
    }
    
    // Adiciona navegação por teclado quando o popup estiver aberto
    document.addEventListener('keydown', function(e) {
        const popup = document.getElementById('popup');
        if (popup.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeImage(1);
            } else if (e.key === 'Escape') {
                closePopup();
            }
        }
    });
});