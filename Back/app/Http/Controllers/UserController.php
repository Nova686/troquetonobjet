<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\ReportResource;
use App\Library\Results;
use App\Library\Storage\StorageService;
use App\Models\Offer;
use App\Models\OfferImage;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Models\Report;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(private StorageService $storageServ) { }

    public function update(UserUpdateRequest $request)
    {
        $data = $request->validated();

        $nb = User::where("id", Auth::user()->id)->update($data);

        return $nb ? Results::noContent() : Results::notFound();
    }

    public function delete()
    {
        $userId = Auth::id();

        Offer::where("user_id", $userId)->delete();

        $urlFileList = OfferImage::query()
            ->join(
                "offers as o",
                "o.id", "=", "offer_images.offer_id"
            )
            ->where("user_id", $userId)
            ->pluck("url")
            ->toArray();

        $this->storageServ->delete($urlFileList, "public");

        $nb = User::where("user_id", $userId)->update([
            "username" => "Anonyme",
            "email" => "Anonyme",
            "password" => "",
            "phone" => null,
			"avatar" => null,
            "is_admin" => false,
            "deleted_at" => Carbon::now()
        ]);

        return $nb ? Results::noContent() : Results::notFound();
    }

    public function getAllUsers(Request $request)
    {
        $reports = Report::query()
        ->with("offer.user")
        ->get();

        return response()->json([
            "reports" => ReportResource::collection($reports),
        ]);
    }
}
