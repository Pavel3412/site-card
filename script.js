// ===== МУЗЫКА ДЛЯ АТМОСФЕРЫ =====
document.addEventListener('DOMContentLoaded', function() {
    const musicBtn = document.getElementById('musicToggleBtn');
    
    if (!musicBtn) return;
    
    const bgMusic = new Audio('music/music.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    
    let isPlaying = false;
    
    function updateButtonUI() {
        if (isPlaying) {
            musicBtn.classList.add('playing');
            musicBtn.innerHTML = '<i class="fas fa-pause" aria-hidden="true"></i><span>Выключить музыку</span>';
        } else {
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = '<i class="fas fa-music" aria-hidden="true"></i><span>Включить музыку</span>';
        }
    }
    
    musicBtn.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
        } else {
            bgMusic.play().catch(e => {
                console.log('Автовоспроизведение заблокировано:', e);
                musicBtn.innerHTML = '<i class="fas fa-music" aria-hidden="true"></i><span>Нажмите ещё раз</span>';
                setTimeout(() => updateButtonUI(), 1000);
            });
            isPlaying = true;
        }
        updateButtonUI();
    });
    
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isPlaying) {
            bgMusic.pause();
        } else if (!document.hidden && isPlaying) {
            bgMusic.play();
        }
    });
});

// ===== КОНВЕРТ С АНИМАЦИЕЙ =====
document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const coverPage = document.getElementById('coverPage');
    const invitePage = document.getElementById('invitePage');
    const heartEls = document.querySelectorAll('.heart-one, .heart-two');
    const openSceneNames = document.querySelector('.open-scene-names');
    if (!envelope) return;
    let isEnvelopeOpening = false;

    heartEls.forEach((el) => {
        el.textContent = '♥';
    });

    if (openSceneNames) {
        openSceneNames.innerHTML = 'Роман &amp;<br>Валерие';
    }
    
    heartEls.forEach((el) => {
        el.textContent = '\u2665';
    });

    if (openSceneNames) {
        openSceneNames.innerHTML = '\u0420\u043e\u043c\u0430\u043d &amp;<br>\u0412\u0430\u043b\u0435\u0440\u0438\u0435';
    }

    const openSound = new Audio('https://www.soundjay.com/misc/sounds/envelope-opening-01.mp3');
    openSound.load();
    
    envelope.addEventListener('click', function() {
        openEnvelope();
    });
    
    envelope.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openEnvelope();
        }
    });
    
    function openEnvelope() {
        if (isEnvelopeOpening) return;
        isEnvelopeOpening = true;
        openSound.play().catch(e => console.log('Звук не воспроизвелся:', e));
        envelope.classList.add('opening');

        setTimeout(() => {
            envelope.classList.add('open');
        }, 760);
        
        setTimeout(() => {
            if (coverPage) coverPage.classList.add('hidden');
            if (invitePage) invitePage.classList.add('visible');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 3200);
    }
});

// ===== ТАЙМЕР ОБРАТНОГО ОТСЧЕТА =====
function updateTimer() {
    const weddingDate = new Date(2026, 7, 2, 14, 0);
    const now = new Date();
    const diff = weddingDate - now;
    
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
}

updateTimer();
setInterval(updateTimer, 1000);

// ===== ФОРМА (отправка в Google Таблицу) =====
const weddingForm = document.getElementById('weddingForm');
if (weddingForm) {
    weddingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = this;
        const submitBtn = document.getElementById('submitBtn');
        const formMessage = document.getElementById('formMessage');
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        
        const iframe = document.createElement('iframe');
        iframe.name = 'hidden_iframe_' + Date.now();
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        form.target = iframe.name;
        
        iframe.onload = function() {
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Спасибо! Ваш ответ получен.';
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить';
            
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 2000);
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        };
        
        iframe.onerror = function() {
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Ошибка отправки. Пожалуйста, попробуйте еще раз.';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить';
            document.body.removeChild(iframe);
        };
        
        form.submit();
    });
}

// ===== АНИМАЦИЯ ПРОГРАММЫ ДНЯ =====
document.addEventListener('DOMContentLoaded', function() {
    const timeline = document.querySelector('.timeline');
    const hearts = document.querySelectorAll('.timeline-heart');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timeline && hearts.length) {
        const observerTimeline = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        timeline.classList.add('animate');
                    }, 200);
                    
                    hearts.forEach((heart, index) => {
                        setTimeout(() => {
                            heart.classList.add('animate');
                        }, 300 + (index * 80));
                    });
                    
                    observerTimeline.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observerTimeline.observe(timeline);
    }
    
    if (timelineItems.length) {
        const observerItems = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 100);
                }
            });
        }, { threshold: 0.3 });
        
        timelineItems.forEach(item => {
            observerItems.observe(item);
        });
    }

    const timelinePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    timelinePath.setAttribute('d', 'M64 0 C96 70 96 170 64 240 C32 310 32 410 64 480 C96 550 96 650 64 720 C32 790 32 890 64 960 C96 1030 96 1130 64 1200');
    const timelinePathLength = timelinePath.getTotalLength();
    const timelineViewboxHeight = 1200;

    let targetTimelineProgress = 0;
    let currentTimelineProgress = 0;
    let heartAnimationFrame = null;

    function getTimelineProgress() {
        if (!timeline) return 0;
        const timelineRect = timeline.getBoundingClientRect();
        const viewportAnchor = window.innerHeight * 0.45;
        const rawProgress = (viewportAnchor - timelineRect.top) / Math.max(timelineRect.height, 1);
        return Math.min(Math.max(rawProgress, 0), 1);
    }

    function applyTimelineHeartPosition(progress) {
        if (!timeline) return;

        const timelineRect = timeline.getBoundingClientRect();
        const pathPoint = timelinePath.getPointAtLength(timelinePathLength * progress);
        const scaleY = timelineRect.height / timelineViewboxHeight;
        const relativeTop = pathPoint.y * scaleY;
        const pathCenterX = 64;
        const waveOffset = pathPoint.x - pathCenterX;

        timeline.style.setProperty('--heart-top', `${relativeTop.toFixed(2)}px`);
        timeline.style.setProperty('--heart-offset-x', `${waveOffset.toFixed(2)}px`);
    }

    function animateTimelineHeart() {
        const delta = targetTimelineProgress - currentTimelineProgress;

        if (Math.abs(delta) < 0.001) {
            currentTimelineProgress = targetTimelineProgress;
            applyTimelineHeartPosition(currentTimelineProgress);
            heartAnimationFrame = null;
            return;
        }

        currentTimelineProgress += delta * 0.18;
        applyTimelineHeartPosition(currentTimelineProgress);
        heartAnimationFrame = requestAnimationFrame(animateTimelineHeart);
    }

    function scheduleTimelineHeartUpdate() {
        targetTimelineProgress = getTimelineProgress();
        if (heartAnimationFrame !== null) return;
        heartAnimationFrame = requestAnimationFrame(animateTimelineHeart);
    }
    
    function updateHeartColors() {
        const windowHeight = window.innerHeight;
        
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;
            
            if (itemCenter < viewportCenter) {
                item.classList.add('completed');
                item.classList.remove('active');
            } else if (rect.top < windowHeight - 150 && rect.bottom > 150) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    function handleTimelineScrollFrame() {
        updateHeartColors();
        scheduleTimelineHeartUpdate();
    }

    window.addEventListener('scroll', handleTimelineScrollFrame, { passive: true });
    window.addEventListener('resize', handleTimelineScrollFrame);
    updateHeartColors();
    scheduleTimelineHeartUpdate();
});

// ===== АНИМАЦИЯ БЛОКОВ ОРГАНИЗАЦИОННЫХ МОМЕНТОВ ДЛЯ МОБИЛЬНЫХ =====
function initInfoItemsAnimation() {
    const infoItems = document.querySelectorAll('.info-item');
    
    if (!infoItems.length) return;
    
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        const observerInfo = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible-mobile');
                }
            });
        }, { threshold: 0.3 });
        
        infoItems.forEach(item => {
            observerInfo.observe(item);
        });
    }
}

initInfoItemsAnimation();

window.addEventListener('resize', function() {
    const infoItems = document.querySelectorAll('.info-item');
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        infoItems.forEach(item => {
            item.classList.remove('visible-mobile');
        });
        
        const observerInfo = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible-mobile');
                }
            });
        }, { threshold: 0.3 });
        
        infoItems.forEach(item => {
            observerInfo.observe(item);
        });
    } else {
        infoItems.forEach(item => {
            item.classList.remove('visible-mobile');
        });
    }
});

// ===== АНИМАЦИЯ ПОЯВЛЕНИЯ И ИСЧЕЗНОВЕНИЯ БЛОКОВ ПРИ ПРОКРУТКЕ =====
function initScrollAnimation() {
    const blocks = document.querySelectorAll('.story, .timer-section, .calendar-section, .schedule, .location, .dresscode, .info, .rsvp');
    
    if (!blocks.length) return;
    
    const observerBlocks = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Блок появился в зоне видимости
                entry.target.classList.add('visible-scroll');
            } else {
                // Блок ушел из зоны видимости
                entry.target.classList.remove('visible-scroll');
            }
        });
    }, { threshold: 0.2 }); // 20% блока видно - появляется, меньше 20% - исчезает
    
    blocks.forEach(block => {
        observerBlocks.observe(block);
    });
}

// Запускаем анимацию
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimation();
});
