
# graphqldemo
GitHub GraphQL API Demo: Explore GraphQL's power in interacting with GitHub. Auth, repo queries, user profiles, issue management, and real-time updates.

**Explanation**
Packages used in this project

 - Express - For making and handling the server in easiest way
 - Body Parser - parse the request
 - express-graphql - for work with express it provides GUI for performing our actions like query mutation and subscription
 - GraphQL - for build the schema
 - Typescript - for typed and good code
 - jsonwebtoken - for granting the tokens
 - ts-node - to run typescript with node
 - mongoose - as an ORM for using mongodb in express project

First of all I created the express server and applied some middlewares and connected with mongodb, I started the server when our mongodb has been connected correctly.
I used express-graphql package's function graphqlHTTP for initialize the graphql project, and pass it as middleware on route /graphql.
I kept all files in graphql folder, all resolvers and schema seprate, for better approach. I initialize schema and resolvers in graphqlHTTP fucnction.
I used authMiddleware for check authorization, we can't use middlewares for each route like REST APIs in graphQL, so I didn't break it on unauthorized functionality, I just passed isAuth as true or false in request. so that those resolvers need to be authorized they can check with isAuth parameter.
There are three queries

 - users - is open to everyone
 - profile - only authorized persons
 - login - only for authentic person

There is only one mutation

 - register

I have made different schemas for Models and input models.

I didn't use any hasing for securing the password like bcrypt and crypto e.t.c, that is just a functionality as we generally use with REST APIs.

and all the functionality is basically same as we work with REST APIs, everything is logic based what we use generally.

