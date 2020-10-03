<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Book;

class BookController extends Controller
{
    public function search(BookRequest $request)
    {
        // $request->validated();
        // TODO: Validate独自に？

        $isbn = $request->input('isbn');
        $book = Book::fetchBook($isbn);

        if ($book == null) {
            return response('Cannot Search', 404);
        }

        $user = Auth::user();
        $isInBookshelf = $user->hasBook($isbn);

        // falseはcompact関数に使えない
        $params = [
            'book' => $book,
            'isInBookshelf' => $isInBookshelf,
        ];

        return response()->json($params);
    }
}