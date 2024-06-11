<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;

class WelcomeController extends Controller
{
    public function index(Request $request)
    {
        File::put(public_path('UIDContainer.php'), '<?php $UIDresult=\'' . '0' . '\'; echo $UIDresult; ?>', false);
        return Inertia::render('Welcome/Index');
    }
}
