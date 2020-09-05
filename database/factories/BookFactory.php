<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Book;
use Faker\Generator as Faker;

//  GitHub実践入門
$factory->define(Book::class, function (Faker $faker) {
 
    $book = Book::fetch_book('9784774163666');
    
    return [
        'isbn' => $book->isbn,          //  GitHub実践入門
        'title' => $book->title,
        'author' => $book->author,
        'cover' => $book->cover,
        'genre_id' => 1,                //  1: IT (GenreSeederで作成する)
        'isRead' => 1,                  //  読んだ
        'isWanted' => 0,                //  欲しくない（既に読んだ）
        'isRecommended' => 1,           //  おすすめしたい
    ];
});

//  はじめてのPHP
$factory->state(Book::class, 'php', function($faker) {
    $book = Book::fetch_book('9784873117935');
    return [
        'isbn' => $book->isbn,
        'title' => $book->title,
        'author' => $book->author,
        'cover' => $book->cover,
    ];
});

//  リーダブルコード
$factory->state(Book::class, 'readouble', function($faker) {
    $book = Book::fetch_book('9784873115658');
    return [
        'isbn' => $book->isbn,
        'title' => $book->title,
        'author' => $book->author,
        'cover' => $book->cover,
    ];
});
