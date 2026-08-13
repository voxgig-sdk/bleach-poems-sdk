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
              "active" => true,
              "name" => "lines",
              "req" => true,
              "type" => "`$ARRAY`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "title",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "volume",
              "req" => true,
              "type" => "`$INTEGER`",
              "index$" => 2,
            },
          ],
          "name" => "poem",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/poems",
                  "parts" => [
                    "poems",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.poems`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/random",
                  "parts" => [
                    "random",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.lines`",
                  },
                  "index$" => 1,
                },
              ],
              "key$" => "list",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "volume",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                    ],
                  },
                  "kind" => "http",
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
                  "index$" => 0,
                },
              ],
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
