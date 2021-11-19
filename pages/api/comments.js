// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {GraphQLClient,gql} from "graphql-request"
const graphqlAPI=process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
const graphCmsToken=process.env.NEXT_PUBLIC_GRAPH_TOKEN
export default async function comments(req, res) {
  console.log("token",graphCmsToken)
  const graphQLClient=new GraphQLClient(graphqlAPI,{
    headers:{
      authorization:`Bearer ${graphCmsToken}`
    }
  })
  const query=gql`
    mutation CreateComment($name:String!,$email:String!,$comment:String!,$slug:String!){
    createComment(data:{name:$name,email:$email,comment:$comment,post:{connect:{slug:$slug}}}){id}
    }
  `
  try{
    const result = await graphQLClient.request(query,req.body)
    return res.status(200).send(result)

  }catch(err){
    console.log(err)
    return res.status(500).send(err)
  }

}
