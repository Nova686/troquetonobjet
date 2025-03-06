<?php

namespace App\Library\Storage;

enum EStorageResponse: string
{
    case ExtensionRefused = "EXTENSION_REFUSED";
    case FileNull = "FILE_NULL";
    case FileSizeExceeded = "FILE_SIZE_EXCEEDED";
    case Ok = "OK";
};