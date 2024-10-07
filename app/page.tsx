import Image from "next/image";

import RequestForm from '@/components/ui/RequestForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RequestForm />
    </main>
  )
}
