First test:
===========

    curl -i -H "Accept: application/json" -X GET -d '{"parameter": "param"}' http://localhost:1512/
Result:

    HTTP/1.1 501 Not Implemented
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 29
    ETag: W/"1d-bqoUPWHeCwN3Rj7dquOUSQ"
    Date: Thu, 15 Dec 2016 13:06:43 GMT
    Connection: keep-alive
    
    {"message":"not implemented"

Find all people:
================

    curl -i -H "Accept: application/json" -X GET -d '{"parameter": "param"}' http://localhost:1512/persons
Result:

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 668
    ETag: W/"29c-TCu5R6SwpjMUHTlvqujqFg"
    Date: Thu, 15 Dec 2016 13:06:27 GMT
    Connection: keep-alive

    {"persons":[{"displayName":"Alasdair Collinson","id":"ac","skills":[{"name":"Java","inferred":false,"level":5,"affinity":4},{"name":"Wicket","inferred":false,"level":4,"affinity":1},{"name":"Node.JS","inferred":false,"level":2,"affinity":3},{"name":"JavaScript","inferred":true}],"currentProject":{"customer":"Mock Bank","name":"Homeless","pl":"cw","tl":"ds"}},{"displayName":"Thomas Maqua","id":"tm","skills":[{"name":"React","inferred":false,"level":5,"affinity":5},{"name":"Redux","inferred":false,"level":3,"affinity":5},{"name":"Angular","inferred":false,"level":4,"affinity":3}],"currentProject":{"customer":"Magic Bank","name":"Fancypants","pl":"?","tl":"?"}}]}

Find all people with certain skills:
====================================

    curl -i -H "Accept: application/json" -X GET -d '{"parameter": "param"}' http://localhost:1512/persons/search?skills=Java
Result:

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 350
    ETag: W/"15e-5Hk94CfDBTyIQIaB1qgTlA"
    Date: Thu, 15 Dec 2016 13:06:09 GMT
    Connection: keep-alive

    [{"displayName":"Alasdair Collinson","id":"ac","skills":[{"name":"Java","inferred":false,"level":5,"affinity":4},{"name":"Wicket","inferred":false,"level":4,"affinity":1},{"name":"Node.JS","inferred":false,"level":2,"affinity":3},{"name":"JavaScript","inferred":true}],"currentProject":{"customer":"Mock Bank","name":"Homeless","pl":"cw","tl":"ds"}}]

Find existing person with the id "ac":
======================================

    curl -i -H "Accept: application/json" -X GET -d '{"parameter": "param"}' http://localhost:1512/persons/ac
Result:

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 350
    ETag: W/"15e-5Hk94CfDBTyIQIaB1qgTlA"
    Date: Thu, 15 Dec 2016 13:05:51 GMT
    Connection: keep-alive

    [{"displayName":"Alasdair Collinson","id":"ac","skills":[{"name":"Java","inferred":false,"level":5,"affinity":4},{"name":"Wicket","inferred":false,"level":4,"affinity":1},{"name":"Node.JS","inferred":false,"level":2,"affinity":3},{"name":"JavaScript","inferred":true}],"currentProject":{"customer":"Mock Bank","name":"Homeless","pl":"cw","tl":"ds"}}]

Find non-existing person with the id "bd":
==========================================

    curl -i -H "Accept: application/json" -X GET -d '{"parameter": "param"}' http://localhost:1512/persons/bd
Result:

    HTTP/1.1 404 Not Found
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 43
    ETag: W/"2b-bKhY0qnLgHCSbbi7w7y69g"
    Date: Thu, 15 Dec 2016 12:44:54 GMT
    Connection: keep-alive

    {"error":"No person with id \"bd\" found."}