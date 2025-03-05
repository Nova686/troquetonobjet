<?php 
namespace App\Library;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class Results
{
    /**
     * Prduit un OK 200
     */
    public static function ok(mixed $_body)
    {
        return response()->json($_body);
    } 

    /**
     * Permet de telecharger un fichier
     * Produit un OK 200 ou un 404 not found
     * 
     * @param string $_chemin chemin du fichier
     * @param string $_nomDisque nom du disk (DEFAUT: "public") **SI pas de disk mettre "local"**
     */
    public static function file($_chemin, string $_nomDisque = "public")
    {
        if(empty($_chemin) || !Storage::disk($_nomDisque)->exists($_chemin))
            return self::NotFound();

        if($_nomDisque != "public")
            return Storage::download("$_chemin");

        return Storage::download("$_nomDisque/$_chemin");
    }

    /**
     * Produit un no content 204
     */
    public static function noContent()
    {
        return response(status: Response::HTTP_NO_CONTENT);
    }

    /**
     * Produit un Created 201
     */
    public static function created(array $_body)
    {
        return response()->json($_body, Response::HTTP_CREATED);
    }

    /**
     * Produit une badRequest 400
     */
    public static function badRequest(array $_body = [])
    {
        if(count($_body) > 0)
            return response()->json($_body, Response::HTTP_BAD_REQUEST);
        
        return response("", Response::HTTP_BAD_REQUEST);
    }

    /**
     * Produit une Forbidden 403  
     * Tu êtes authentifié mais pas autorisé à avoir acces à la ressource
     */
    public static function forbidden()
    {   
        return response("", Response::HTTP_FORBIDDEN);
    }

    /**
     * Produit un not found 404
     */
    public static function notFound(array $_body = [])
    {
        if(count($_body) > 0)
            return response()->json($_body, Response::HTTP_NOT_FOUND);

        return response("", Response::HTTP_NOT_FOUND);
    }
}

?>