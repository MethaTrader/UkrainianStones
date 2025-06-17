@extends('layouts.app')

@section('title', 'Український Камінь - Преміальні плити, пам\'ятники та меморіали')
@section('description', 'Преміальні кам\'яні плити, пам\'ятники та меморіали виготовлені з найкращих українських матеріалів')

@section('content')
    <!-- Hero Section -->
    @include('components.hero')

    <!-- Products Section -->
    @include('components.products')

    <!-- Quarry Section -->
    <section id="quarry" class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="display-4 text-center mb-5 section-title" data-aos="fade-up">
                        Наш Кар'єр
                    </h2>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-lg-6" data-aos="fade-right" data-aos-delay="200">
                    <div class="content-text">
                        <p class="lead fs-4">
                            Видобуваємо камінь з найкращих українських кар'єрів, відомих своєю якістю та довговічністю.
                        </p>
                        <p class="text-muted">
                            Наші кар'єри працюють понад 50 років, забезпечуючи стабільну якість та надійні ланцюги постачання для проєктів по всьому світу.
                        </p>
                        <ul class="list-unstyled">
                            <li class="mb-2">
                                <i class="fas fa-check-circle text-primary me-2"></i>
                                Преміальні матеріали найвищої якості
                            </li>
                            <li class="mb-2">
                                <i class="fas fa-check-circle text-primary me-2"></i>
                                Стійкі методи видобутку
                            </li>
                            <li class="mb-2">
                                <i class="fas fa-check-circle text-primary me-2"></i>
                                Дотримання екологічних норм
                            </li>
                            <li class="mb-2">
                                <i class="fas fa-check-circle text-primary me-2"></i>
                                Сертифікована якість продукції
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-6" data-aos="fade-left" data-aos-delay="400">
                    <div class="content-image">
                        <img src="https://placehold.co/600x400/8B4513/FFFFFF?text=Український+кар'єр&font=playfair"
                             alt="Український кам'яний кар'єр"
                             class="img-fluid rounded-3 shadow"
                             loading="lazy">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Production Section -->
    <section id="production" class="py-5 bg-light">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="display-4 text-center mb-5 section-title" data-aos="fade-up">
                        Процес Виробництва
                    </h2>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-lg-6 order-lg-2" data-aos="fade-left" data-aos-delay="200">
                    <div class="content-text">
                        <p class="lead fs-4">
                            Передові технології гарантують, що кожна деталь відповідає найвищим стандартам.
                        </p>
                        <p class="text-muted">
                            Наше сучасне виробництво поєднує традиційну майстерність з новітніми технологіями для досягнення винятковых результатів.
                        </p>
                        <div class="row mt-4">
                            <div class="col-6" data-aos="flip-left" data-aos-delay="400">
                                <div class="text-center">
                                    <i class="fas fa-cogs fa-3x text-primary mb-3"></i>
                                    <h5>Точна обробка</h5>
                                    <p class="small text-muted">Високоточне різання та шліфування</p>
                                </div>
                            </div>
                            <div class="col-6" data-aos="flip-right" data-aos-delay="600">
                                <div class="text-center">
                                    <i class="fas fa-gem fa-3x text-primary mb-3"></i>
                                    <h5>Якісна обробка</h5>
                                    <p class="small text-muted">Професійне полірування та оздоблення</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 order-lg-1" data-aos="fade-right" data-aos-delay="400">
                    <div class="content-image">
                        <img src="https://placehold.co/600x400/A0522D/FFFFFF?text=Процес+виробництва&font=playfair"
                             alt="Процес виробництва каменю"
                             class="img-fluid rounded-3 shadow"
                             loading="lazy">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Statistics Section -->
    @include('components.statistics')

    <!-- Contact Section -->
    <section id="contact" class="py-5 bg-light">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="display-4 text-center mb-5 section-title" data-aos="fade-up">
                        Зв'яжіться з нами
                    </h2>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-8" data-aos="zoom-in" data-aos-delay="200">
                    <div class="card shadow-lg border-0">
                        <div class="card-body p-5">
                            <form class="contact-form" action="#" method="POST">
                                @csrf
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-4">
                                            <label for="name" class="form-label fw-semibold">Ім'я</label>
                                            <input type="text" class="form-control form-control-lg custom-input"
                                                   id="name" name="name" placeholder="Ваше ім'я" required
                                                   value="{{ old('name') }}">
                                            @error('name')
                                            <div class="invalid-feedback d-block">{{ $message }}</div>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-4">
                                            <label for="email" class="form-label fw-semibold">Електронна пошта</label>
                                            <input type="email" class="form-control form-control-lg custom-input"
                                                   id="email" name="email" placeholder="Ваша електронна пошта" required
                                                   value="{{ old('email') }}">
                                            @error('email')
                                            <div class="invalid-feedback d-block">{{ $message }}</div>
                                            @enderror
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <label for="phone" class="form-label fw-semibold">Телефон</label>
                                    <input type="tel" class="form-control form-control-lg custom-input"
                                           id="phone" name="phone" placeholder="+380 XX XXX XX XX"
                                           value="{{ old('phone') }}">
                                    @error('phone')
                                    <div class="invalid-feedback d-block">{{ $message }}</div>
                                    @enderror
                                </div>
                                <div class="mb-4">
                                    <label for="subject" class="form-label fw-semibold">Тема</label>
                                    <select class="form-select form-select-lg custom-input" id="subject" name="subject" required>
                                        <option value="">Оберіть тему</option>
                                        <option value="products" {{ old('subject') == 'products' ? 'selected' : '' }}>Продукція</option>
                                        <option value="quote" {{ old('subject') == 'quote' ? 'selected' : '' }}>Запит ціни</option>
                                        <option value="custom" {{ old('subject') == 'custom' ? 'selected' : '' }}>Індивідуальне замовлення</option>
                                        <option value="support" {{ old('subject') == 'support' ? 'selected' : '' }}>Підтримка</option>
                                        <option value="other" {{ old('subject') == 'other' ? 'selected' : '' }}>Інше</option>
                                    </select>
                                    @error('subject')
                                    <div class="invalid-feedback d-block">{{ $message }}</div>
                                    @enderror
                                </div>
                                <div class="mb-4">
                                    <label for="message" class="form-label fw-semibold">Повідомлення</label>
                                    <textarea class="form-control custom-input" id="message" name="message" rows="5"
                                              placeholder="Ваше повідомлення" required>{{ old('message') }}</textarea>
                                    @error('message')
                                    <div class="invalid-feedback d-block">{{ $message }}</div>
                                    @enderror
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="btn btn-primary btn-lg px-5 custom-btn-primary">
                                        <i class="fas fa-paper-plane me-2"></i>Відправити повідомлення
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact Info -->
            <div class="row mt-5">
                <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
                    <div class="contact-info text-center">
                        <i class="fas fa-map-marker-alt fa-3x text-primary mb-3"></i>
                        <h5>Адреса</h5>
                        <p class="text-muted">м. Київ, вул. Хрещатик, 1<br>Україна, 01001</p>
                    </div>
                </div>
                <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
                    <div class="contact-info text-center">
                        <i class="fas fa-phone fa-3x text-primary mb-3"></i>
                        <h5>Телефон</h5>
                        <p class="text-muted">+380 44 123 45 67<br>+380 50 123 45 67</p>
                    </div>
                </div>
                <div class="col-md-4" data-aos="fade-up" data-aos-delay="300">
                    <div class="contact-info text-center">
                        <i class="fas fa-envelope fa-3x text-primary mb-3"></i>
                        <h5>Електронна пошта</h5>
                        <p class="text-muted">info@ukrainianstone.ua<br>sales@ukrainianstone.ua</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection