<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Главная страница
Route::get('/', function () {
    return view('pages.home');
})->name('home');

// Маршруты авторизации (Laravel UI)
Auth::routes();

// Защищенные маршруты для администратора (без middleware, с проверкой в контроллере)
Route::middleware('auth')->group(function () {
    // Админ панель
    Route::get('/admin', function () {
        // Проверяем права администратора
        if (!auth()->user()->isAdmin()) {
            abort(403, 'У вас немає прав доступу до цієї сторінки.');
        }

        return redirect()->route('home')->with('success', 'Ласкаво просимо в режим адміністратора!');
    })->name('admin.dashboard');

    // Профиль пользователя
    Route::get('/profile', function () {
        return redirect()->route('home');
    })->name('profile');
});

// API маршруты для inline редактирования (с проверкой в контроллере)
Route::middleware('auth')->prefix('api')->group(function () {
    // Пример API роута с проверкой прав
    // Route::post('/content/update', function() {
    //     if (!auth()->user()->isAdmin()) {
    //         return response()->json(['error' => 'Недостатньо прав'], 403);
    //     }
    //     // Логика обновления контента
    // })->name('api.content.update');
});