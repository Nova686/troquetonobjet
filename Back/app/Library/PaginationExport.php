<?php

namespace App\Library;

class PaginationExport
{
    public array $list;
    public int $page;
    public int $nbPerPage;
    public int $total;
    public bool $hasNextPage;
    public int $totalPage;

    public function __construct(array $list, int $page, int $nbPerPage, int $total) 
    {
        $this->list = $list;
        $this->page = $page;
        $this->nbPerPage = $nbPerPage;
        $this->total = $total;
        $this->hasNextPage = $total > ($page * $nbPerPage);
        $this->totalPage = ceil($total / $nbPerPage);
    }
}