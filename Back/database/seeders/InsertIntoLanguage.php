<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;

class InsertIntoLanguage extends Seeder
{
    /**
     * Run the database seeds.
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
