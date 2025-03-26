<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\Offer;
use App\Models\User;
use App\Models\UserAddress;
use App\Models\WishOffer;
use App\Models\Report;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(FillLanguageSeeder::class);
        $this->call(FillCategorySeeder::class);

        // Create Users
        $admin = User::createOrFirst([
            'email' => 'admin@tto.fr',
        ],
        [
            'username' => 'Admin',
            'password' => bcrypt('admin'),
            'email_verified_at' => now(),
            'phone' => 3630,
            'language_id' => 1
        ]);
        $users = User::factory(9)->create();
        $users->prepend($admin);

        // Create offers
        $offers = collect();
        $users->each(function ($user) use ($offers, $users) {

            // Create User Addresses
            UserAddress::factory(rand(0, 2))->create([
                'user_id' => $user->id
            ]);

            // Create Offers 
            Offer::factory(rand(0, 5))->create([
                'user_id' => $user->id,
            ])->each(function ($offer) use ($offers, $users) {
                $offers->push($offer);

                // Create Wish offer
                WishOffer::factory(rand(0, 2))->create([
                    'offer_id' => $offer->id,
                ]);

                // Create Conversation
                if (rand(1, 4) === 1) { // 25%
                    $conversation = Conversation::factory()->create(function () use ($offer, $users) {
                        return [
                            'offer_id' => $offer->id,
                            'seller_id' => $offer->user_id,
                            'buyer_id' => $users->filter(fn ($u) => $u->id !== $offer->user_id)->random()->id
                        ];
                    });

                    // Create Message
                    Message::factory(rand(0, 50))->create(function () use ($conversation) {
                        return [
                            'conversation_id' => $conversation->id,
                            'sender_id' => collect([$conversation->seller_id, $conversation->buyer_id])->random(),
                        ];
                    });
                }
            });
        });

        // Create Favorite Offers
        $users->each(function ($user) use ($offers) {
            $user->favoriteOffers()->attach($offers->random());
        });

        // Create Reports
        Report::factory(5)->create(function () use ($offers, $users) {
            $offer = $offers->random();
            return [
                'offer_id' => $offer->id,  // Assign the offer ID
                'user_id' => $users->filter(fn ($u) => $u->id !== $offer->user_id)->random()->id,  // Filter users dynamically based on the offer's owner
            ];
        });
    }
}
