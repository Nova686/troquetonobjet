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
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'category_id',
        'language_id',
    ];

    protected $table = "sub_categories";
    
    public function category(){
        return $this->belongsTo(Category::class);
    }
    public function language(){
        return $this->belongsTo(Language::class);
    }
}
