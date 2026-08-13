# BleachPoems SDK configuration


def make_config():
    return {
        "main": {
            "name": "BleachPoems",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "active": True,
            "name": "lines",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "title",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "volume",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 2,
          },
        ],
        "name": "poem",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/poems",
                "parts": [
                  "poems",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.poems`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/random",
                "parts": [
                  "random",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.lines`",
                },
                "index$": 1,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": 1,
                      "kind": "param",
                      "name": "id",
                      "orig": "volume",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/poems/{volume}",
                "parts": [
                  "poems",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "volume": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
