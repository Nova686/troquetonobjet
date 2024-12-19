<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $codeISO
 * @property Category[] $categories
 * @property SubCategory[] $subCategories
 * @property LanguageTrad[] $languageTrad
 */

Class Language extends Model
{
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'codeISO',
    ];

    public function subCategories(){
        return $this->hasMany(SubCategory::class);
    }
    public function categories(){
        return $this->hasMany(Category::class);
    }
    public function languageTrad(){
        return $this->hasMany(LanguageTrad::class);
    }
}