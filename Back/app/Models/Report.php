<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

/**
 * 
 * @property int $id
 * @property int $user_id
 * @property int $offer_id
 * @property string $reason
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property User $user
 * @property Offer $offer
 */
class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'reason'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }
}
