<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;

class AdminHelper
{
    /**
     * Проверяем является ли пользователь администратором
     *
     * @return bool
     */
    public static function isAdmin(): bool
    {
        return Auth::check() && Auth::user()->isAdmin();
    }

    /**
     * Проверяем может ли пользователь редактировать контент
     *
     * @return bool
     */
    public static function canEditContent(): bool
    {
        return Auth::check() && Auth::user()->canEditContent();
    }

    /**
     * Получаем роль пользователя для frontend
     *
     * @return string
     */
    public static function getUserRole(): string
    {
        if (!Auth::check()) {
            return 'guest';
        }

        return Auth::user()->isAdmin() ? 'admin' : 'user';
    }

    /**
     * Проверяем доступ к админским функциям или выбрасываем 403
     *
     * @return void
     * @throws \Symfony\Component\HttpKernel\Exception\HttpException
     */
    public static function requireAdmin(): void
    {
        if (!self::isAdmin()) {
            abort(403, 'У вас немає прав доступу до цієї сторінки.');
        }
    }

    /**
     * Проверяем авторизацию или редиректим на логин
     *
     * @return void
     */
    public static function requireAuth(): void
    {
        if (!Auth::check()) {
            abort(401, 'Необхідно увійти в систему для доступу до цієї сторінки.');
        }
    }
}