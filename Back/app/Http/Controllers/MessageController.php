<?php

namespace App\Http\Controllers;

use App\Http\Requests\Messages\MessageRequest;
use App\Http\Resources\MessageResource;
use App\Library\Results;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function get(Conversation $conversation, Request $request)
    {
        $this->authorize('view', $conversation);

        $validated = $request->validate([
            'before_id' => ['nullable', 'int'],
            'after_id' => ['nullable', 'int']
        ]);

        $messageLimit = 50;
        $query = Message::query()
            ->with(['sender'])
            ->where('conversation_id', $conversation->id);
        
        if (isset($validated['before_id'])) {
            $query->forPageBeforeId($messageLimit, $validated['before_id']);
        } else if (isset($validated['after_id'])) {
            $query->forPageAfterId($messageLimit, $validated['after_id']);
        } else {
            $query->limit($messageLimit);
        }
        $messages = $query->get();

        return Results::ok([
            'messages' => MessageResource::collection($messages)
        ]);
    }

    public function store(Conversation $conversation, MessageRequest $request)
    {
        $this->authorize('view', $conversation);

        $validated = $request->validated();

        $message = new Message();
        $message->content = $validated['content'];
        $message->ip_address = $request->ip();
        $message->sender()->associate(Auth::user()->id);
        $message->conversation()->associate($conversation);
        $message->save();

        return Results::ok([
            'message' => MessageResource::make($message)
        ]);
    }

    public function update(Message $message, MessageRequest $request)
    {
        $this->authorize('update', $message);

        $validated = $request->validated();

        $message->update($validated);
        $message->save();

        return Results::ok([
            'message' => MessageResource::make($message)
        ]);
    }

    public function destroy(int $idMessage)
    {
        $isDeleted = Message::query()
            ->where('id', $idMessage)
            ->where('sender_id', Auth::user()->id)
            ->delete();

        return $isDeleted ? Results::noContent() : Results::notFound();
    }
}
