# dag-server
A simple express server for generating paths for a given DAG(Directed Acyclic Graph)


### Steps to run the server
1. clone the repository
2. Got to the repo directory in terminal `cd dag-server`
3. run `npm install` to add dependencies
4. run `node app.js` or `nodemon app.js`'

Sever by default runs on `port 5000` change the port in app.js file if port is not available on your machine.
> Note : To run with `dag-ui` , change the port in config.js of dag-ui API_BASE_URL also.


### APIs available

- *create*   :[POST] Create graph, currently only 1 graph is supported.
- *getgraph* :[GET] api to get the graph from server
- *getpaths* :[GET] api to get paths, a start node is required to be passed to get all the pahs from that node. 
- *addnode*  :[POST] for adding nodes to existing graph
 

### Details
Graph data is stored in a database.json file, which can be updated/edited using the dag-ui or POSTMAN
> a sample graph data is already added to database.json
