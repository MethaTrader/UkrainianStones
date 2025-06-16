{{-- resources/views/components/navbar.blade.php с добавленным inline редактированием --}}

<!-- Navigation -->
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top custom-navbar">
    <div class="container">
        <a class="navbar-brand" href="{{ route('home') }}" data-aos="fade-right">
            <span class="logo-text editable" data-placeholder="Название компании">Український Камінь</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Переключити навігацію">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item" data-aos="fade-left" data-aos-delay="100">
                    <a class="nav-link editable" href="#products" data-placeholder="Пункт меню">Продукція</a>
                </li>
                <li class="nav-item" data-aos="fade-left" data-aos-delay="200">
                    <a class="nav-link editable" href="#quarry" data-placeholder="Пункт меню">Кар'єр</a>
                </li>
                <li class="nav-item" data-aos="fade-left" data-aos-delay="300">
                    <a class="nav-link editable" href="#production" data-placeholder="Пункт меню">Виробництво</a>
                </li>
                <li class="nav-item" data-aos="fade-left" data-aos-delay="400">
                    <a class="nav-link editable" href="#contact" data-placeholder="Пункт меню">Контакти</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

{{-- 
ИЗМЕНЕНИЯ:
1. Добавлен класс "editable" к элементам, которые должны редактироваться
2. Добавлены атрибуты data-placeholder для подсказок при пустом содержимом
3. Логотип обернут в span с классом editable
4. Каждая ссылка навигации получила класс editable

ИСПОЛЬЗОВАНИЕ:
- Двойной клик по названию компании или пунктам меню для редактирования
- При наведении элементы будут подсвечиваться
- Enter/клик вне области - сохранить изменения
- Escape - отменить изменения
--}}