setup:
	( \
		python3 -m venv .venv; \
		. .venv/bin/activate; \
		pip install -r requirements.txt; \
	)


clean:
	( \
		rm -rf .venv; \
		rm -rf __pycache__; \
		rm -rf *.egg-info; \
		rm -rf .pytest_cache; \
		rm -rf .coverage; \
		rm -rf coverage.xml; \
		rm -rf htmlcov; \
	)


freeze:
	( \
		. .venv/bin/activate; \
		pip freeze > requirements.txt; \
	)

	