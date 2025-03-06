<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        $faker = \Faker\Factory::create('fr_FR');

        $username = $faker->unique()->userName;

        return [
            'username' => $username,
            'email' => $username . '@tto.fr',
            'password' => bcrypt('admin'),
            'email_verified_at' => now(),
            'phone' => $faker->e164PhoneNumber(),
            'language_id' => 1,
            'remember_token' => null,
        ];
    }
}
