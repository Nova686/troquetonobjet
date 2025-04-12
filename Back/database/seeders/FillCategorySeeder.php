<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FillCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::beginTransaction();
        try {
            $categories = [
                1 => [
                    'language_id' => 1,
                    'name' => 'Informatique',
                    'sub_categories' => [
                        1 => [ 'name' => 'Informatique' ],
                        2 => [ 'name' => 'Électronique' ],
                    ]
                ],
                2 => [
                    'language_id' => 1,
                    'name' => 'Vêtement',
                    'sub_categories' => [
                        3 => [ 'name' => 'Vêtement' ],
                        4 => [ 'name' => 'Accessoires de mode' ],
                        5 => [ 'name' => 'Fournitures pour bébé' ],
                        6 => [ 'name' => 'Chaussures' ],
                    ]
                ],
                3 => [
                    'language_id' => 1,
                    'name' => 'Mobilier',
                    'sub_categories' => [
                        7 => [ 'name' => 'Décoration' ],
                        8 => [ 'name' => 'Meuble' ],
                    ]
                ],
                4 => [
                    'language_id' => 1,
                    'name' => 'Jouets',
                    'sub_categories' => [
                        9 => [ 'name' => 'Enfance' ],
                        10 => [ 'name' => 'Adolescence' ],
                    ]
                ],
                5 => [
                    'language_id' => 1,
                    'name' => 'Électroménager',
                    'sub_categories' => [
                        11 => [ 'name' => 'Électroménager' ],
                    ]
                ],
                6 => [
                    'language_id' => 1,
                    'name' => 'Bricolage',
                    'sub_categories' => [
                        12 => [ 'name' => 'Outils' ],
                    ]
                ],
                7 => [
                    'language_id' => 1,
                    'name' => 'Sport',
                    'sub_categories' => [
                        13 => [ 'name' => 'Vêtement' ],
                        14 => [ 'name' => 'Accessoire' ],
                    ]
                ],
                8 => [
                    'language_id' => 1,
                    'name' => 'Instruments de musique',
                    'sub_categories' => [
                        15 => [ 'name' => 'Instrument' ],
                        16 => [ 'name' => 'Accessoire' ],
                    ]
                ],
                9 => [
                    'language_id' => 1,
                    'name' => 'Culture',
                    'sub_categories' => [
                        17 => [ 'name' => 'Livre' ],
                        18 => [ 'name' => 'Films et séries' ],
                        19 => [ 'name' => 'Jeux vidéo' ],
                        20 => [ 'name' => 'Éducation et apprentissage' ],
                    ]
                ],
                10 => [
                    'language_id' => 1,
                    'name' => 'Bijoux et accessoires',
                    'sub_categories' => [
                        21 => [ 'name' => 'Collier' ],
                        22 => [ 'name' => 'Bracelet' ],
                        23 => [ 'name' => 'Boucle d\'oreille' ],
                    ]
                ]
            ];

            foreach ($categories as $id => $fields) {
                Category::updateOrCreate(
                    [ 'id' => $id ],
                    [
                        'language_id' => $fields['language_id'],
                        'name' => $fields['name'],
                    ]
                );
                foreach ($fields['sub_categories'] as $subId => $subFields) {
                    $subFields['category_id'] = $id;
                    $subFields['language_id'] = $fields['language_id'];
                    SubCategory::updateOrCreate(
                        ['id' => $subId],
                        $subFields
                    );
                }
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            echo $e->getMessage();
        }
    }
}
