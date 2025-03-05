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

    public function __construct(array $liste, int $page, int $nbPerPage, int $total) 
    {
        $this->liste = $liste;
        $this->page = $page;
        $this->nbPerPage = $nbPerPage;
        $this->total = $total;
        $this->hasNextPage = $total > ($page * $nbPerPage);
        $this->totalPage = ceil($total / $nbPerPage);
    }
}