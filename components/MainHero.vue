<template>
    <div class="flex flex-col justify-between items-center mt-14 mb-14 sm:mt-16 sm:mb-14 font-mono">
        <div class="max-w-4xl">
            <section class="flex flex-col text-xl sm:text-2xl text-white text-center mx-auto pr-12 pl-12">
                <div class="mb-8">
                    Welcome to <a href="/about-page" class="text-emerald-500">Quick-Snyk</a>, where securing your
                    open-source projects is as simple as entering a GitHub
                    URL.
                </div>
                <div class="mb-6">
                    Our tool scans for vulnerabilities using the Snyk CLI and shows you what needs attention—no fuss, no
                    installations. Ideal for anyone overseeing project security, whether you're a dev or a project
                    manager.
                </div>
                <div class="container mx-auto grid grid-row-2 md:grid-cols-2 gap-2 max-w-sm">
                    <a href="/signup"
                        class="flex flex-col font-mono text-base mx-auto mt-4 justify-center py-2 px-4 border border-transparent shadow-sm rounded-md text-gray-900 bg-emerald-500 sm:hover:scale-110 transition duration-150 ease-in sm:hover:bg-emerald-300">Sign
                        Up</a>
                    <a href="/about-page"
                        class="flex flex-col font-mono text-base mx-auto mt-4 justify-center py-2 px-4 border border-transparent shadow-sm rounded-md text-gray-900 bg-emerald-500 sm:hover:scale-110 transition duration-150 ease-in sm:hover:bg-emerald-300">More
                        Info</a>
                </div>
            </section>
        </div>
    </div>
</template>