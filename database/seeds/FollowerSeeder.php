<?php

use Illuminate\Database\Seeder;

class FollowerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //  リフレッシュしてからシーディングする前提で、作成したusersのレコード数を取得。
        $count = App\User::count();
        
        //  全員相互フォローにしておく。
        for ($follow_id = 1; $follow_id <= $count; $follow_id++) {
            for ($follower_id = 1; $follower_id <= $count; $follower_id++) {
                if ($follow_id != $follower_id) {
                    App\Follower::create([
                        'follow_id' => $follow_id,
                        'follower_id' => $follower_id,
                    ]);
                }
            }
        }
    }
}