"use strict";

const micro = require(`micro`);

const {
  nodeFromData
} = require(`./normalize`);

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest
}, {
  customNodeFromData,
  listenPort
}) => {
  const {
    createNode
  } = actions; // allow users to define their own data normalization

  const createNodeFromData = customNodeFromData || nodeFromData; // listen for changes to nodes for preview mode

  if (process.env.NODE_ENV === "development") {
    const port = listenPort || 8080;
    const server = micro(async (req, res) => {
      const request = await micro.json(req);
      console.log(request.data);
      const nodeToUpdate = request;

      if (nodeToUpdate.id) {
        const node = createNodeFromData(nodeToUpdate, createNodeId);
        node.internal.contentDigest = createContentDigest(node);
        createNode(node);
        console.log("\x1b[32m", `Updated node: ${node.id}`);
      }

      res.end("ok");
    });
    server.listen(port, console.log("\x1b[32m", `listening to changes for live preview on port: ${port}`));
  }
};