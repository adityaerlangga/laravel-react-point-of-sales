import { Link } from '@inertiajs/react';
import React from 'react';

export default function Navbar(props) {
  return (
    <nav className="relative flex w-full flex-nowrap items-center justify-between bg-blue-800 py-2 text-white shadow-lg py-4">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <ul className="list-style-none mr-auto flex flex-row mx-auto gap-10" data-te-navbar-nav-ref="">
          <li className="mb-4 lg:mb-0 lg:pr-20" data-te-nav-item-ref=""><Link href={route("home")}>Home</Link></li>
          <li className="mb-4 lg:mb-0 lg:pr-20" data-te-nav-item-ref=""><Link href={route("products")}>Products</Link></li>
        </ul>
      </div>
    </nav>
  );
}