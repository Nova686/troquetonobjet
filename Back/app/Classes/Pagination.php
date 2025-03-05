<?php

namespace App\Classes;

use App\Library\PaginationExport;

class Pagination
{
    /**
     * @return PaginationExport
     */
    public static function paginate($query, int $page, int $nbPerPage)
    {
        $total = $query->count();

        $list = $query->skip(($page - 1) * $nbPerPage)
            ->take($nbPerPage)
            ->get()
            ->toArray();

        return new PaginationExport(
            $list,
            $page,
            $nbPerPage,
            $total
        );
    }
}