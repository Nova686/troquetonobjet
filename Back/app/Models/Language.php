<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $codeISO
 * @property Category[] $category
 * @property SubCategory[] $subCategory
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
    protected $table = 'categories';

    public function subCategory(){
        return $this->hasMany(SubCategory::class);
    }
    public function category(){
        return $this->hasMany(Category::class);
    }
    public function languageTrad(){
        return $this->hasMany(LanguageTrad::class);
    }
}