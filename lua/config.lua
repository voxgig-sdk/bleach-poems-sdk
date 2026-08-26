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
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lines",
            ["req"] = true,
            ["short"] = "The lines of the poem",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "title",
            ["req"] = true,
            ["short"] = "The title of the poem",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "volume",
            ["req"] = true,
            ["short"] = "The volume number of the Bleach manga",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "poem",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/poems",
                ["parts"] = {
                  "poems",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.poems`",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/random",
                ["parts"] = {
                  "random",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.lines`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = 1,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "volume",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/poems/{volume}",
                ["parts"] = {
                  "poems",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["volume"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
