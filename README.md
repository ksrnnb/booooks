# リブリーネット -本をシェアするSNS-
[![ksrnnb](https://circleci.com/gh/ksrnnb/librinet.svg?style=svg)](https://app.circleci.com/pipelines/github/ksrnnb)

## 概要
当アプリでは、本を検索して、本に関する投稿をしたり、自分の本棚に入れたりして共有することができます。
フォロー機能、いいね機能、コメント機能も備えており、コミュニケーションも可能です。
また、ユーザビリティ向上のためSPAを導入しており、快適にご利用いただけます。

## URL
https://librinet.jp/
トップページの「ゲストユーザーでログイン」を押すと、すぐにご利用いただけます。

## アプリ作成の動機
私は読書が好きなため、いろいろなジャンルの本を読んでいます。しかし、どうしても自分の好きなジャンルに偏りがちです。とくに未開拓のジャンルの場合は、何から手を出していけばいいのか迷うことが多々あります。
そこで、本が好きな人たちがどんな本を読んでいるのか、どういった本が良いのか、気軽に共有できるようなサービスが欲しい、といった目的で当アプリを作成いたしました。

## 作者
フロントエンド、バックエンド、インフラに至るまで、私一人で作成いたしました。

## 機能一覧
以下が、Webアプリの機能の一覧となります。特に力を入れた機能は、ユーザーのプロフィール画像のトリミング機能となります。クライアントサイドで画像をトリミングして、サーバーサイドでS3にアップロードするに至るまで、試行錯誤しながら実装いたしました。

### ユーザー機能
- ユーザー登録、編集、削除
- ユーザーの検索
- ユーザーページ
- プロフィール画像の投稿（トリミング機能つき→[Qiitaに投稿](https://qiita.com/ksrnnb/items/81d34faf4abc47ea4182)）

### 本に関する機能
- 外部APIの[openBD](https://openbd.jp/)を利用した検索機能（現在はISBNでのみ検索可能）
- 検索後、投稿 or 本棚に追加
- ユーザーページにて本棚の一覧表示
- 本棚から本の削除
- 本をジャンルでグループ化可能
- ジャンルの編集

### 投稿機能
- 本に関する投稿
- 投稿の削除
- 投稿に対するコメント
- 投稿に対するいいね機能（非同期）

### コメント機能
- 投稿に対してコメントが可能
- コメントに対するいいね機能（非同期）

### 通知機能
- 自身の投稿やコメントにいいね、フォローされた場合に通知
- 通知がある場合に、未読の件数を表示

<img src="https://i.imgur.com/soFP217.png" width="300">

### フォロー機能
- ユーザーのフォロー、フォロー解除（非同期）
- ユーザーページからフォロー、フォロワーの一覧表示へのリンク

### SPA
- react-router-domを用いてアプリケーションをSPA化（一部ページは待ち時間が生じます）
- SPA認証にはLaravel Sanctumを利用。

## 使用技術
### フロントエンド
- React 16.13.1
- TypeScript 4.0.5 (JavaScriptから移行中)
- Bootstrap 4.0
- Sass

### バックエンド
- Laravel 7.26.1

### データベース
- MySQL 8.0

### サーバー
- Nginx
- PHP-FPM

### インフラ・開発環境など
- Terraform
- AWS (ECS on EC2, RDS, S3)
- CircleCI
- Docker (Docker Compose)

### 静的コード解析、コード整形
- Prettier
- ESLint
- phpcs

### その他
- react-router-dom
- PHPUnit
- Laravel Dusk
- Laravel Sanctum

## インフラ構成
AWSで下記の環境をTerraformで構築しています。（作成した環境のGitHubは[こちら](https://github.com/ksrnnb/terraform-environment)になります）
- CircleCIのテストに合格すると、ECR/ECSに自動でデプロイ
- 2台のEC2インスタンスをマルチAZとなるように配置
- RDSはマルチAZ配置なし
- 画像データの保存はS3を使用
- セッションの保持はスティッキーセッションを利用
![](https://i.imgur.com/sbazFld.jpg)

## 現状の課題
現状、把握している課題は以下の通りです。他にも多々細かい修正点はありますが、随時更新していきます。
- ユーザーにとってISBNは利用しにくい（ISBN以外での本の検索手法の導入）
- メール送信機能がない（メールアドレスのベリファイ機能や、パスワード再設定のため）
- ユーザーページの修正（ユーザーの過去の投稿、いいねの一覧を表示）

## 今後の方針
当アプリをより良くするため、以下の項目を検討しています。
- 人気のある本の一覧（投稿数 or いいね総数の多い本の表示）
- 本を調べた際に、その本を本棚に入れている人の一覧を表示
- いいねした投稿のリスト化、リストから本が購入できるサイトへリンク。
- WebSocketによるリアルタイム更新