<?php

namespace App\Library\GooglePlace;

interface IGooglePlaceService
{
    /**
     * Lister les endroits
     * 
     * @param string $_searchTerm localisation recherchée
     * 
     * @throws Exception
     * @return AutoCompleteResponse[]
     */
    public function AutoComplete(string $_searchTerm);

    /**
     * Recuperer la longitude et latitude d'un place id
     * 
     * @param string $_placeId place id conserné
     * 
     * @throws Exception
     * @return ?LocationResponse
     */
    public function Location(string $_placeId);
}