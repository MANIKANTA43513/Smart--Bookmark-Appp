'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [user, setUser] = useState(null)
  const [bookmarks, setBookmarks] = useState([])
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')

  // 🔹 Check user on load
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      if (data.user) fetchBookmarks(data.user.id)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) fetchBookmarks(session.user.id)
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  // 🔹 Fetch bookmarks
  const fetchBookmarks = async (userId) => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (!error) setBookmarks(data || [])
  }

  // 🔹 Login
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  // 🔹 Logout
  const logout = async () => {
    await supabase.auth.signOut()
  }

  // 🔥 ADD Bookmark (Instant UI update)
  const addBookmark = async () => {
    if (!url || !title || !user) return

    const { data, error } = await supabase
      .from('bookmarks')
      .insert([{ url, title, user_id: user.id }])
      .select()

    if (error) {
      console.log(error)
      return
    }

    setBookmarks((prev) => [data[0], ...prev])
    setUrl('')
    setTitle('')
  }

  // 🔥 DELETE Bookmark (Instant UI remove)
  const deleteBookmark = async (id) => {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', id)

    if (error) {
      console.log(error)
      return
    }

    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }

  // 🔹 If not logged in
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button
          onClick={login}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition duration-200"
        >
          Login with Google
        </button>
      </div>
    )
  }

  return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-xl">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          My Bookmarks
        </h1>
        <button
          onClick={logout}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
        />

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
          className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addBookmark}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition duration-200"
        >
          Add
        </button>
      </div>

      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition mb-4"
        >
          <h2 className="font-semibold text-gray-800">
            {bookmark.title}
          </h2>

          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline hover:text-blue-800 transition"
          >
            {bookmark.url}
          </a>

          <br />

          <button
            onClick={() => deleteBookmark(bookmark.id)}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 hover:shadow-md active:scale-95  transition duration-200"
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  </div>
)
}
