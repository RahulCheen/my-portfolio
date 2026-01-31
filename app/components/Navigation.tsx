import Link from 'next/link';

export default function Navigation() {
    return (
        <nav className="fixed w-full z-10 top-0 start-0 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Portfolio</span>
                </Link>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-slate-700 rounded-lg bg-slate-800 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
                        <li>
                            <Link href="/" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-500 md:p-0" aria-current="page">Home</Link>
                        </li>
                        <li className="relative group">
                            <Link href="/projects" className="block py-2 px-3 text-slate-300 rounded-sm hover:bg-slate-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 flex items-center justify-between w-full md:w-auto">
                                Projects
                                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </Link>
                            {/* Dropdown menu */}
                            <div className="absolute hidden font-normal bg-slate-800 divide-y divide-slate-700 rounded-lg shadow-xl w-72 group-hover:block top-full left-0 mt-0 border border-slate-700">
                                <ul className="py-2 text-sm text-slate-200">
                                    <li>
                                        <Link href="/projects/mnist-digit-classification" className="block px-4 py-2 hover:bg-slate-700 hover:text-white">MNIST Digit Classification</Link>
                                    </li>
                                    <li>
                                        <Link href="/projects/project-2" className="block px-4 py-2 hover:bg-slate-700 hover:text-white">Project 2</Link>
                                    </li>
                                    <li>
                                        <Link href="/projects/project-3" className="block px-4 py-2 hover:bg-slate-700 hover:text-white">Project 3</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
