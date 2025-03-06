<?php

namespace App\Library\Storage;

use Illuminate\Support\Str;
use \Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class StorageService
{
    private ImageManager $manager;
    private array $extensionList = ["png", "jpg", "jpeg"];

    public function __construct() 
    {
        $this->manager = new ImageManager(new Driver());
    }

    /**
     * Sauvegarder et converti un fichier image en webp
     * 
     * @param ?UploadedFile $file fichier conserné
     * @param string $path chemin relatif a partir du "public" ou "app"
     * @param string $disk emplacement du fichier (valeurs possibles => "public" ou "local")
     * @return StorageResponse
     */
    public function upload(?UploadedFile $file, string $path, string $disk = "local")
    {
        if($file === null)
            return new StorageResponse("", EStorageResponse::FileNull);

        if($file->getSize() > 4_000_000)
            return new StorageResponse("", EStorageResponse::FileSizeExceeded);

        if(!in_array($file->extension(), $this->extensionList))
            return new StorageResponse("", EStorageResponse::ExtensionRefused);

        $nameGenerate = $path."/".Str::uuid().".webp";

        Storage::disk($disk)->makeDirectory($path);

        $image = $this->manager->read($file->get());

        if($disk == "public")
            $nameGenerate = "public/".$nameGenerate;

        $image->toWebp(60)->save(storage_path("app/".$nameGenerate));

        return new StorageResponse($nameGenerate, EStorageResponse::Ok);
    }

    /**
     * Supprimer un fichier dans le storage.  
     * Supprime le dossier si vide
     * 
     * @param array|string $path url ou liste url des fichiers à supprimer
     * 
     * @return EStorageDeleteResponse
     */
    public function delete(array | string $path)
    {
        if(empty($path))
            return EStorageDeleteResponse::NoUrl;

        $basePath = "";

        if(gettype($path) == "array")
        {
            $basePath = dirname($path[0]);

            foreach ($path as $element) 
                Storage::delete($element);
        }
        else
        {
            $basePath = dirname($path);
            Storage::delete($path);
        }

        if(count(Storage::files($basePath)) == 0)
            Storage::deleteDirectory($basePath);

        return EStorageDeleteResponse::Ok;
    }
}