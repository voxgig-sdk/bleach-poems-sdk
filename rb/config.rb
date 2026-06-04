# BleachPoems SDK configuration

module BleachPoemsConfig
  def self.make_config
    {
      "main" => {
        "name" => "BleachPoems",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://bleach-poems.onrender.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "poem" => {},
        },
      },
      "entity" => {
        "poem" => {
          "fields" => [
            {
              "name" => "line",
              "req" => true,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "title",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "volume",
              "req" => true,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 2,
            },
          ],
          "name" => "poem",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/poems",
                  "parts" => [
                    "poems",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
                {
                  "method" => "GET",
                  "orig" => "/random",
                  "parts" => [
                    "random",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 1,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "volume",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/poems/{volume}",
                  "parts" => [
                    "poems",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "volume" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    BleachPoemsFeatures.make_feature(name)
  end
end
