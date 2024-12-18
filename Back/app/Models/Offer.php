<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * 
 * @property int $id
 * @property string $title
 * @property string $description
 * @property bool $is_visible
 * @property bool $is_donation
 * @property float $longitude
 * @property float $latitude
 * @property string $city_name
 * @property int $user_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property User $user
 */
class Offer extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title', 'description', 'is_visible', 'is_donation', 'longitude', 'latitude', 'city_name'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getIsUpdatedAttribute(): bool
    {
        return $this->updated_at->getTimestamp() !== $this->created_at->getTimestamp();
    }

    public function scopeIsVisible(Builder $query, bool $isVisible = true)
    {
        return $query->where('is_visible', $isVisible);
    }
}
