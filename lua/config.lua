-- BleachPoems SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "BleachPoems",
      slug = "bleach-poems",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://bleach-poems.onrender.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["poem"] = {},
      },
    },
    entity = {
      ["poem"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lines",
            ["title"] = "Lines",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "The lines of the poem",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The title of the poem",
          },
          {
            ["name"] = "volume",
            ["title"] = "Volume",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["short"] = "The volume number of the Bleach manga",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "poem",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/poems",
                ["segments"] = {
                  {
                    ["lit"] = "poems",
                  },
                },
                ["parts"] = {
                  "poems",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.poems`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/random",
                ["segments"] = {
                  {
                    ["lit"] = "random",
                  },
                },
                ["parts"] = {
                  "random",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.lines`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/poems/{volume}",
                ["segments"] = {
                  {
                    ["lit"] = "poems",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "poems",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["volume"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "volume",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = 1,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
