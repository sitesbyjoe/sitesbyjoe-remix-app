import { prisma } from '~/db.server'
// import type { Post } from "@prisma/client";
import { makeSlug, Post } from '~/utils';
import mysql from 'mysql'
// export type { Post }

const mysqlUser = {
  host: 'databasebyjoe.cy1agy9ddxth.us-east-1.rds.amazonaws.com',
  user: 'sitesbyjoe',
  password: '$homeslice1',
  database: 'sitesbyjoe'
}

// export async function getPosts() {
//   console.log('prisma post', prisma?.post)
//   return prisma.post.findMany()
// }

// export async function getPost(slug: string) {
//   return prisma.post.findUnique({
//     where: { slug }
//   })
// }

// export async function createPost(post: Post ) {
//   return prisma.post.create({ data: post });
// }

export async function getMySQLPosts(): Promise<Post[]> {
    return new Promise((resolve) => {

    const connection = mysql.createConnection(mysqlUser);
  
    connection.query('SELECT * FROM posts ORDER BY datestamp DESC', (error, result) => {
      if (error) {
        console.log(error);
        resolve(null);
      } else {
        resolve(result);
      }
    });
  })
}

export async function getMySQLPost(slug: string): Promise<Post | null> {
  return new Promise((resolve) => {

  const connection = mysql.createConnection(mysqlUser);

  connection.query(`SELECT * FROM posts WHERE slug = '${slug}'`, (error, result) => {
    if (error) {
      console.log(error);
      resolve(null);
    } else {
      console.log('result???', result)
      resolve(result);
    }
  });
})
}