import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [handle, setHandle] = useState('')
  const [count, setCount] = useState(null)
  const [loading, setLoading] = useState(false)

  async function checkCount(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('/api/count', { handle: handle.replace(/^@/, '') })
      setCount(res.data.count)
    } catch (err) {
      alert('Error: ' + (err?.response?.data?.error || err.message))
    }
    setLoading(false)
  }

  function shareTweet() {
    if (count === null) return
    const text = `I've said Gmonad ${count} times! #MonadVibes`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-monad-900 to-monad-800 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/5 rounded-2xl p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">MonadVibes</h1>
        <p className="text-sm text-white/70 mb-4">Check how many times you said Gmonad!</p>
        <form onSubmit={checkCount} className="flex gap-2 mb-4">
          <input className="flex-1 p-2 rounded bg-white/10 border border-white/20" placeholder="your_twitter_handle" value={handle} onChange={e => setHandle(e.target.value)} />
          <button className="px-3 py-2 bg-monad-500 rounded" disabled={loading}>{loading ? '...' : 'Check'}</button>
        </form>
        {count !== null && <div className="mb-3">You said <b>{count}</b> times.</div>}
        {count !== null && <button onClick={shareTweet} className="px-4 py-2 bg-blue-500 rounded">Share</button>}
      </div>
    </div>
  )
}