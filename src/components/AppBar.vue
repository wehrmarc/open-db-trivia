<template>
  <header class="app-bar bg-slate-200 px-3 py-3 drop-shadow">
    <div class="container mx-auto flex items-center justify-between">
      <nav>
        <ul class="flex items-center">
          <li class="mr-6">
            <router-link
              to="/"
              class="text-sm font-semibold hover:text-gray-300"
            >
              Home
            </router-link>
          </li>
          <li class="mr-6">
            <router-link
              to="about/"
              class="text-sm font-semibold hover:text-gray-300"
            >
              About
            </router-link>
          </li>
          <li>
            <a href="#" class="text-sm font-semibold hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <a href="#" class="text-lg font-semibold">Open Trivia Database Quizz</a>
    </div>
  </header>
</template>
