import Link from 'next/link';
import { ActiveLink } from '@/components/ActiveLinks';

const linkClasses =
    'hover:text-primary-700 block border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white border-0 p-0 hover:bg-transparent dark:hover:bg-transparent dark:hover:text-white';

const Header = () => {
    return (
        <header>
            <nav className="border-gray-200 bg-white py-2.5 px-6 dark:bg-gray-800">
                <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
                    <div className="flex items-center space-x-5">
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
                        </Link>
                        <ul className="mt-0 flex flex-row space-x-5 font-medium">
                            <li>
                                <ActiveLink
                                    href="/"
                                    className={linkClasses}
                                    activeClassName="text-white"
                                    aria-current="page"
                                >
                                    Home
                                </ActiveLink>
                            </li>
                            <li>
                                <ActiveLink
                                    href="/autocomplete"
                                    className={linkClasses}
                                    activeClassName="text-white"
                                >
                                    Autocomplete
                                </ActiveLink>
                            </li>
                            <li>
                                <ActiveLink
                                    href="/answers"
                                    className={linkClasses}
                                    activeClassName="text-white"
                                >
                                    Answers
                                </ActiveLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export { Header };
