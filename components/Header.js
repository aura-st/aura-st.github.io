import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
    return (
        <header className="sticky top-0 border-b z-10 bg-white px-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center h-12">
                <div className='w-6'></div>

                <div className="flex flex-row items-center justify-between lg:justify-start">
                    <a href="/" className="text-2xl font-bold text-sky-600 font-yomogi">
                        あうらのブログ
                    </a>
                </div>

                <nav>
                    <ul className="list-none"> 
                        <li>
                            <a href="https://twitter.com/auranti_st" className="py-1 text-sm">
                                <Image src='/twitter.svg' width={24} height={1} alt='twitter' />
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header >
    );
};

export default Header;