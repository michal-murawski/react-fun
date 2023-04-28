const Hero = () => {
    return (
        <section className="m-4 flex items-center justify-center rounded-lg bg-red-50 shadow dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl py-8 px-4 text-center lg:py-16 lg:px-12">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    Fun with react
                </h1>
                <h4 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
                    Michał Murawski
                </h4>
                <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48"></p>
                <div className="mx-auto px-4 text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                    <div className="whitespace-nowrap  font-semibold text-blue-50">
                        <a href="mailto: michal_murawski@hotmail.com?subject=Hi Michal! Lovely website!">
                            michal_murawski@hotmail.com
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Hero };
