import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
// import type { Post } from '~/models/post.server'
import { Post } from '~/utils'
import { getMySQLPost } from '~/models/post.server'
// import { marked } from 'marked'

type LoaderData = {
  post: Post | null
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'params.slug is required')
  
  const post = await getMySQLPost(params.slug)
  // invariant(post, `Post not found: ${params.slug}`)
  // console.log('got a post', post)

  // const html = marked(post.markdown)
  // const html = post.story
  // invariant(html, 'HTML not found')
  return post
}

export default function PostSlug() {
  const post: Post[] = useLoaderData()

  return post.map((x: any) => (
    <main className="max-w-4xl mx-auto">
      <h1 className="my-6 text-3xl text-center border-b-2">
        {x.headline}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: x.story }} />
    </main> 
  ))
}