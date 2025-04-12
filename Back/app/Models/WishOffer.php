<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $text
 * @property SubCategory $subCategory
 * @property Offer $offer
 */
class WishOffer extends Model
{
    use HasFactory;

    protected $fillable = ['text'];

    public function offer(): BelongsTo
    {
        return $this->belongsTo(Offer::class);
    }

    public function subCategory(): BelongsTo
    {
        return $this->belongsTo(SubCategory::class);
    }
}
