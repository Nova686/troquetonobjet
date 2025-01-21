<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $name
 * @property int $language_id
 * @property SubCategory[] $subCategories
 * @property Language $language
 */
class Category extends Model
{
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
    ];

    public function subCategories(){
        return $this->hasMany(SubCategory::class);
    }
    public function language(){
        return $this->belongsTo(Language::class);
    }
}
