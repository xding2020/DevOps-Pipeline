#!/bin/sh

set -xe

SCRIPT_DIR=/src/www/script
WORKING_DIR=/src/www/fuzzer

max=2
for i in `seq 1 $max`
do
    cd $SCRIPT_DIR
    java -jar ./TestFuzzer.jar
    cd $WORKING_DIR
    git add \. && git commit -m "fuzzing" && git push
    sleep 5
    http_code=`curl -s -o /dev/null -w %{http_code} http://localhost:8080/job/iTrust-Fuzzer/build\?delay=0sec`
    # echo "i = $i, http code = $http_code"
    if [ "$http_code" = "201" ]
    then
        sleep 180
    fi
    git revert HEAD --no-edit && git push
done

python ./detector.py
cp $SCRIPT_DIR/fuzzer.log $SCRIPT_DIR/report.txt

