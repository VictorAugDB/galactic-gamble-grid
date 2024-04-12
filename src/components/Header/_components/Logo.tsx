import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-2">
        <span className="text-2xl text-white">
          GALACTIC <span className="text-green-400">GD</span>
        </span>
        <img src="/images/money-bag.svg" alt="money-bag"></img>
      </div>
    </Link>
  )
}
