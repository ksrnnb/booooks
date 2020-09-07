<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function post() {
        return $this->belongsTo('App\Post');
    }

    public function likes() {
        return $this->hasMany('App\Like');
    }

    public function book() {
        return $this->belongsTo('App\Book', 'book_id', 'id');
    }

    public function user() {
        return $this->belongsTo('App\User');
    }
}
