# ProjectName SDK exists test

import pytest
from bleachpoems_sdk import BleachPoemsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = BleachPoemsSDK.test(None, None)
        assert testsdk is not None
