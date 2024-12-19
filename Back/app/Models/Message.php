<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * 
 * @property int $id
 * @property string $content
 * @property string $ip_address
 * @property bool $is_visible
 * @property int $sender_id
 * @property int $offer_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property User $sender
 */
class Message extends Model
{
    use SoftDeletes;

    protected $fillable = ['content'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function offer(): BelongsTo
    {
        return $this->belongsTo(Offer::class);
    }


    public function getIsUpdatedAttribute(): bool
    {
        return $this->updated_at->getTimestamp() !== $this->created_at->getTimestamp();
    }
}
