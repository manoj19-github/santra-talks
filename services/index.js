import {request,gql} from "graphql-request"
const graphqlAPI=process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

//  get all post
export const getPosts=async()=>{
  const query=gql`
  query MyQuery {
    postsConnection {
      edges {
        node {
          excerpt
          id
          slug
          title
          createdBy {
            createdAt
            name
          }
          author{
            id
            bio
            name
            photo {
              url
            }
          }
          categories {
            name
            id
            slug
          }
          featuredImage {
            url
          }
        }
      }
    }
  }

  `
  const result = await request(graphqlAPI,query)
  return result.postsConnection.edges

}

//  recent post
export const getRecentPost=async()=>{
    const query=gql`
      query GetPostDetails(){
        posts(orderBy:createdAt_ASC
        last:3
      ){
        title
        featuredImage{
          url
        }
        createdAt
        slug
      }
    }
  `
  const result=await request(graphqlAPI,query)
  return result.posts

}

//   get Categories post
export const getCategoriesPost=async(categories)=>{
  const query =gql`
    query GetCategoriesPost($categories:String!){
      posts(  where: {categories_some: {slug: $categories}}){
        excerpt
        id
        slug
        title
        createdBy {
          createdAt
          name
        }
        author{
          id
          bio
          name
          photo {
            url
          }
        }
        categories {
          name
          id
        }
        featuredImage {
          url
        }
      }
    }
  `
  const result=await request(graphqlAPI,query,{categories})
  return result.posts
}
// similar post
export const getSimilarPosts=async(categories,slug)=>{
  const query = gql`
  query GetPostDetails($slug: String!, $categories: [String!]) {
    posts(
      where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
      last: 3
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
`;
    const result=await request(graphqlAPI,query,{categories,slug})
    return result.posts

}

// category data

export const getCategories=async()=>{
  const query=gql`
    query GetCategories{
      categories{
        name
        slug
      }
    }
  `
  const result=await request(graphqlAPI,query)
  return result.categories

}

// post details data
export const getPostDetails=async(slug)=>{
  const query=gql`
  query GetPostDetails($slug:String!) {
    post(where:{slug:$slug}){

      author{
        id
        bio
        name
        photo {
          url
        }
      }
    createdAt
    slug
    title
    excerpt
    featuredImage{
      url
    }
    categories{
      name
      slug
    }
    content{
      raw
    }
  }
}


  `
  const result = await request(graphqlAPI,query,{slug})
  return result.post
}


//  save comment
export const submitComment=async(obj)=>{
  try{
    const result=await fetch(`/api/comments`,{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(obj)
    })
    return result.json()
  }catch(err){
    return false
  }

}

//  show comments

export const getComments=async(slug)=>{
  const query=gql`
    query GetComments($slug:String!){
      comments(where:{post:{slug:$slug}}){
        name
        createdAt
        comment
      }
    }
  `
  const result = await request(graphqlAPI,query,{slug})
  return result.comments
}




export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};




export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
      next:posts(
        first: 1
        orderBy: createdAt_ASC
        where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous:posts(
        first: 1
        orderBy: createdAt_DESC
        where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
    const result = await request(graphqlAPI, query, { slug, createdAt });

    return { next: result.next[0], previous: result.previous[0] };
}
