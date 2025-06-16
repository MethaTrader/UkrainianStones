<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class ContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:255'],
            'email' => ['required', 'email:rfc,dns', 'max:255'],
            'phone' => ['nullable', 'string', 'regex:/^(\+380|0)[0-9]{9}$/', 'max:20'],
            'subject' => ['required', 'string', 'in:products,quote,custom,support,other'],
            'message' => ['required', 'string', 'min:10', 'max:2000'],
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'name' => 'ім\'я',
            'email' => 'електронна пошта',
            'phone' => 'номер телефону',
            'subject' => 'тема',
            'message' => 'повідомлення',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Поле "Ім\'я" є обов\'язковим.',
            'name.min' => 'Ім\'я повинно містити принаймні :min символи.',
            'name.max' => 'Ім\'я не може містити більше :max символів.',

            'email.required' => 'Поле "Електронна пошта" є обов\'язковим.',
            'email.email' => 'Введіть коректну адресу електронної пошти.',
            'email.max' => 'Електронна пошта не може містити більше :max символів.',

            'phone.regex' => 'Введіть коректний номер телефону у форматі +380XXXXXXXXX або 0XXXXXXXXX.',
            'phone.max' => 'Номер телефону не може містити більше :max символів.',

            'subject.required' => 'Поле "Тема" є обов\'язковим.',
            'subject.in' => 'Оберіть коректну тему зі списку.',

            'message.required' => 'Поле "Повідомлення" є обов\'язковим.',
            'message.min' => 'Повідомлення повинно містити принаймні :min символів.',
            'message.max' => 'Повідомлення не може містити більше :max символів.',
        ];
    }
}