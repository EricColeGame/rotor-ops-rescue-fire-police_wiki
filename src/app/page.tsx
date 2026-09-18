import Link from "next/link";

export default function RootPage() {
  return (
    <main>
      <meta httpEquiv="refresh" content="0;url=/en" />
      <p>
        Redirecting to <Link href="/en">Rotor Ops Rescue Fire Police Wiki</Link>…
      </p>
    </main>
  );
}
