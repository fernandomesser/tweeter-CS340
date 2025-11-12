#!/usr/bin/env bash

BASE="https://n050wc6jz1.execute-api.us-west-2.amazonaws.com/dev"

echo "Testing /followee/list"
[ "$(curl -s -o /dev/null -w '%{http_code}' -X POST --data-binary @requestBodies/followeeRequest.json "$BASE/followee/list")" == "200" ] && echo "Success" || echo "Failed"

echo "Testing /follower/list"
[ "$(curl -s -o /dev/null -w '%{http_code}' -X POST --data-binary @requestBodies/followeeRequest.json "$BASE/follower/list")" == "200" ] && echo "Success" || echo "Failed"

echo "Testing /status/post"
[ "$(curl -s -o /dev/null -w '%{http_code}' -X POST --data-binary @requestBodies/postStatusRequest.json "$BASE/status/post")" == "200" ] && echo "Success" || echo "Failed"

echo "Testing /status/getFeedItems"
[ "$(curl -s -o /dev/null -w '%{http_code}' -X POST --data-binary @requestBodies/followeeRequest.json "$BASE/status/getFeedItems")" == "200" ] && echo "Success" || echo "Failed"

echo "Testing /status/getStoryItems"
[ "$(curl -s -o /dev/null -w '%{http_code}' -X POST --data-binary @requestBodies/followeeRequest.json "$BASE/status/getStoryItems")" == "200" ] && echo "Success" || echo "Failed"

echo "Testing /userAction/logout"
[ "$(curl -s -o /dev/null -w '%{http_code}' -X POST --data-binary @requestBodies/logoutRequest.json "$BASE/userAction/logout")" == "200" ] && echo "Success" || echo "Failed"

echo "Testing /userAction/login"
[ "$(curl -s -o /dev/null -w '%{http_code}' -X POST --data-binary @requestBodies/loginRequest.json "$BASE/userAction/login")" == "200" ] && echo "Success" || echo "Failed"

echo "Testing /userAction/register"
[ "$(curl -s -o /dev/null -w '%{http_code}' -X POST --data-binary @requestBodies/registerRequest.json "$BASE/userAction/register")" == "200" ] && echo "Success" || echo "Failed"

echo "Testing /userAction/getUser"
[ "$(curl -s -o /dev/null -w '%{http_code}' -X POST --data-binary @requestBodies/getUserRequest.json "$BASE/userAction/getUser")" == "200" ] && echo "Success" || echo "Failed"

echo "Testing /follower/getStatus"
[ "$(curl -s -o /dev/null -w '%{http_code}' -X POST --data-binary @requestBodies/isFollowerRequest.json "$BASE/follower/getStatus")" == "200" ] && echo "Success" || echo "Failed"

echo "Testing /userAction/follow"
[ "$(curl -s -o /dev/null -w '%{http_code}' -X POST --data-binary @requestBodies/followAndCountsRequest.json "$BASE/userAction/follow")" == "200" ] && echo "Success" || echo "Failed"

echo "Testing /userAction/unfollow"
[ "$(curl -s -o /dev/null -w '%{http_code}' -X POST --data-binary @requestBodies/followAndCountsRequest.json "$BASE/userAction/unfollow")" == "200" ] && echo "Success" || echo "Failed"

echo "Testing /follower/getCount"
[ "$(curl -s -o /dev/null -w '%{http_code}' -X POST --data-binary @requestBodies/followAndCountsRequest.json "$BASE/follower/getCount")" == "200" ] && echo "Success" || echo "Failed"

echo "Testing /followee/getCount"
[ "$(curl -s -o /dev/null -w '%{http_code}' -X POST --data-binary @requestBodies/followAndCountsRequest.json "$BASE/followee/getCount")" == "200" ] && echo "Success" || echo "Failed"
