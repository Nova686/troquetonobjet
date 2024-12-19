<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

/**
 * 
 * @property bool $is_closed_buyer
 * @property bool $is_closed_seller
 * @property User $buyer
 * @property int $buyer_id
 * @property User $seller
 * @property int $seller_id
 * @property Offer $offer
 * @property int $offer_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Conversation extends Model
{

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function offer(): BelongsTo
    {
        return $this->belongsTo(Offer::class);
    }

    public function scopeIsVisible(Builder $query): Builder
    {
        return $query->where(function ($q) {
            $q->where(function ($q) {
                $q->where('seller_id', Auth::user()->id)
                ->where('is_closed_seller', false);
            })->orWhere(function ($q) {
                $q->where('buyer_id', Auth::user()->id)
                ->where('is_closed_buyer', false);
            });
        });
    }
}
