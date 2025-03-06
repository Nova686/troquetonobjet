<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Language;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $languages = [
            ["id" => 1, "codeISO" => "fr"],
            ["id" => 2, "codeISO" => "en"],
            ["id" => 3, "codeISO" => "it"],
            ["id" => 4, "codeISO" => "es"],
            ["id" => 5, "codeISO" => "de"]
        ];

        foreach ($languages as $element) 
        {
            Language::create($element);
        }
    }
}
