<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', config('app.name', 'Український Камінь'))</title>
    <meta name="description" content="@yield('description', 'Преміальні кам\'яні плити, пам\'ятники та меморіали виготовлені з найкращих українських матеріалів')">

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">

    <!-- AOS Library -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" rel="stylesheet">

    <!-- Vite Assets -->
    @vite(['resources/js/app.js', 'resources/js/inline-editor.js', 'resources/css/inline-editor.css', 'resources/css/admin.css'])

    @stack('styles')
</head>
<body data-user-role="{{ \App\Helpers\AdminHelper::getUserRole() }}"
      data-editing-enabled="{{ \App\Helpers\AdminHelper::canEditContent() ? 'true' : 'false' }}">

<!-- Admin Panel Indicator -->
@if(\App\Helpers\AdminHelper::isAdmin())
    <div id="admin-indicator" class="admin-indicator">
        <div class="admin-indicator-content">
            <i class="fas fa-edit me-2"></i>
            <span>Режим редагування</span>
            <div class="admin-controls">
                <button id="toggle-editing" class="btn btn-sm btn-outline-light ms-2">
                    <i class="fas fa-eye me-1"></i>
                    <span>Переглянути як гість</span>
                </button>
                <a href="{{ route('logout') }}"
                   onclick="event.preventDefault(); document.getElementById('logout-form').submit();"
                   class="btn btn-sm btn-outline-light ms-2">
                    <i class="fas fa-sign-out-alt me-1"></i>Вийти
                </a>
            </div>
        </div>
        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
            @csrf
        </form>
    </div>
@endif

<!-- Preloader Component -->
@include('components.preloader')

<!-- Navigation Component -->
@include('components.navbar')

<!-- Main Content -->
<main id="main-content">
    @yield('content')
</main>

<!-- Footer Component -->
@include('components.footer')

<!-- Bootstrap 5 JS Bundle -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>

<!-- AOS Library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>

@stack('scripts')
</body>
</html>