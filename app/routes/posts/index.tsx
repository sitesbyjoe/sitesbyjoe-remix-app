import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getPosts, getMySQLPosts } from '~/models/post.server'

export const loader = async () => {
  return json(await getMySQLPosts())
}

  // return json<LoaderData>({
  //   posts: await getPosts()s
  // })
// }

export default function Posts() {

  function makeSlug(str: string) {
    return str.toLowerCase().replace(/[\W_]+/g, '-')
  }

  const result = useLoaderData();
  // console.log('client result!', result.length + ' rows')
  // result.map((x: any) => {
  //   console.log('record', x)
  // })
  // result && result[0] && result.foreach((x: any) => {
  //   console.log(x)
  // })
  
  return  (
    <main>
      <h1>Posts</h1>
      <ul>
        { result.map((post: any) => {
            return (
              <li key={post.id}>
                <Link to={`${makeSlug(post.headline)}`}>{post.headline}</Link>
              </li>
            )
          })
        }
      </ul>

      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
    </main>
  )
}