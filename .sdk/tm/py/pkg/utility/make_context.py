# BleachPoems SDK utility: make_context

from projectname_sdk.core.context import BleachPoemsContext


def make_context_util(ctxmap, basectx):
    return BleachPoemsContext(ctxmap, basectx)
