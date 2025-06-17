<!-- Navigation -->
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top custom-navbar">
    <div class="container">
        <a class="navbar-brand" href="{{ route('home') }}" data-aos="fade-right">
            <span class="logo-text @if(\App\Helpers\AdminHelper::canEditContent()) editable @endif"
                  @if(\App\Helpers\AdminHelper::canEditContent()) data-placeholder="Название компании" @endif>
                Український Камінь
            </span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Переключити навігацію">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <!-- Основные пункты меню -->
                <li class="nav-item" data-aos="fade-left" data-aos-delay="100">
                    <a class="nav-link @if(\App\Helpers\AdminHelper::canEditContent()) editable @endif"
                       @guest href="#products" @endguest
                       @auth
                           @if(\App\Helpers\AdminHelper::canEditContent())
                               href="javascript:void(0)"
                       data-original-href="#products"
                       @else
                           href="#products"
                       @endif
                       @endauth
                       @if(\App\Helpers\AdminHelper::canEditContent()) data-placeholder="Пункт меню" @endif>
                        Продукція
                    </a>
                </li>
                <li class="nav-item" data-aos="fade-left" data-aos-delay="200">
                    <a class="nav-link @if(\App\Helpers\AdminHelper::canEditContent()) editable @endif"
                       @guest href="#quarry" @endguest
                       @auth
                           @if(\App\Helpers\AdminHelper::canEditContent())
                               href="javascript:void(0)"
                       data-original-href="#quarry"
                       @else
                           href="#quarry"
                       @endif
                       @endauth
                       @if(\App\Helpers\AdminHelper::canEditContent()) data-placeholder="Пункт меню" @endif>
                        Кар'єр
                    </a>
                </li>
                <li class="nav-item" data-aos="fade-left" data-aos-delay="300">
                    <a class="nav-link @if(\App\Helpers\AdminHelper::canEditContent()) editable @endif"
                       @guest href="#production" @endguest
                       @auth
                           @if(\App\Helpers\AdminHelper::canEditContent())
                               href="javascript:void(0)"
                       data-original-href="#production"
                       @else
                           href="#production"
                       @endif
                       @endauth
                       @if(\App\Helpers\AdminHelper::canEditContent()) data-placeholder="Пункт меню" @endif>
                        Виробництво
                    </a>
                </li>
                <li class="nav-item" data-aos="fade-left" data-aos-delay="400">
                    <a class="nav-link @if(\App\Helpers\AdminHelper::canEditContent()) editable @endif"
                       @guest href="#contact" @endguest
                       @auth
                           @if(\App\Helpers\AdminHelper::canEditContent())
                               href="javascript:void(0)"
                       data-original-href="#contact"
                       @else
                           href="#contact"
                       @endif
                       @endauth
                       @if(\App\Helpers\AdminHelper::canEditContent()) data-placeholder="Пункт меню" @endif>
                        Контакти
                    </a>
                </li>

                <!-- Разделитель -->
                <li class="nav-item">
                    <span class="navbar-text text-muted mx-2">|</span>
                </li>

                <!-- Блок авторизации -->
                @guest
                    <li class="nav-item" data-aos="fade-left" data-aos-delay="500">
                        <a class="nav-link" href="{{ route('login') }}">
                            <i class="fas fa-sign-in-alt me-1"></i>Вхід
                        </a>
                    </li>
                    @if (Route::has('register'))
                        <li class="nav-item" data-aos="fade-left" data-aos-delay="600">
                            <a class="nav-link" href="{{ route('register') }}">
                                <i class="fas fa-user-plus me-1"></i>Реєстрація
                            </a>
                        </li>
                    @endif
                @else
                    <!-- Dropdown для авторизованного пользователя -->
                    <li class="nav-item dropdown" data-aos="fade-left" data-aos-delay="500">
                        <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            @if(auth()->user()->isAdmin())
                                <i class="fas fa-crown text-warning me-2"></i>
                            @else
                                <i class="fas fa-user me-2"></i>
                            @endif
                            <span>{{ auth()->user()->name }}</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            @if(auth()->user()->isAdmin())
                                <li>
                                    <span class="dropdown-item-text">
                                        <i class="fas fa-star text-warning me-2"></i>
                                        <small class="text-muted">Адміністратор</small>
                                    </span>
                                </li>
                                <li><hr class="dropdown-divider"></li>
                            @endif
                            <li>
                                <a class="dropdown-item" href="#" onclick="event.preventDefault();">
                                    <i class="fas fa-user-circle me-2"></i>Профіль
                                </a>
                            </li>
                            <li><hr class="dropdown-divider"></li>
                            <li>
                                <a class="dropdown-item text-danger" href="{{ route('logout') }}"
                                   onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    <i class="fas fa-sign-out-alt me-2"></i>Вийти
                                </a>
                            </li>
                        </ul>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                            @csrf
                        </form>
                    </li>
                @endguest
            </ul>
        </div>
    </div>
</nav>