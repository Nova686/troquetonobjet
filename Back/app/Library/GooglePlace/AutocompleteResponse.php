<?php

namespace App\Library\GooglePlace;

class AutoCompleteResponse implements \JsonSerializable
{
    private string $name;
    private string $placeId;

    public function __construct($_name, $_placeId)
    {
        $this->name = $_name;
        $this->placeId = $_placeId;
    }

    public function jsonSerialize(): mixed
    {
        return get_object_vars($this);
    }
}