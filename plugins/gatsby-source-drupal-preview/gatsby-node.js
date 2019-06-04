"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const axios = require(`axios`);

const _ = require(`lodash`);

const _require = require(`gatsby-source-filesystem`),
      createRemoteFileNode = _require.createRemoteFileNode;

const _require2 = require(`url`),
      URL = _require2.URL;

const micro = require(`micro`);

const proxy = require("http-proxy-middleware");

const _require3 = require(`./normalize`),
      nodeFromData = _require3.nodeFromData;

exports.sourceNodes =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* ({
    actions,
    store,
    cache,
    createNodeId,
    createContentDigest
  }, {
    baseUrl,
    apiBase,
    basicAuth,
    filters,
    headers,
    params,
    preview,
    listenPort
  }) {
    const createNode = actions.createNode; // Default apiBase to `jsonapi`

    apiBase = apiBase || `jsonapi`; // Touch existing Drupal nodes so Gatsby doesn't garbage collect them.
    // _.values(store.getState().nodes)
    // .filter(n => n.internal.type.slice(0, 8) === `drupal__`)
    // .forEach(n => touchNode({ nodeId: n.id }))
    // Fetch articles.
    // console.time(`fetch Drupal data`)

    console.log(`Starting to fetch data from Drupal from ${baseUrl}/${apiBase}`); // TODO restore this
    // let lastFetched
    // if (
    // store.getState().status.plugins &&
    // store.getState().status.plugins[`gatsby-source-drupal`]
    // ) {
    // lastFetched = store.getState().status.plugins[`gatsby-source-drupal`].status
    // .lastFetched
    // }

    const data = yield axios.get(`${baseUrl}/${apiBase}`, {
      auth: basicAuth,
      headers,
      params
    });
    const allData = yield Promise.all(_.map(data.data.links,
    /*#__PURE__*/
    function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (url, type) {
        if (type === `self`) return;
        if (!url) return;
        if (!type) return;

        const getNext =
        /*#__PURE__*/
        function () {
          var _ref3 = (0, _asyncToGenerator2.default)(function* (url, data = []) {
            if (typeof url === `object`) {
              // url can be string or object containing href field
              url = url.href; // Apply any filters configured in gatsby-config.js. Filters
              // can be any valid JSON API filter query string.
              // See https://www.drupal.org/docs/8/modules/jsonapi/filtering

              if (typeof filters === `object`) {
                if (filters.hasOwnProperty(type)) {
                  url = url + `?${filters[type]}`;
                }
              }
            }

            let d;

            try {
              d = yield axios.get(url, {
                auth: basicAuth,
                headers,
                params
              });
            } catch (error) {
              if (error.response && error.response.status == 405) {
                // The endpoint doesn't support the GET method, so just skip it.
                return [];
              } else {
                console.error(`Failed to fetch ${url}`, error.message);
                console.log(error.data);
                throw error;
              }
            }

            data = data.concat(d.data.data);

            if (d.data.links.next) {
              data = yield getNext(d.data.links.next, data);
            }

            return data;
          });

          return function getNext(_x5) {
            return _ref3.apply(this, arguments);
          };
        }();

        const data = yield getNext(url);
        const result = {
          type,
          data // eslint-disable-next-line consistent-return

        };
        return result;
      });

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }())); // Make list of all IDs so we can check against that when creating
    // relationships.

    const ids = {};

    _.each(allData, contentType => {
      if (!contentType) return;

      _.each(contentType.data, datum => {
        ids[datum.id] = true;
      });
    }); // Create back references


    const backRefs = {};
    /**
     * Adds back reference to linked entity, so we can later
     * add node link.
     */

    const addBackRef = (linkedId, sourceDatum) => {
      if (ids[linkedId]) {
        if (!backRefs[linkedId]) {
          backRefs[linkedId] = [];
        }

        backRefs[linkedId].push({
          id: sourceDatum.id,
          type: sourceDatum.type
        });
      }
    };

    _.each(allData, contentType => {
      if (!contentType) return;

      _.each(contentType.data, datum => {
        if (datum.relationships) {
          _.each(datum.relationships, (v, k) => {
            if (!v.data) return;

            if (_.isArray(v.data)) {
              v.data.forEach(data => addBackRef(data.id, datum));
            } else {
              addBackRef(v.data.id, datum);
            }
          });
        }
      });
    }); // Process nodes


    const nodes = [];

    _.each(allData, contentType => {
      if (!contentType) return;

      _.each(contentType.data, datum => {
        const node = nodeFromData(datum, createNodeId);
        node.relationships = {}; // Add relationships

        if (datum.relationships) {
          _.each(datum.relationships, (v, k) => {
            if (!v.data) return;

            if (_.isArray(v.data) && v.data.length > 0) {
              // Create array of all ids that are in our index
              node.relationships[`${k}___NODE`] = _.compact(v.data.map(data => ids[data.id] ? createNodeId(data.id) : null));
            } else if (ids[v.data.id]) {
              node.relationships[`${k}___NODE`] = createNodeId(v.data.id);
            }
          });
        } // Add back reference relationships.
        // Back reference relationships will need to be arrays,
        // as we can't control how if node is referenced only once.


        if (backRefs[datum.id]) {
          backRefs[datum.id].forEach(ref => {
            if (!node.relationships[`${ref.type}___NODE`]) {
              node.relationships[`${ref.type}___NODE`] = [];
            }

            node.relationships[`${ref.type}___NODE`].push(createNodeId(ref.id));
          });
        }

        if (_.isEmpty(node.relationships)) {
          delete node.relationships;
        }

        node.internal.contentDigest = createContentDigest(node);
        nodes.push(node);
      });
    }); // Download all files.


    yield Promise.all(nodes.map(
    /*#__PURE__*/
    function () {
      var _ref4 = (0, _asyncToGenerator2.default)(function* (node) {
        let fileNode;

        if (node.internal.type === `files` || node.internal.type === `file__file`) {
          try {
            let fileUrl = node.url;

            if (typeof node.uri === `object`) {
              // Support JSON API 2.x file URI format https://www.drupal.org/node/2982209
              fileUrl = node.uri.url;
            } // Resolve w/ baseUrl if node.uri isn't absolute.


            const url = new URL(fileUrl, baseUrl); // If we have basicAuth credentials, add them to the request.

            const auth = typeof basicAuth === `object` ? {
              htaccess_user: basicAuth.username,
              htaccess_pass: basicAuth.password
            } : {};
            fileNode = yield createRemoteFileNode({
              url: url.href,
              store,
              cache,
              createNode,
              createNodeId,
              parentNodeId: node.id,
              auth
            });
          } catch (e) {// Ignore
          }

          if (fileNode) {
            node.localFile___NODE = fileNode.id;
          }
        }
      });

      return function (_x6) {
        return _ref4.apply(this, arguments);
      };
    }()));
    nodes.forEach(n => createNode(n)); // listen for changes to nodes for preview mode

    if (process.env.NODE_ENV === "development" && preview) {
      const server = micro(
      /*#__PURE__*/
      function () {
        var _ref5 = (0, _asyncToGenerator2.default)(function* (req, res) {
          const request = yield micro.json(req);
          const nodeToUpdate = JSON.parse(request).data; // handle relationships ?? maybe ??

          if (nodeToUpdate.relationships) {
            _.each(nodeToUpdate.relationships, (v, k) => {
              if (!v.data) return;

              if (_.isArray(v.data) && v.data.length > 0) {
                // Create array of all ids that are in our index
                node.relationships[`${k}___NODE`] = _.compact(v.data.map(data => ids[data.id] ? createNodeId(data.id) : null));
              } else if (ids[v.data.id]) {
                node.relationships[`${k}___NODE`] = createNodeId(v.data.id);
              }
            });
          }

          if (nodeToUpdate.id) {
            const node = nodeFromData(nodeToUpdate, createNodeId);
            node.internal.contentDigest = createContentDigest(node);
            createNode(node);
            console.log("\x1b[32m", `Updated node: ${node.id}`);
          }

          res.end("ok");
        });

        return function (_x7, _x8) {
          return _ref5.apply(this, arguments);
        };
      }());
      server.listen(8080, console.log("\x1b[32m", `listening to changes for live preview at route /___updatePreview`));
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.onCreateDevServer = ({
  app
}) => {
  app.use("/___updatePreview/", proxy({
    target: `http://localhost:8080`,
    secure: false,
    pathRewrite: {
      "/___updatePreview/": ""
    }
  }));
};