# Poem entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from bleachpoems_sdk import BleachPoemsSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestPoemEntity:

    def test_should_create_instance(self):
        testsdk = BleachPoemsSDK.test(None, None)
        ent = testsdk.Poem(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _poem_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "poem." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set BLEACHPOEMS_TEST_POEM_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        poem_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.poem")))
        poem_ref01_data = None
        if len(poem_ref01_data_raw) > 0:
            poem_ref01_data = helpers.to_map(poem_ref01_data_raw[0][1])

        # LIST
        poem_ref01_ent = client.Poem(None)
        poem_ref01_match = {}

        poem_ref01_list_result = poem_ref01_ent.list(poem_ref01_match, None)
        assert isinstance(poem_ref01_list_result, list)

        # LOAD
        poem_ref01_match_dt0 = {}
        poem_ref01_data_dt0_loaded = poem_ref01_ent.load(poem_ref01_match_dt0, None)
        assert poem_ref01_data_dt0_loaded is not None



def _poem_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/poem/PoemTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = BleachPoemsSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["poem01", "poem02", "poem03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "BLEACHPOEMS_TEST_POEM_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "BLEACHPOEMS_TEST_POEM_ENTID": idmap,
        "BLEACHPOEMS_TEST_LIVE": "FALSE",
        "BLEACHPOEMS_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("BLEACHPOEMS_TEST_POEM_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("BLEACHPOEMS_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
            },
            extra or {},
        ])
        client = BleachPoemsSDK(helpers.to_map(merged_opts))

    _live = env.get("BLEACHPOEMS_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("BLEACHPOEMS_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
