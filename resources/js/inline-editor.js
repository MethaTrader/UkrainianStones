/**
 * Inline Editor для Laravel проекта "Український Камінь"
 * Позволяет редактировать текст по двойному клику только для администраторов
 */

class InlineEditor {
    constructor() {
        this.editableElements = [];
        this.currentlyEditing = null;
        this.isAdmin = false;
        this.editingEnabled = false;
        this.editingMode = 'admin'; // 'admin' или 'guest'
        this.init();
    }

    init() {
        // Ждем полной загрузки DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Проверяем роль пользователя
        this.checkUserRole();

        // Если не админ, полностью отключаем функционал
        if (!this.isAdmin || !this.editingEnabled) {
            console.log('Inline Editor: доступ запрещен - пользователь не является администратором');
            return;
        }

        // Находим все элементы с классом 'editable'
        this.editableElements = document.querySelectorAll('.editable');

        // Добавляем обработчики событий для каждого редактируемого элемента
        this.editableElements.forEach(element => {
            this.attachEventListeners(element);
        });

        // Настраиваем контролы админ панели
        this.setupAdminControls();

        // Устанавливаем начальный режим
        this.setEditingMode(this.editingMode);

        console.log(`Inline Editor инициализирован для ${this.editableElements.length} элементов (Адміністратор)`);
    }

    checkUserRole() {
        const userRole = document.body.getAttribute('data-user-role');
        const editingEnabled = document.body.getAttribute('data-editing-enabled');

        this.isAdmin = userRole === 'admin';
        this.editingEnabled = editingEnabled === 'true';

        if (this.isAdmin && this.editingEnabled) {
            document.body.setAttribute('data-editing-mode', 'admin');
        }
    }

    setupAdminControls() {
        const toggleButton = document.getElementById('toggle-editing');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                this.toggleEditingMode();
            });
        }

        // Блокируем стандартное поведение ссылок в режиме редактирования
        this.blockNavigationInEditMode();
    }

    toggleEditingMode() {
        this.editingMode = this.editingMode === 'admin' ? 'guest' : 'admin';
        this.setEditingMode(this.editingMode);

        const toggleButton = document.getElementById('toggle-editing');
        const icon = toggleButton.querySelector('i');
        const text = toggleButton.querySelector('span');

        if (this.editingMode === 'guest') {
            icon.className = 'fas fa-edit me-1';
            text.textContent = 'Режим редагування';
            toggleButton.classList.remove('btn-outline-light');
            toggleButton.classList.add('btn-light', 'text-dark');
        } else {
            icon.className = 'fas fa-eye me-1';
            text.textContent = 'Переглянути як гість';
            toggleButton.classList.remove('btn-light', 'text-dark');
            toggleButton.classList.add('btn-outline-light');
        }
    }

    setEditingMode(mode) {
        document.body.setAttribute('data-editing-mode', mode);

        if (mode === 'guest') {
            // Завершаем текущее редактирование
            if (this.currentlyEditing) {
                this.stopEditing(this.currentlyEditing, true);
            }
            // Отключаем все hover эффекты
            this.editableElements.forEach(element => {
                this.hideHoverHint(element);
            });
        }
    }

    blockNavigationInEditMode() {
        // Блокируем все ссылки кроме выхода
        document.addEventListener('click', (e) => {
            if (this.editingMode === 'admin' && this.isAdmin) {
                const link = e.target.closest('a');
                if (link && !link.closest('.admin-controls') && !link.closest('#logout-form')) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }
        }, true);

        // Блокируем скроллинг к якорям
        document.addEventListener('click', (e) => {
            if (this.editingMode === 'admin' && this.isAdmin) {
                const link = e.target.closest('a[href^="#"]');
                if (link && !link.closest('.admin-controls')) {
                    e.preventDefault();
                    return false;
                }
            }
        }, true);
    }

    attachEventListeners(element) {
        // Проверяем доступность редактирования
        if (!this.isAdmin || !this.editingEnabled) {
            return;
        }

        // Двойной клик для начала редактирования
        element.addEventListener('dblclick', (e) => {
            if (this.editingMode !== 'admin') return;

            e.preventDefault();
            e.stopPropagation(); // Останавливаем всплытие события
            this.startEditing(element);
        });

        // Для ссылок добавляем особую обработку
        if (element.tagName === 'A' || element.closest('a')) {
            element.addEventListener('click', (e) => {
                // Если элемент в режиме редактирования, блокируем переход
                if (element.contentEditable === 'true' || this.editingMode === 'admin') {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            });
        }

        // Hover эффект для подсказки администратору
        element.addEventListener('mouseenter', () => {
            if (!this.currentlyEditing && this.editingMode === 'admin') {
                this.showHoverHint(element);
            }
        });

        element.addEventListener('mouseleave', () => {
            if (!this.currentlyEditing && this.editingMode === 'admin') {
                this.hideHoverHint(element);
            }
        });
    }

    showHoverHint(element) {
        if (this.editingMode !== 'admin') return;

        element.style.outline = '2px dashed rgba(220, 53, 69, 0.5)';
        element.style.backgroundColor = 'rgba(220, 53, 69, 0.08)';
        element.style.cursor = 'text';
        element.title = 'Двойной клик для редактирования';
    }

    hideHoverHint(element) {
        if (element.contentEditable === 'true') return;

        element.style.outline = '';
        element.style.backgroundColor = '';
        element.style.cursor = '';
        element.title = '';
    }

    startEditing(element) {
        // Если уже редактируем другой элемент, завершаем редактирование
        if (this.currentlyEditing && this.currentlyEditing !== element) {
            this.stopEditing(this.currentlyEditing);
        }

        // Сохраняем оригинальный текст и стили
        const originalText = element.textContent.trim(); // Убираем лишние пробелы
        const placeholder = element.getAttribute('data-placeholder') || 'Введите текст...';

        // Отключаем переходы по ссылкам во время редактирования
        if (element.tagName === 'A' || element.closest('a')) {
            const linkElement = element.tagName === 'A' ? element : element.closest('a');
            linkElement.style.pointerEvents = 'none';
            element.setAttribute('data-original-href', linkElement.href || '');
            linkElement.removeAttribute('href');
        }

        // Делаем элемент редактируемым
        element.contentEditable = true;
        element.textContent = originalText; // Устанавливаем чистый текст без лишних пробелов
        element.focus();

        // Применяем стили редактирования
        this.applyEditingStyles(element);

        // Выделяем весь текст
        this.selectAllText(element);

        this.currentlyEditing = element;

        // Обработчики для завершения редактирования
        const finishEditing = (e) => {
            // Enter - сохранить изменения
            if (e.type === 'keydown' && e.key === 'Enter') {
                e.preventDefault();
                this.stopEditing(element, true);
            }
            // Escape - отменить изменения
            else if (e.type === 'keydown' && e.key === 'Escape') {
                e.preventDefault();
                element.textContent = originalText;
                this.stopEditing(element, false);
            }
            // Потеря фокуса - сохранить изменения
            else if (e.type === 'blur') {
                this.stopEditing(element, true);
            }
        };

        // Предотвращаем переход по ссылкам во время редактирования
        const preventNavigation = (e) => {
            if (element.contentEditable === 'true') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };

        // Добавляем обработчики
        element.addEventListener('keydown', finishEditing);
        element.addEventListener('blur', finishEditing);
        element.addEventListener('click', preventNavigation);

        // Сохраняем обработчики для удаления позже
        element._finishEditingHandler = finishEditing;
        element._preventNavigationHandler = preventNavigation;
    }

    stopEditing(element, save = true) {
        if (!element) return;

        // Убираем возможность редактирования
        element.contentEditable = false;

        // Восстанавливаем функциональность ссылок
        if (element.tagName === 'A' || element.closest('a')) {
            const linkElement = element.tagName === 'A' ? element : element.closest('a');
            linkElement.style.pointerEvents = '';
            const originalHref = element.getAttribute('data-original-href');
            if (originalHref) {
                linkElement.href = originalHref;
                element.removeAttribute('data-original-href');
            }
        }

        // Убираем стили редактирования
        this.removeEditingStyles(element);

        // Удаляем обработчики событий
        if (element._finishEditingHandler) {
            element.removeEventListener('keydown', element._finishEditingHandler);
            element.removeEventListener('blur', element._finishEditingHandler);
            delete element._finishEditingHandler;
        }

        if (element._preventNavigationHandler) {
            element.removeEventListener('click', element._preventNavigationHandler);
            delete element._preventNavigationHandler;
        }

        if (save) {
            // Очищаем и нормализуем текст
            const newText = element.textContent.trim().replace(/\s+/g, ' ');
            element.textContent = newText;

            console.log('Текст змінено:', {
                element: element.tagName + (element.className ? '.' + element.className : ''),
                oldText: element.getAttribute('data-original-text'),
                newText: newText
            });

            // Показываем уведомление об успешном изменении
            this.showSuccessNotification();
        }

        this.currentlyEditing = null;
    }

    applyEditingStyles(element) {
        // Сохраняем оригинальные стили
        element.setAttribute('data-original-outline', element.style.outline || '');
        element.setAttribute('data-original-background', element.style.backgroundColor || '');
        element.setAttribute('data-original-padding', element.style.padding || '');
        element.setAttribute('data-original-text', element.textContent.trim());

        // Применяем стили редактирования БЕЗ лишнего padding
        element.style.outline = '2px solid #007bff';
        element.style.backgroundColor = 'rgba(0, 123, 255, 0.1)';
        element.style.borderRadius = '4px';
        element.style.minHeight = '1.2em';
        // НЕ добавляем padding чтобы избежать смещения текста
    }

    removeEditingStyles(element) {
        // Восстанавливаем оригинальные стили
        element.style.outline = element.getAttribute('data-original-outline') || '';
        element.style.backgroundColor = element.getAttribute('data-original-background') || '';
        element.style.padding = element.getAttribute('data-original-padding') || '';
        element.style.borderRadius = '';

        // Удаляем временные атрибуты
        element.removeAttribute('data-original-outline');
        element.removeAttribute('data-original-background');
        element.removeAttribute('data-original-padding');
        element.removeAttribute('data-original-text');
    }

    selectAllText(element) {
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }

    showSuccessNotification() {
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = 'inline-editor-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Текст успішно змінено
        `;

        // Добавляем стили
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#28a745',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '10001', // Выше админ панели (у неё 10000)
            fontFamily: 'inherit',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        // Если есть админ панель, опускаем уведомление ниже неё
        const adminIndicator = document.getElementById('admin-indicator');
        if (adminIndicator) {
            const adminHeight = adminIndicator.offsetHeight;
            notification.style.top = `${adminHeight + 10}px`;
        }

        document.body.appendChild(notification);

        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Удаляем через 3 секунды
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Публичные методы для управления
    addEditableElement(element) {
        if (!this.isAdmin || !this.editingEnabled) return;

        if (element && !element.classList.contains('editable')) {
            element.classList.add('editable');
            this.attachEventListeners(element);
            this.editableElements.push(element);
        }
    }

    removeEditableElement(element) {
        if (!this.isAdmin || !this.editingEnabled) return;

        if (element && element.classList.contains('editable')) {
            element.classList.remove('editable');
            const index = this.editableElements.indexOf(element);
            if (index > -1) {
                this.editableElements.splice(index, 1);
            }
        }
    }

    // Включить/выключить редактирование для всех элементов
    toggleEditing(enabled) {
        if (!this.isAdmin) return;

        this.editableElements.forEach(element => {
            if (enabled && this.editingMode === 'admin') {
                element.style.pointerEvents = '';
            } else {
                element.style.pointerEvents = 'none';
                if (this.currentlyEditing === element) {
                    this.stopEditing(element, true);
                }
            }
        });
    }

    // Получить текущий режим
    getEditingMode() {
        return {
            isAdmin: this.isAdmin,
            editingEnabled: this.editingEnabled,
            mode: this.editingMode
        };
    }
}

// Инициализируем редактор при загрузке страницы
const inlineEditor = new InlineEditor();

// Экспортируем для глобального использования
window.InlineEditor = InlineEditor;
window.inlineEditor = inlineEditor;