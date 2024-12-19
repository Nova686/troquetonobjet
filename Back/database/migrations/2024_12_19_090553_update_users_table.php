<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) 
        {
            $table->uuid("public_id")
                ->unique("index_user_public_id")
                ->default(DB::raw('(UUID())'));
            
            $table->foreignId("language_id")->constrained();
        
            $table->string("first_name", 300);
            $table->string("last_name", 300);
            $table->string("phone", 20)->nullable();
            $table->boolean("is_admin")->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
