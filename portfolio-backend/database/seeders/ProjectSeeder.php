<?php

namespace Database\Seeders;

use App\Models\ProjectCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProjectCategory::insert([
            [
                'name' => 'React',
                'slug' => Str::slug('react')
               ],
               [
                'name' => 'Nextjs',
                'slug' => Str::slug('nextjs')
               ],
               [
                'name' => 'Laravel',
                'slug' => Str::slug('laravel')
               ],
        ]);
    }
}
