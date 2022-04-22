<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOpeningHoursTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('opening_hours', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->time('open')->nullable();
            $table->time('close')->nullable();
            $table->boolean('is_closed')->default(false);
            $table->boolean('is_closed_for_lunch')->default(false);
            $table->time('lunch_close')->nullable();
            $table->time('lunch_open')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('opening_hours');
    }
}
