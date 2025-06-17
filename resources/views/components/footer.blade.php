{{-- resources/views/components/footer.blade.php с добавленным inline редактированием --}}

<!-- Footer -->
<footer class="footer bg-dark text-light py-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="100">
                <div class="footer-brand">
                    <h3 class="h3 text-white mb-3 editable" data-placeholder="Название компании">Український Камінь</h3>
                    <p class="text-light-emphasis editable" data-placeholder="Описание компании">
                        Створюємо досконалість з найкращого українського каменю. Якість та традиції поєднані з сучасними інноваціями.
                    </p>
                    <div class="social-links mt-3">
                        <a href="#" class="text-light me-3" aria-label="Facebook">
                            <i class="fab fa-facebook-f fa-lg"></i>
                        </a>
                        <a href="#" class="text-light me-3" aria-label="Instagram">
                            <i class="fab fa-instagram fa-lg"></i>
                        </a>
                        <a href="#" class="text-light me-3" aria-label="LinkedIn">
                            <i class="fab fa-linkedin-in fa-lg"></i>
                        </a>
                        <a href="#" class="text-light me-3" aria-label="YouTube">
                            <i class="fab fa-youtube fa-lg"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="200">
                <h5 class="text-white mb-3 editable" data-placeholder="Заголовок раздела">Продукція</h5>
                <ul class="list-unstyled">
                    <li class="mb-2">
                        <a href="#" class="text-light-emphasis text-decoration-none editable" data-placeholder="Пункт меню">Кам'яні плити</a>
                    </li>
                    <li class="mb-2">
                        <a href="#" class="text-light-emphasis text-decoration-none editable" data-placeholder="Пункт меню">Пам'ятники</a>
                    </li>
                    <li class="mb-2">
                        <a href="#" class="text-light-emphasis text-decoration-none editable" data-placeholder="Пункт меню">Меморіали</a>
                    </li>
                    <li class="mb-2">
                        <a href="#" class="text-light-emphasis text-decoration-none editable" data-placeholder="Пункт меню">Індивідуальні роботи</a>
                    </li>
                </ul>
            </div>
            <div class="col-lg-2 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="300">
                <h5 class="text-white mb-3 editable" data-placeholder="Заголовок раздела">Компанія</h5>
                <ul class="list-unstyled">
                    <li class="mb-2">
                        <a @guest href="#quarry" @endguest
                        @auth
                            @if(auth()->user()->canEditContent())
                                href="javascript:void(0)"
                           data-original-href="#quarry"
                           @else
                               href="#quarry"
                           @endif
                           @endauth
                           class="text-light-emphasis text-decoration-none @auth @if(auth()->user()->canEditContent()) editable @endif @endauth"
                           @auth @if(auth()->user()->canEditContent()) data-placeholder="Пункт меню" @endif @endauth>Наш кар'єр</a>
                    </li>
                    <li class="mb-2">
                        <a @guest href="#production" @endguest
                        @auth
                            @if(auth()->user()->canEditContent())
                                href="javascript:void(0)"
                           data-original-href="#production"
                           @else
                               href="#production"
                           @endif
                           @endauth
                           class="text-light-emphasis text-decoration-none @auth @if(auth()->user()->canEditContent()) editable @endif @endauth"
                           @auth @if(auth()->user()->canEditContent()) data-placeholder="Пункт меню" @endif @endauth>Виробництво</a>
                    </li>
                    <li class="mb-2">
                        <a href="#" class="text-light-emphasis text-decoration-none @auth @if(auth()->user()->canEditContent()) editable @endif @endauth"
                           @auth @if(auth()->user()->canEditContent()) data-placeholder="Пункт меню" @endif @endauth>Про нас</a>
                    </li>
                    <li class="mb-2">
                        <a href="#" class="text-light-emphasis text-decoration-none @auth @if(auth()->user()->canEditContent()) editable @endif @endauth"
                           @auth @if(auth()->user()->canEditContent()) data-placeholder="Пункт меню" @endif @endauth>Кар'єра</a>
                    </li>
                </ul>
            </div>
            <div class="col-lg-2 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="400">
                <h5 class="text-white mb-3 editable" data-placeholder="Заголовок раздела">Підтримка</h5>
                <ul class="list-unstyled">
                    <li class="mb-2">
                        <a href="#" class="text-light-emphasis text-decoration-none editable" data-placeholder="Пункт меню">Центр допомоги</a>
                    </li>
                    <li class="mb-2">
                        <a href="#" class="text-light-emphasis text-decoration-none editable" data-placeholder="Пункт меню">Поширені питання</a>
                    </li>
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <a @guest href="#contact" @endguest
                            @auth
                                @if(auth()->user()->canEditContent())
                                    href="javascript:void(0)"
                               data-original-href="#contact"
                               @else
                                   href="#contact"
                               @endif
                               @endauth
                               class="text-light-emphasis text-decoration-none @auth @if(auth()->user()->canEditContent()) editable @endif @endauth"
                               @auth @if(auth()->user()->canEditContent()) data-placeholder="Пункт меню" @endif @endauth>Контакти</a>
                        </li>
                        <li class="mb-2">
                            <a href="#" class="text-light-emphasis text-decoration-none editable" data-placeholder="Пункт меню">Технічна підтримка</a>
                        </li>
                    </ul>
            </div>
            <div class="col-lg-2 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="500">
                <h5 class="text-white mb-3 editable" data-placeholder="Заголовок раздела">Правова інформація</h5>
                <ul class="list-unstyled">
                    <li class="mb-2">
                        <a href="#" class="text-light-emphasis text-decoration-none editable" data-placeholder="Пункт меню">Політика конфіденційності</a>
                    </li>
                    <li class="mb-2">
                        <a href="#" class="text-light-emphasis text-decoration-none editable" data-placeholder="Пункт меню">Умови використання</a>
                    </li>
                    <li class="mb-2">
                        <a href="#" class="text-light-emphasis text-decoration-none editable" data-placeholder="Пункт меню">Політика cookies</a>
                    </li>
                </ul>
            </div>
        </div>
        <hr class="my-4 text-light-emphasis">
        <div class="row align-items-center">
            <div class="col-md-6" data-aos="fade-right">
                <p class="mb-0 text-light-emphasis editable" data-placeholder="Копирайт">&copy; {{ date('Y') }} Український Камінь. Усі права захищені.</p>
            </div>
            <div class="col-md-6 text-md-end" data-aos="fade-left">
                <p class="mb-0 text-light-emphasis editable" data-placeholder="Дополнительный текст">Зроблено з <i class="fas fa-heart text-danger"></i> в Україні</p>
            </div>
        </div>
    </div>
</footer>

{{-- 
ИЗМЕНЕНИЯ В FOOTER:
1. Название компании (h3) - редактируемое
2. Описание компании - редактируемое
3. Все заголовки разделов (h5) - редактируемые
4. Все ссылки в меню - редактируемые
5. Копирайт и дополнительный текст - редактируемые

ОСОБЕННОСТИ ТЕМНОЙ ТЕМЫ:
- Специальные стили для темного фона
- Белая рамка при редактировании
- Сохранение читаемости белого текста
- Адаптированные hover эффекты

ПРАКТИЧЕСКОЕ ПРИМЕНЕНИЕ:
Администратор может быстро обновить:
- Названия категорий товаров/услуг
- Ссылки на новые страницы
- Контактную информацию
- Правовые документы
- Копирайт и другую мета-информацию

Все изменения сохраняют структуру Bootstrap и не ломают дизайн!
--}}