<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Report>
 */
class ReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $date = $this->faker->dateTimeBetween('-1 year', 'now');
        return [
            'reason' => $this->faker->text,
            'user_id' => $this->faker->numberBetween(1, 10),
            'offer_id' => $this->faker->numberBetween(1, 10),
            'created_at' => $date,
            'updated_at' => $this->faker->dateTimeBetween($date, 'now'),
        ];
    }
}
