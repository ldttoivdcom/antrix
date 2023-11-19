PROJECT_NAME=$1
RELEASE_NAME=$2
RELEASE_FOLDER=$3
COMMIT_MESSAGE=$4

# update version
#cd ./projects/$PROJECT_NAME/
npm --no-git-tag-version version patch
node replace.version.js

# get version
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo $PACKAGE_VERSION

#cd ../../

# build
ng build $PROJECT_NAME

## RELEASE
cd ./$RELEASE_NAME

git pull
cd ..

# replace files
rm -rvf ./$RELEASE_NAME/$RELEASE_FOLDER/*
cp -rvf ./dist/$PROJECT_NAME/* ./$RELEASE_NAME/$RELEASE_FOLDER/

# commit
cd ./$RELEASE_NAME
git add -A
git commit -m "ui build ${RELEASE_FOLDER} ${PACKAGE_VERSION} ${COMMIT_MESSAGE}"
git push
cd ..
