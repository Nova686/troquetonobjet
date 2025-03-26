<?php

namespace App\Library\Storage;

use App\Library\Storage\EStorageResponse;

class StorageResponse
{
    public string $url;
    public EStorageResponse $state;

    public function __construct(string $url, EStorageResponse $state) 
    {
        $this->url = $url;
        $this->state = $state;
    }
}