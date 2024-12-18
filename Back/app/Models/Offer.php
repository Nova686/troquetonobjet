<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * 
 * @property string $title
 * @property string $description
 * @property bool $is_visible
 * @property bool $is_donation
 * @property float $longitude
 * @property float $latitude
 * @property string $city_name
 * @property User $user
 */
class Offer extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title', 'description', 'is_visible', 'is_donation', 'longitude', 'latitude', 'city_name'
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
