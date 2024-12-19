<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;

class insert_into_language extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $liste = [
            ["id" => 1, "codeISO" => "fr"],
            ["id" => 2, "codeISO" => "en"],
            ["id" => 3, "codeISO" => "it"],
            ["id" => 4, "codeISO" => "es"],
            ["id" => 5, "codeISO" => "de"]
        ];

        foreach ($liste as $element) 
        {
            Language::create($element);
        }
    }
}
