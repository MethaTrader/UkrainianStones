/**
 * Inline Editor для Laravel проекта "Український Камінь"
 * Позволяет редактировать текст по двойному клику
 */

class InlineEditor {
    constructor() {
        this.editableElements = [];
        this.currentlyEditing = null;
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
        // Находим все элементы с классом 'editable'
        this.editableElements = document.querySelectorAll('.editable');

        // Добавляем обработчики событий для каждого редактируемого элемента
        this.editableElements.forEach(element => {
            this.attachEventListeners(element);
        });

        console.log(`Inline Editor инициализирован для ${this.editableElements.length} элементов`);
    }

    attachEventListeners(element) {
        // Двойной клик для начала редактирования
        element.addEventListener('dblclick', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Останавливаем всплытие события
            this.startEditing(element);
        });

        // Для ссылок добавляем особую обработку
        if (element.tagName === 'A' || element.closest('a')) {
            element.addEventListener('click', (e) => {
                // Если элемент в режиме редактирования, блокируем переход
                if (element.contentEditable === 'true') {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            });
        }

        // Hover эффект для подсказки администратору
        element.addEventListener('mouseenter', () => {
            if (!this.currentlyEditing) {
                this.showHoverHint(element);
            }
        });

        element.addEventListener('mouseleave', () => {
            if (!this.currentlyEditing) {
                this.hideHoverHint(element);
            }
        });
    }

    showHoverHint(element) {
        element.style.outline = '2px dashed rgba(0, 123, 255, 0.3)';
        element.style.backgroundColor = 'rgba(0, 123, 255, 0.05)';
        element.style.cursor = 'text';
        element.title = 'Двойной клик для редактирования';
    }

    hideHoverHint(element) {
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

            console.log('Текст изменен:', {
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
            Текст успешно изменен
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
            zIndex: '9999',
            fontFamily: 'inherit',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

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
        if (element && !element.classList.contains('editable')) {
            element.classList.add('editable');
            this.attachEventListeners(element);
            this.editableElements.push(element);
        }
    }

    removeEditableElement(element) {
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
        this.editableElements.forEach(element => {
            if (enabled) {
                element.style.pointerEvents = '';
            } else {
                element.style.pointerEvents = 'none';
                if (this.currentlyEditing === element) {
                    this.stopEditing(element, true);
                }
            }
        });
    }
}

// Инициализируем редактор при загрузке страницы
const inlineEditor = new InlineEditor();

// Экспортируем для глобального использования
window.InlineEditor = InlineEditor;
window.inlineEditor = inlineEditor;