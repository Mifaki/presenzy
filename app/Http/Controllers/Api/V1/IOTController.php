<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\File;

class IOTController extends Controller
{
    public function getUserById(Request $request)
    {
        $request->validate([
            'id' => 'required|string'
        ]);

        $uidResult = $request->id;
        File::put(public_path('UIDContainer.php'), '<?php $UIDresult=\'' . $uidResult . '\'; echo $UIDresult; ?>', false);

        $user = User::find($request->id);

        if (!$user) {
            return response()->json([
                'id' => $request->id,
                'name' => '--------',
                'gender' => '--------',
                'email' => '--------',
                'faculty' => '--------',
                'nim' => '--------',
                'timestamp' => '--------',
                'message' => 'Kartu tidak terdaftar, Absensi gagal'
            ], 404);
        }

        $userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'faculty' => $user->faculty,
            'gender' => $user->gender,
            'nim' => $user->nim,
            'timestamp' => now()->toDateTimeString(),
        ];

        return response()->json($userData);
    }
}
