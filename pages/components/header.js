import { CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function BillPayHeader() {
return (
<header className="bg-black text-white p-4 shadow-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<CreditCard className="w-8 h-8 text-white" />
<h1 className="text-3xl font-extrabold tracking-wide"> <Link href="/login"> Maanas&apos; Embedded Payment Platform </Link></h1>
</div>

</div>
</header>
);
}