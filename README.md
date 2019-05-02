# Gatsby Preview Test Project

## Installation

run `yarn` in the root directory, also go to `/plugins/gatsby-source-drupal` and run `yarn build`
copy `sample.env` into `.env` and input your drupal url and optionally add basic auth credentials

## Development

run `yarn start` in the root directory

## Making It Work

The server running on port 8081 expects a 'POST' payload of the updated node data.
your request payload should look like this:

```json
{
  "type": "node--article",
  "id": "40aa4638-cb8d-473c-a74b-256807d52fbf",
  "links": {
    "self": {
      "href": "http://dev-test.pantheonsite.io/jsonapi/node/article/40aa4638-cb8d-473c-a74b-256807d52fbf"
    }
  },
  "attributes": {
    "drupal_internal__nid": 1,
    "drupal_internal__vid": 1,
    "langcode": "en",
    "revision_timestamp": "2019-03-07T18:21:19+00:00",
    "revision_log": null,
    "status": true,
    "title": "Give it a go and grow your own herbs",
    "created": "2019-03-07T18:21:19+00:00",
    "changed": "2019-03-07T18:21:19+00:00",
    "promote": true,
    "sticky": false,
    "default_langcode": true,
    "revision_translation_affected": true,
    "moderation_state": "published",
    "path": {
      "alias": "/articles/give-it-a-go-and-grow-your-own-herbs",
      "pid": 4,
      "langcode": "en"
    },
    "body": {
      "value": "<p>There's nothing like having your own supply of fresh herbs, readily available and close at hand to use while cooking. Whether you have a large garden or a small kitchen window sill, there's always enough room for something home grown.</p>\n<h2>Outdoors</h2>\n<h3>Mint</h3>\n<p>Mint is a great plant to grow as it's hardy and can grow in almost any soil. Mint can grow wild, so keep it contained in a pot or it might spread and take over your whole garden.</p>\n<h3>Sage</h3>\n<p>Like mint, sage is another prolific growing plant and will take over your garden if you let it. Highly aromatic, the sage plant can be planted in a pot or flower bed in well drained soil. The best way to store the herb is to sun dry the leaves and store in a cool, dark cupboard in a sealed container.</p>\n<h3>Rosemary</h3>\n<p>Rosemary plants grow into lovely shrubs. Easily grown from cuttings, rosemary plants do not like freezing temperatures so keep pots or planted bushes near the home to shelter them from the cold. It grows well in pots as it likes dry soil, but can survive well in the ground too. If pruning rosemary to encourage it into a better shape, save the branches and hang them upside down to preserve the flavor and use in food.</p>\n<h2>Indoors</h2>\n<h3>Basil</h3>\n<p>Perfect in sunny spot on a kitchen window sill. Basil is an annual plant, so will die off in the autumn, so it's a good idea to harvest it in the summer if you have an abundance and dry it. Picked basil stays fresh longer if it is placed in water (like fresh flowers). A great way to store basil is to make it into pesto!</p>\n<h3>Chives</h3>\n<p>A versatile herb, chives can grow well indoors. Ensure the plant is watered well, and gets plenty of light. Remember to regularly trim the chives. This prevents the flowers from developing and encourages new growth.</p>\n<h3>Coriander (Cilantro)</h3>\n<p>Coriander can grow indoors, but unlike the other herbs, it doesn't like full sun. If you have a south facing kitchen window, this isn't the place for it. Although not as thirsty as basil, coriander doesn't like dry soil so don't forget to water it! Cut coriander is best stored in the fridge.</p>\n",
      "format": "basic_html",
      "processed": "<p>There's nothing like having your own supply of fresh herbs, readily available and close at hand to use while cooking. Whether you have a large garden or a small kitchen window sill, there's always enough room for something home grown.</p>\n<h2>Outdoors</h2>\n<h3>Mint</h3>\n<p>Mint is a great plant to grow as it's hardy and can grow in almost any soil. Mint can grow wild, so keep it contained in a pot or it might spread and take over your whole garden.</p>\n<h3>Sage</h3>\n<p>Like mint, sage is another prolific growing plant and will take over your garden if you let it. Highly aromatic, the sage plant can be planted in a pot or flower bed in well drained soil. The best way to store the herb is to sun dry the leaves and store in a cool, dark cupboard in a sealed container.</p>\n<h3>Rosemary</h3>\n<p>Rosemary plants grow into lovely shrubs. Easily grown from cuttings, rosemary plants do not like freezing temperatures so keep pots or planted bushes near the home to shelter them from the cold. It grows well in pots as it likes dry soil, but can survive well in the ground too. If pruning rosemary to encourage it into a better shape, save the branches and hang them upside down to preserve the flavor and use in food.</p>\n<h2>Indoors</h2>\n<h3>Basil</h3>\n<p>Perfect in sunny spot on a kitchen window sill. Basil is an annual plant, so will die off in the autumn, so it's a good idea to harvest it in the summer if you have an abundance and dry it. Picked basil stays fresh longer if it is placed in water (like fresh flowers). A great way to store basil is to make it into pesto!</p>\n<h3>Chives</h3>\n<p>A versatile herb, chives can grow well indoors. Ensure the plant is watered well, and gets plenty of light. Remember to regularly trim the chives. This prevents the flowers from developing and encourages new growth.</p>\n<h3>Coriander (Cilantro)</h3>\n<p>Coriander can grow indoors, but unlike the other herbs, it doesn't like full sun. If you have a south facing kitchen window, this isn't the place for it. Although not as thirsty as basil, coriander doesn't like dry soil so don't forget to water it! Cut coriander is best stored in the fridge.</p>\n",
      "summary": null
    }
  },
  "relationships": {
    "node_type": {
      "data": {
        "type": "node_type--node_type",
        "id": "cde47620-62df-4fed-83ae-fdd1b319d852"
      },
      "links": {
        "self": {
          "href": "http://dev-test.pantheonsite.io/jsonapi/node/article/40aa4638-cb8d-473c-a74b-256807d52fbf/relationships/node_type"
        },
        "related": {
          "href": "http://dev-test.pantheonsite.io/jsonapi/node/article/40aa4638-cb8d-473c-a74b-256807d52fbf/node_type"
        }
      }
    },
    "revision_uid": {
      "data": {
        "type": "user--user",
        "id": "c3c1379e-f67c-48cf-ac33-328ae7830c04"
      },
      "links": {
        "self": {
          "href": "http://dev-test.pantheonsite.io/jsonapi/node/article/40aa4638-cb8d-473c-a74b-256807d52fbf/relationships/revision_uid"
        },
        "related": {
          "href": "http://dev-test.pantheonsite.io/jsonapi/node/article/40aa4638-cb8d-473c-a74b-256807d52fbf/revision_uid"
        }
      }
    },
    "uid": {
      "data": {
        "type": "user--user",
        "id": "c3c1379e-f67c-48cf-ac33-328ae7830c04"
      },
      "links": {
        "self": {
          "href": "http://dev-test.pantheonsite.io/jsonapi/node/article/40aa4638-cb8d-473c-a74b-256807d52fbf/relationships/uid"
        },
        "related": {
          "href": "http://dev-test.pantheonsite.io/jsonapi/node/article/40aa4638-cb8d-473c-a74b-256807d52fbf/uid"
        }
      }
    },
    "field_image": {
      "data": {
        "type": "file--file",
        "id": "929f59fa-e8f3-4095-b20f-b450eb32d918",
        "meta": {
          "alt": "Fresh cut herbs including mint, parsley, thyme and dill",
          "title": null,
          "width": 768,
          "height": 512
        }
      },
      "links": {
        "self": {
          "href": "http://dev-test.pantheonsite.io/jsonapi/node/article/40aa4638-cb8d-473c-a74b-256807d52fbf/relationships/field_image"
        },
        "related": {
          "href": "http://dev-test.pantheonsite.io/jsonapi/node/article/40aa4638-cb8d-473c-a74b-256807d52fbf/field_image"
        }
      }
    },
    "field_tags": {
      "data": [
        {
          "type": "taxonomy_term--tags",
          "id": "b74b85c9-33bd-48fa-8d14-f45830521141"
        },
        {
          "type": "taxonomy_term--tags",
          "id": "a3121948-0d42-4493-b11c-4cadf0d1baba"
        },
        {
          "type": "taxonomy_term--tags",
          "id": "f500b430-1f7e-43a4-9fac-b1467da657f1"
        }
      ],
      "links": {
        "self": {
          "href": "http://dev-test.pantheonsite.io/jsonapi/node/article/40aa4638-cb8d-473c-a74b-256807d52fbf/relationships/field_tags"
        },
        "related": {
          "href": "http://dev-test.pantheonsite.io/jsonapi/node/article/40aa4638-cb8d-473c-a74b-256807d52fbf/field_tags"
        }
      }
    }
  }
}
```
