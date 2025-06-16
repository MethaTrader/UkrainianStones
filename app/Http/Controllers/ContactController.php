<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

final class ContactController extends Controller
{
    /**
     * Send contact form message.
     */
    public function send(ContactRequest $request): RedirectResponse
    {
        try {
            // Log the contact form submission
            Log::info('Contact form submitted', [
                'name' => $request->validated('name'),
                'email' => $request->validated('email'),
                'subject' => $request->validated('subject'),
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            // Here you can add email sending logic
            // Mail::to('info@ukrainianstone.ua')->send(new ContactMail($request->validated()));

            return redirect()
                ->route('home')
                ->with('success', 'Дякуємо! Ваше повідомлення успішно відправлено. Ми зв\'яжемося з вами найближчим часом.');

        } catch (\Exception $e) {
            Log::error('Contact form submission failed', [
                'error' => $e->getMessage(),
                'data' => $request->validated(),
            ]);

            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Виникла помилка при відправці форми. Спробуйте ще раз або зв\'яжіться з нами за телефоном.');
        }
    }
}