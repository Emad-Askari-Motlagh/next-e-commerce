import { useRouter } from "next/router"
import React, { useEffect, usec } from "react"

export default function Mypages() {
  const router = useRouter()
  useEffect(() => {
    console.log(router.query.Mypages)
  }, [router.query.Mypages])

  function handleSend() {}
  return (
    <div>
      <button onClick={() => router.reload()}>next</button>
      {router.query.Mypages === "page2" && (
        <div>
          hej<button onClick={() => router.push("/pp/page3")}>to 3</button>
        </div>
      )}
      {router.query.Mypages === "page3" && <div>3</div>}
    </div>
  )
}
