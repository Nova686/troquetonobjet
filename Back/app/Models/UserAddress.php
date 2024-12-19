<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $user_id
 * @property float $longitude
 * @property float $latitude
 * @property string $city_name
 * 
 * @property User $user
 */
class UserAddress extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id", "longitude",
        "latitude", "city_name"
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
