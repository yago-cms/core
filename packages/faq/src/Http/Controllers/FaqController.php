<?php

namespace Yago\Faq\Http\Controllers;

use Illuminate\Http\Request;
use Yago\Cms\Http\Controllers\Controller;
use Yago\Faq\Models\Faq;

class FaqController extends Controller
{
    public function listing(Request $request)
    {
        $faqs = Faq::all();

        return view('yago-faq::faqs.listing', compact('faqs'));
    }
}
