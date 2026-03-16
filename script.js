document.addEventListener('DOMContentLoaded', function() {
    const coverPage = document.getElementById('coverPage');
    const invitePage = document.getElementById('invitePage');
    const openBtn = document.getElementById('openInviteBtn');
    
    // При нажатии на кнопку
    openBtn.addEventListener('click', function() {
        // Добавляем класс скрытия для обложки
        coverPage.classList.add('hidden');
        
        // Показываем основной сайт
        invitePage.classList.add('visible');
        
        // Плавный скролл к началу приглашения
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 500);
    });
    
    // Эффект появления обложки при загрузке
    coverPage.style.opacity = 1;
});
// Таймер обратного отсчета
function updateTimer() {
    const weddingDate = new Date(2026, 7, 2, 14, 0);
    const now = new Date();
    
    const diff = weddingDate - now;
    
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
}

updateTimer();
setInterval(updateTimer, 1000);

// Плавная прокрутка при клике на кнопку
document.querySelector('.hero-button').addEventListener('click', function(e) {
    e.preventDefault();
    const targetElement = document.querySelector('#main-content');
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// Появление элементов при прокрутке
const sections = document.querySelectorAll('section:not(.hero)');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// ===== НОВЫЙ КОД ФОРМЫ =====
// Этот код работает с Google Apps Script без CORS ошибок

document.getElementById('weddingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    // Блокируем кнопку
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';
    
    // Создаем скрытый iframe для отправки
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe_' + Date.now();
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Меняем target формы на наш iframe
    form.target = iframe.name;
    
    // Обработчик загрузки iframe
    iframe.onload = function() {
        // Успех - форма отправилась
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Спасибо! Ваш ответ получен.';
        
        // Очищаем форму
        form.reset();
        
        // Возвращаем кнопку в исходное состояние
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить';
        
        // Удаляем iframe через 2 секунды
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 2000);
        
        // Скрываем сообщение через 5 секунд
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    };
    
    // Обработчик ошибки (если iframe не загрузится)
    iframe.onerror = function() {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Ошибка отправки. Пожалуйста, попробуйте еще раз.';
        
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить';
        
        document.body.removeChild(iframe);
    };
    
    // Отправляем форму
    form.submit();
});

// Проверка ориентации экрана
function checkOrientation() {
    if (window.innerWidth < window.innerHeight) {
        console.log('Вертикальная ориентация');
    } else {
        console.log('Горизонтальная ориентация');
    }
}

window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);