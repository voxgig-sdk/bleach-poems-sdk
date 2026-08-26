# BleachPoems SDK configuration

module BleachPoemsConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "BleachPoems",
        "slug" => "bleach-poems",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "lines",
              "req" => true,
              "short" => "The lines of the poem",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "title",
              "req" => true,
              "short" => "The title of the poem",
              "type" => "`$STRING`",
            },
            {
              "name" => "volume",
              "req" => true,
              "short" => "The volume number of the Bleach manga",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "poem",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
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
                },
                {
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
                },
              ],
            },
            "load" => {
              "input" => "data",
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
                },
              ],
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
