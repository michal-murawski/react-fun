const Hero = () => {
    return (
        <section className="m-4 flex h-screen items-center justify-center rounded-lg bg-red-50 shadow dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl py-8 px-4 text-center lg:py-16 lg:px-12">
                <a
                    href="#"
                    className="mb-7 inline-flex items-center justify-between rounded-full bg-gray-100 py-1 px-1 pr-4 pl-4 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                    role="alert"
                >
                    <span className="text-sm font-medium">
                        Some content will appear, I promise
                    </span>
                </a>
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    Simplemickey.com
                </h1>
                <h4 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
                    Michał Murawski
                </h4>
                <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
                    Trust and openness in every relationship matter. Being
                    helpful and spreading positive vibes is “my thing”! Constant
                    learner, rarely bored, and a funny dad, hopefully.
                </p>
                <div className="mx-auto px-4 text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                    <div className="whitespace-nowrap  font-semibold text-gray-400">
                        Senior Front-end Engineer [~7 yrs] | Gdańsk, Poland
                    </div>
                    <div className="whitespace-nowrap  font-semibold text-blue-50">
                        <a href="mailto: michal_murawski@hotmail.com?subject=Hi Michal! Lovely website!">
                            michal_murawski@hotmail.com{' '}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Hero };
