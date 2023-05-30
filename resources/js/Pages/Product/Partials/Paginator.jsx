import { Link } from "@inertiajs/react";

export default function Paginator({links, meta}) { 
  return (
      <div class="flex justify-center items-center space-x-4 mt-4">
        {links.prev && <Link href={links.prev} class="border rounded-md bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm">{"<"}</Link>}
        <div class="text-slate-500">{meta.current_page + "/" + meta.last_page}</div>
        {links.next && <Link href={links.next} class="border rounded-md bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm">{">"}</Link>}
      </div>
  );
}