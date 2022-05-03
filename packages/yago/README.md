<p align="center">
    <img src="https://user-images.githubusercontent.com/1246744/154675392-9102309f-d430-467c-86ea-7a418a7568bb.svg" width="25%">
</p>


# YAGO Content

YAGO Content is a CMS.

## Installing YAGO Content

```bash
composer create-project --prefer-dist yago-cms/yago myproject
```

## Configure YAGO Content
Go to project directory

```bash
cd myproject
```

Edit `.env` and update the following variables:

```bash
DB_DATABASE=myproject
DB_USERNAME=myproject
DB_PASSWORD=myproject
```

Start the docker envirmonment

```bash
./vendor/bin/sail up -d
```

Clear env cache

```bash
./vendor/bin/sail artisan cache:clear
```

Create first migration and seed database

```bash
./vendor/bin/sail artisan migrate
./vendor/bin/sail artisan db:seed --class=CmsSeeder
```

Create storage link

```bash
./vendor/bin/sail artisan storage:link
```

## Add a superuser

```bash
./vendor/bin/sail artisan tinker
```

```php
$user = \App\Models\User::factory()->create([
    'name' => 'John Doe',
    'email' => 'john@doe.se',
    'password' => bcrypt('johnspassword'),
]);
$user->assignRole('writer', 'superadmin');
```

## Develop

Install any Node dependencies

```bash
npm i
```

Build frontend JS & CSS

```bash
npm mix watch
```