<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FillLanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::beginTransaction();
        try {
            $languages = [
                1 => [ "codeISO" => "fr" ],
                2 => [ "codeISO" => "en" ],
                3 => [ "codeISO" => "it" ],
                4 => [ "codeISO" => "es" ],
                5 => [ "codeISO" => "de" ],
            ];

            foreach ($languages as $id => $fields) {
                Language::updateOrCreate(
                    ['id' => $id],
                    $fields
                );
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            echo $e->getMessage();
        }
    }
}
