@extends('layouts.app')

@section('title', 'Реєстрація - Український Камінь')
@section('description', 'Створіть обліковий запис для доступу до системи')

@section('content')
    <div class="auth-container">
        <div class="auth-card">
            <div class="auth-header">
                <h1 class="h3 mb-3">
                    <i class="fas fa-user-plus me-2"></i>
                    Реєстрація
                </h1>
                <p class="mb-0 text-light opacity-75">
                    Створіть новий обліковий запис
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

                <form method="POST" action="{{ route('register') }}">
                    @csrf

                    <div class="form-floating mb-3">
                        <input type="text"
                               class="form-control @error('name') is-invalid @enderror"
                               id="name"
                               name="name"
                               placeholder="Ім'я"
                               value="{{ old('name') }}"
                               required
                               autocomplete="name"
                               autofocus>
                        <label for="name">
                            <i class="fas fa-user me-2"></i>Повне ім'я
                        </label>
                        @error('name')
                        <div class="invalid-feedback">
                            {{ $message }}
                        </div>
                        @enderror
                    </div>

                    <div class="form-floating mb-3">
                        <input type="email"
                               class="form-control @error('email') is-invalid @enderror"
                               id="email"
                               name="email"
                               placeholder="name@example.com"
                               value="{{ old('email') }}"
                               required
                               autocomplete="email">
                        <label for="email">
                            <i class="fas fa-envelope me-2"></i>Електронна пошта
                        </label>
                        @error('email')
                        <div class="invalid-feedback">
                            {{ $message }}
                        </div>
                        @enderror

                        @if(old('email') === config('app.admin_email'))
                            <div class="mt-2">
                                <div class="alert alert-warning alert-sm d-flex align-items-center">
                                    <i class="fas fa-crown text-warning me-2"></i>
                                    <small>Ця електронна пошта має права адміністратора</small>
                                </div>
                            </div>
                        @endif
                    </div>

                    <div class="form-floating mb-3">
                        <input type="password"
                               class="form-control @error('password') is-invalid @enderror"
                               id="password"
                               name="password"
                               placeholder="Пароль"
                               required
                               autocomplete="new-password">
                        <label for="password">
                            <i class="fas fa-lock me-2"></i>Пароль
                        </label>
                        @error('password')
                        <div class="invalid-feedback">
                            {{ $message }}
                        </div>
                        @enderror
                    </div>

                    <div class="form-floating mb-4">
                        <input type="password"
                               class="form-control"
                               id="password_confirmation"
                               name="password_confirmation"
                               placeholder="Підтвердження паролю"
                               required
                               autocomplete="new-password">
                        <label for="password_confirmation">
                            <i class="fas fa-lock me-2"></i>Підтвердження паролю
                        </label>
                    </div>

                    <div class="d-grid mb-3">
                        <button type="submit" class="btn btn-auth btn-lg">
                            <i class="fas fa-user-plus me-2"></i>
                            Зареєструватися
                        </button>
                    </div>

                    <hr class="my-4">
                    <div class="text-center">
                        <p class="text-muted mb-2">Вже є обліковий запис?</p>
                        <a href="{{ route('login') }}" class="btn btn-outline-secondary">
                            <i class="fas fa-sign-in-alt me-2"></i>
                            Увійти
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection