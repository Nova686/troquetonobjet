<?php

namespace App\Http\Controllers;

use App\Http\Resources\ConversationResource;
use App\Library\Results;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\Offer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ConversationController extends Controller
{
    public function getConversations()
    {
        $conversations = Conversation::query()
            ->with(['buyer', 'seller'])
            ->select('conversations.*', 'm.content as message_content', 'm.created_at as message_created_at')
            ->leftJoin((new Message())->getTable() . ' as m', function ($q) {
                $q->on('m.conversation_id', '=', 'conversations.id')
                    ->where('m.id', '=', DB::raw('(select max(id) from messages where messages.conversation_id = conversations.id)'));
            })
            ->isVisible()
            ->get();

        return Results::ok([
            'conversations' => ConversationResource::collection($conversations)
        ]);
    }

    public function create(Offer $offer)
    {
        $this->authorize('createConversation', $offer);

        $conversation = new Conversation();
        $conversation->buyer()->associate(Auth::user()->id);
        $conversation->seller()->associate($offer->user_id);
        $conversation->offer()->associate($offer->id);
        $conversation->save();

        return Results::ok([
            'conversation' => ConversationResource::make($conversation)
        ]);
    }

    public function hide(Conversation $conversation)
    {
        $this->authorize('view', $conversation);

        if ($conversation->buyer_id === Auth::user()->id) {
            $conversation->is_closed_buyer = true;
        } else {
            $conversation->is_closed_seller = true;
        }
        $conversation->save();

        return Results::noContent();
    }
}
