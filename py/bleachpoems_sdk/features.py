# BleachPoems SDK feature factory

from bleachpoems_sdk.feature.base_feature import BleachPoemsBaseFeature
from bleachpoems_sdk.feature.ratelimit_feature import BleachPoemsRatelimitFeature
from bleachpoems_sdk.feature.retry_feature import BleachPoemsRetryFeature
from bleachpoems_sdk.feature.test_feature import BleachPoemsTestFeature
from bleachpoems_sdk.feature.timeout_feature import BleachPoemsTimeoutFeature


_FEATURES = {
    "base": lambda: BleachPoemsBaseFeature(),
    "ratelimit": lambda: BleachPoemsRatelimitFeature(),
    "retry": lambda: BleachPoemsRetryFeature(),
    "test": lambda: BleachPoemsTestFeature(),
    "timeout": lambda: BleachPoemsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
