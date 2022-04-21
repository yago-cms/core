<?php

namespace Yago\Faq\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Yago\Faq\Models\Faq;

class FaqController extends Controller
{
    public function listing(Request $request, $config, $segment)
    {
        $faqs = Faq::all();

        return view('yago-faq::faqs.listing', compact('faqs'));
    }
}
