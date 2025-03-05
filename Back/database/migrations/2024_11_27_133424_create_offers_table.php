<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100)->nullable(false);
            $table->string('description', 1500)->nullable();
            $table->foreignId('user_id')->constrained();
            $table->boolean('is_visible')->default(true);
            $table->boolean('is_donation')->default(false);

            $table->double('longitude')->nullable();
            $table->double('latitude')->nullable();
            $table->string('city_name', 100)->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offers');
    }
};
