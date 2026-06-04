-- ProjectName SDK configuration

local function make_config()
  return {
    main = {
      name = "BleachPoems",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["name"] = "line",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["active"] = true,
            ["index$"] = 0,
          },
          {
            ["name"] = "title",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 1,
          },
          {
            ["name"] = "volume",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["active"] = true,
            ["index$"] = 2,
          },
        },
        ["name"] = "poem",
        ["op"] = {
          ["list"] = {
            ["name"] = "list",
            ["points"] = {
              {
                ["method"] = "GET",
                ["orig"] = "/poems",
                ["parts"] = {
                  "poems",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["args"] = {},
                ["select"] = {},
                ["index$"] = 0,
              },
              {
                ["method"] = "GET",
                ["orig"] = "/random",
                ["parts"] = {
                  "random",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["args"] = {},
                ["select"] = {},
                ["index$"] = 1,
              },
            },
            ["input"] = "data",
            ["key$"] = "list",
          },
          ["load"] = {
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
                      ["active"] = true,
                    },
                  },
                },
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
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "load",
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
