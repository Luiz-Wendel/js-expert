# from root directory

find . -name '*.test.js'
find . -name '*.test.js' -not -path '*node_modules**'
find . -name '*.js' -not -path '*node_modules**'

find . -name '*.js' -not -path '*node_modules**' | npx ipt

# from this directory
cp -r ../../01-testing/05-tdd .

CONTENT="'use strict';"
find . -name '*.js' -not -path '*node_modules**' \
| npx ipt -o \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}

# 1s => first line
# /^ => first column

# replace everything:
CONTENT="'use strict';"
find . -name '*.js' -not -path '*node_modules**' \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}