<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property int $category_id
 * @property string $name
 * @property int $language_id
 * @property Category $category
 * @property Language $language
 */

class SubCategory extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
    ];

    
    public function category(){
        return $this->belongsTo(Category::class);
    }
    public function language(){
        return $this->belongsTo(Language::class);
    }
}
