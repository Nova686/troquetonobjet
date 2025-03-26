<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserUpdateRequest;
use App\Library\Results;
use App\Library\Storage\StorageService;
use App\Models\Offer;
use App\Models\OfferImage;
use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct(private StorageService $storageServ) { }

    public function update(UserUpdateRequest $request)
    {
        $data = $request->validated();

        $nb = User::where("id", Auth::user()->id)->update($data);

        return $nb > 0 ? Results::noContent() : Results::notFound();
    }

    public function delete()
    {
        $userId = Auth::user()->id;

        $urlFileList = OfferImage::query()
            ->join(
                "offer as o",
                "o.id", "=", "offer_images.offer_id"
            )
            ->pluck("url")
            ->toArray();

        $this->storageServ->delete($urlFileList, "public");

        User::where("id", $userId)->delete();
    }
}
