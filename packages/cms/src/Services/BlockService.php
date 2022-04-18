<?php

namespace Yago\Cms\Services;

class BlockService
{
    private $modules = [];

    public function module($type, $method, $depth = 0, $override = false)
    {
        $this->modules[] = [
            'type' => $type,
            'method' => $method,
            'depth' => $depth,
            'override' => $override,
        ];
    }

    public function getModules()
    {
        return $this->modules;
    }
}
