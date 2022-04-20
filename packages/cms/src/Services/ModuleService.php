<?php

namespace Yago\Cms\Services;

class ModuleService
{
    private $modules = [];

    public function register($name)
    {
        $this->modules[] = [
            'name' => $name,
        ];
    }

    public function getModules()
    {
        return $this->modules;
    }
}
