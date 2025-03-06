<?php

namespace App\Library\Storage;

enum EStorageDeleteResponse: string
{
    case NoUrl = "NO_URL";
    case DiskDontExists = "DISK_DONT_EXIST";
    case Ok = "OK";
};