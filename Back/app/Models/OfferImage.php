<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $offer_id
 * @property int $order
 * @property string $url
 * 
 * @property Offer $offer
 */
class OfferImage extends Model
{
    protected $fillable = [
        "offer_id", "order", "url"
    ];

    public $timestamps = false;

    public function offer(): BelongsTo
    {
        return $this->belongsTo(Offer::class);
    }
}
