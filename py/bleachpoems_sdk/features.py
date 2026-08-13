# BleachPoems SDK feature factory

from bleachpoems_sdk.feature.base_feature import BleachPoemsBaseFeature
from bleachpoems_sdk.feature.test_feature import BleachPoemsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: BleachPoemsBaseFeature(),
        "test": lambda: BleachPoemsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
