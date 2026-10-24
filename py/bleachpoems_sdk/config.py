# BleachPoems SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "BleachPoems",
            "slug": "bleach-poems",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://bleach-poems.onrender.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "poem": {},
            },
        },
        "entity": {
      "poem": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "lines",
            "title": "Lines",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The lines of the poem",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "req": True,
            "short": "The title of the poem",
          },
          {
            "name": "volume",
            "title": "Volume",
            "type": "`$INTEGER`",
            "req": True,
            "short": "The volume number of the Bleach manga",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "poem",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/poems",
                "segments": [
                  {
                    "lit": "poems",
                  },
                ],
                "parts": [
                  "poems",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.poems`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/random",
                "segments": [
                  {
                    "lit": "random",
                  },
                ],
                "parts": [
                  "random",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.lines`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/poems/{volume}",
                "segments": [
                  {
                    "lit": "poems",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "poems",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "volume": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "volume",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 1,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
