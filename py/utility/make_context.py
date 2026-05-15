# BleachPoems SDK utility: make_context

from core.context import BleachPoemsContext


def make_context_util(ctxmap, basectx):
    return BleachPoemsContext(ctxmap, basectx)
