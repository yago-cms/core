<?php

namespace Yago\Article\View\Components;

use Yago\Cms\Helpers\ModuleHelper;
use Illuminate\Http\Request;
use Illuminate\View\Component;

class Carousel extends Component
{
    public $data;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        $request = app()->make(Request::class);

        $articles = $this->data;

        $pageRoute = '';

        if (config('page.currentPageId') > 0) {
            $pageRoute = ModuleHelper::getPageRoute(config('page.currentPageId'));
        }

        return view('yago-article::components.carousel', compact('articles', 'pageRoute'));
    }
}
