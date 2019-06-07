start:
	npm start

test:
	npm test

watch:
	npm run watch

install:
	npm install

build-prd:
	npm ci --only=production

.PHONY: \
	start \
	test \
	watch \
	install
