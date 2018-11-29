.PHONY: test

test:
	python3 scripts/test_seed.py
	python3 scripts/test_resource_factory.py
