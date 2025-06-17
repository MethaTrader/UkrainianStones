@extends('layouts.app')

@section('title', 'Вхід - Український Камінь')
@section('description', 'Увійдіть в систему для доступу до панелі управління')

@section('content')
    <div class="auth-container">
        <div class="auth-card">
            <div class="auth-header">
                <h1 class="h3 mb-3">
                    <i class="fas fa-sign-in-alt me-2"></i>
                    Вхід в систему
                </h1>
                <p class="mb-0 text-light opacity-75">
                    Введіть свої дані для входу
                </p>
            </div>

            <div class="auth-body">
                @if($errors->any())
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        <strong>Помилка!</strong>
                        <ul class="mb-0 mt-2">
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                @endif

                @if(session('status'))
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <i class="fas fa-check-circle me-2"></i>
                        {{ session('status') }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                @endif

                <form method="POST" action="{{ route('login') }}">
                    @csrf

                    <div class="form-floating mb-3">
                        <input type="email"
                               class="form-control @error('email') is-invalid @enderror"
                               id="email"
                               name="email"
                               placeholder="name@example.com"
                               value="{{ old('email') }}"
                               required
                               autocomplete="email"
                               autofocus>
                        <label for="email">
                            <i class="fas fa-envelope me-2"></i>Електронна пошта
                        </label>
                        @error('email')
                        <div class="invalid-feedback">
                            {{ $message }}
                        </div>
                        @enderror
                    </div>

                    <div class="form-floating mb-3">
                        <input type="password"
                               class="form-control @error('password') is-invalid @enderror"
                               id="password"
                               name="password"
                               placeholder="Пароль"
                               required
                               autocomplete="current-password">
                        <label for="password">
                            <i class="fas fa-lock me-2"></i>Пароль
                        </label>
                        @error('password')
                        <div class="invalid-feedback">
                            {{ $message }}
                        </div>
                        @enderror
                    </div>

                    <div class="form-check mb-3">
                        <input class="form-check-input"
                               type="checkbox"
                               name="remember"
                               id="remember"
                                {{ old('remember') ? 'checked' : '' }}>
                        <label class="form-check-label" for="remember">
                            Запам'ятати мене
                        </label>
                    </div>

                    <div class="d-grid mb-3">
                        <button type="submit" class="btn btn-auth btn-lg">
                            <i class="fas fa-sign-in-alt me-2"></i>
                            Увійти
                        </button>
                    </div>

                    <div class="text-center">
                        @if (Route::has('password.request'))
                            <a class="text-decoration-none text-muted" href="{{ route('password.request') }}">
                                <i class="fas fa-key me-1"></i>
                                Забули пароль?
                            </a>
                        @endif
                    </div>

                    @if (Route::has('register'))
                        <hr class="my-4">
                        <div class="text-center">
                            <p class="text-muted mb-2">Ще немає облікового запису?</p>
                            <a href="{{ route('register') }}" class="btn btn-outline-secondary">
                                <i class="fas fa-user-plus me-2"></i>
                                Зареєструватися
                            </a>
                        </div>
                    @endif
                </form>
            </div>
        </div>
    </div>
@endsection