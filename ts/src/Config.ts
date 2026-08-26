
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'BleachPoems',
        slug: "bleach-poems",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://bleach-poems.onrender.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      poem: {
      },

    }
  }


  entity = {
    "poem": {
      "fields": [
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "lines",
          "req": true,
          "short": "The lines of the poem",
          "type": "`$ARRAY`"
        },
        {
          "name": "title",
          "req": true,
          "short": "The title of the poem",
          "type": "`$STRING`"
        },
        {
          "name": "volume",
          "req": true,
          "short": "The volume number of the Bleach manga",
          "type": "`$INTEGER`"
        }
      ],
      "name": "poem",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/poems",
              "parts": [
                "poems"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.poems`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/random",
              "parts": [
                "random"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.lines`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": 1,
                    "kind": "param",
                    "name": "id",
                    "orig": "volume",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/poems/{volume}",
              "parts": [
                "poems",
                "{id}"
              ],
              "rename": {
                "param": {
                  "volume": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

