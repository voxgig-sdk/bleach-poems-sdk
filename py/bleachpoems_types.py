# Typed models for the BleachPoems SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Poem:
    line: list
    title: str
    volume: int


@dataclass
class PoemLoadMatch:
    id: int


@dataclass
class PoemListMatch:
    line: Optional[list] = None
    title: Optional[str] = None
    volume: Optional[int] = None

