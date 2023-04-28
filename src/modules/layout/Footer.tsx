import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="m-4 rounded-lg bg-white shadow dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-0">
                        <li>
                            <Link
                                href="/"
                                className="mr-4 hover:underline md:mr-6 "
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/autocomplete"
                                className="mr-4 hover:underline md:mr-6 "
                            >
                                Autocomplete
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/answers"
                                className="mr-4 hover:underline md:mr-6 "
                            >
                                Answers
                            </Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
            </div>
        </footer>
    );
};

export { Footer };
