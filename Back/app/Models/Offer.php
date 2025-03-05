<?php

namespace App\Models;

use App\Library\PaginationExport;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

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
        'updated_at' => 'datetime',
        'is_visible' => 'boolean',
        'is_donation' => 'boolean',
        'isUpdated' => 'boolean'
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

    /**
     * @return ?object
     */
    public static function get(int $_id, bool $_isVisible = true)
    {
        if($_id <= 0)
            return null;

        return self::BaseQuery($_id, $_isVisible)->first();
    }

    /**
     * @return PaginationExport
     */
    public static function getAll(int $_page, int $_nbPerPage, bool $_isVisible = true)
    {
        $request = self::BaseQuery(_isVisible: $_isVisible);

        $total = $request->count();

        $offers = $request
            ->skip(($_page - 1) * $_nbPerPage)
            ->take($_nbPerPage)
            ->get()
            ->toArray();

        return new PaginationExport(
            $offers,
            $_page,
            $_nbPerPage,
            $total
        );
    }

    private static function BaseQuery(int $_id = 0, bool $_isVisible = true)
    {
        return self::query()
        ->join(
            (new User())->getTable()." as u", 
            "u.id", "=", "offers.user_id"
        )
        ->leftJoin(
            "favorite_offers as f",
            "f.offer_id", "=", "offers.id"
        )
        ->isVisible($_isVisible)
        ->when($_id > 0, function($request) use ($_id)
        {
            $request->where("offers.id", $_id);
        })
        ->select(
            "offers.id", "offers.title", "offers.description",
            "u.id as userId", "u.username", "offers.is_donation",
            "latitude", "longitude",
            "city_name as cityName",
            DB::raw("IF(offers.created_at != offers.updated_at, 1, 0) as isUpdated"), 
            "offers.created_at as createdAt"
        );
    }
}
