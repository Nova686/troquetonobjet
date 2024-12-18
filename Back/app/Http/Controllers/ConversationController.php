<?php

namespace App\Http\Controllers;

use App\Http\Resources\ConversationResource;
use App\Library\Results;
use App\Models\Conversation;
use App\Models\Offer;
use Illuminate\Support\Facades\Auth;

class ConversationController extends Controller
{
    public function getConversations()
    {
        $conversations = Conversation::query()
            ->isVisible()
            ->get();

        return response()->json([
            'conversations' => ConversationResource::collection($conversations)
        ]);
    }

    public function create(Offer $offer)
    {
        $conversation = new Conversation();
        $conversation->buyer()->associate(Auth::user()->id);
        $conversation->seller()->associate($offer->user_id);
        $conversation->offer()->associate($offer->id);
        $conversation->save();

        return response()->json([
            'conversation' => ConversationResource::make($conversation)
        ]);
    }

    public function hide(Conversation $conversation)
    {
        if ($conversation->buyer_id === Auth::user()->id) {
            $conversation->is_closed_buyer = true;
        } else {
            $conversation->is_closed_seller = true;
        }
        $conversation->save();

        return Results::noContent();
    }
}
