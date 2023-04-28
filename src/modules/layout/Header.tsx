import Link from 'next/link';

const Header = () => {
    return (
        <header>
            <nav className="border-gray-200 bg-white px-4 py-2.5 dark:bg-gray-800 lg:px-6">
                <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center text-gray-900 dark:text-white"
                        >
                            <svg
                                className="mr-2 h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                            <span className="text-lg font-semibold tracking-tight">
                                React fun
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export { Header };
