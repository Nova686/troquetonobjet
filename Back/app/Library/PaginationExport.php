<?php

namespace App\Library;

class PaginationExport
{
    public array $liste;
    public int $page;
    public int $nbPerPage;
    public int $total;
    public bool $hasNextPage;
    public int $totalPage;

    public function __construct(array $_liste, int $_page, int $_nbPerPage, int $_total) 
    {
        $this->liste = $_liste;
        $this->page = $_page;
        $this->nbPerPage = $_nbPerPage;
        $this->total = $_total;
        $this->hasNextPage = $_total > ($_page * $_nbPerPage);
        $this->totalPage = ceil($_total / $_nbPerPage);
    }
}