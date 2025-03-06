<?php

namespace App\Classes;

use App\Library\PaginationExport;

class Pagination
{
    /**
     * @return PaginationExport
     */
    public static function paginate($query, $data)
    {
        $total = $query->count();

        $list = $query->skip(($data["page"] - 1) * $data["nb_per_page"])
            ->take($data["nb_per_page"])
            ->get();

        return new PaginationExport(
            $list,
            $data["page"],
            $data["nb_per_page"],
            $total
        );
    }
}