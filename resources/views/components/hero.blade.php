{{-- resources/views/components/hero.blade.php с добавленным inline редактированием --}}

<!-- Hero Section -->
<section class="hero-section">
    <div class="container">
        <div class="row align-items-center min-vh-100">
            <div class="col-lg-6">
                <div class="hero-content">
                    <h1 class="display-2 hero-title editable" data-aos="fade-up" data-aos-delay="600" data-placeholder="Главный заголовок страницы">
                        Відкрийте Український Камінь
                    </h1>
                    <p class="lead hero-subtitle mb-4 editable" data-aos="fade-up" data-aos-delay="800" data-placeholder="Описание вашей компании или услуг">
                        Преміальні плити, пам'ятники та меморіали, виготовлені з найкращих матеріалів України.
                    </p>
                    <div class="hero-actions" data-aos="fade-up" data-aos-delay="1000">
                        <a @guest href="#products" @endguest
                        @auth
                            @if(auth()->user()->canEditContent())
                                href="javascript:void(0)"
                           data-original-href="#products"
                           @else
                               href="#products"
                           @endif
                           @endauth
                           class="btn btn-primary btn-lg me-3 custom-btn-primary @auth @if(auth()->user()->canEditContent()) admin-disabled-btn @endif @endauth">
                            <i class="fas fa-gem me-2"></i><span class="@auth @if(auth()->user()->canEditContent()) editable @endif @endauth" @auth @if(auth()->user()->canEditContent()) data-placeholder="Текст кнопки" @endif @endauth>Переглянути продукцію</span>
                        </a>
                        <a @guest href="#contact" @endguest
                        @auth
                            @if(auth()->user()->canEditContent())
                                href="javascript:void(0)"
                           data-original-href="#contact"
                           @else
                               href="#contact"
                           @endif
                           @endauth
                           class="btn btn-outline-primary btn-lg custom-btn-secondary @auth @if(auth()->user()->canEditContent()) admin-disabled-btn @endif @endauth">
                            <i class="fas fa-envelope me-2"></i><span class="@auth @if(auth()->user()->canEditContent()) editable @endif @endauth" @auth @if(auth()->user()->canEditContent()) data-placeholder="Текст кнопки" @endif @endauth>Зв'язатися з нами</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="hero-image" data-aos="fade-left" data-aos-delay="1200">
                    <img src="https://placehold.co/600x500/8B4513/FFFFFF?text=Українська+кам'яна+плита&font=playfair"
                         alt="Українська кам'яна плита"
                         class="img-fluid rounded-3 shadow-lg"
                         loading="lazy">
                    {{-- Подпись под изображением тоже можно сделать редактируемой --}}
                    <div class="text-center mt-3">
                        <small class="text-muted editable" data-placeholder="Подпись к изображению">Преміальна українська кам'яна плита</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

{{-- 
ИЗМЕНЕНИЯ В HERO СЕКЦИИ:
1. Главный заголовок (h1) - редактируемый
2. Подзаголовок (p.lead) - редактируемый  
3. Текст внутри кнопок обернут в span.editable
4. Добавлена редактируемая подпись под изображением
5. Все элементы имеют понятные data-placeholder атрибуты

ОСОБЕННОСТИ:
- Большие заголовки автоматически переносятся при редактировании
- Сохраняются все AOS анимации
- Bootstrap классы остаются неизменными
- Кнопки остаются функциональными (только текст редактируется)

РЕЗУЛЬТАТ:
Администратор может легко изменить:
- Главный слоган компании
- Описание услуг
- Тексты на кнопках
- Подписи к изображениям
--}}