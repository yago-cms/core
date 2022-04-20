<?php

namespace Yago\Cms\Helpers;

use Illuminate\Support\Facades\File;
use Yago\Cms\Models\Page;
use Yago\Cms\Services\ModuleService;

class ModuleHelper
{
    public static function getPageRoute($pageId)
    {
        $page = Page::find($pageId);

        return $page->route;
    }

    public static function getScripts()
    {
        $moduleService = app()->make(ModuleService::class);
        $modules = $moduleService->getModules();
        $scripts = [];

        foreach ($modules as $module) {
            ['name' => $name] = $module;

            if (app()->environment('production')) {
                $filename = 'main.min.js';
            } else {
                $filename = 'main.js';
            }

            $path = public_path("vendor/{$name}/js/{$filename}");

            if (!File::exists($path)) {
                throw new \Exception("Script bundle for module \"{$name}\" not found at \"{$path}\".");
            }

            $scripts[] = '<script src="' . str_replace(public_path(), '', $path) . '"></script>';
        }

        return implode("\n", $scripts);
    }
}
