<?php

namespace App\Library\GooglePlace;

class LocationResponse implements \JsonSerializable
{
    public string $longitude;
    public string $latitude;

    public function __construct($_longitude, $_latitude)
    {
        $this->longitude = $_longitude;
        $this->latitude = $_latitude;
    }

    public function jsonSerialize(): mixed
    {
        return get_object_vars($this);
    }
}