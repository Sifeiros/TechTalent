First test:
===========

    curl -i -H "Accept: application/json" -X GET http://localhost:1512/
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

    curl -i -H "Accept: application/json" -X GET http://localhost:1512/persons
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

    curl -i -H "Accept: application/json" -X GET http://localhost:1512/persons/search?skills=JavaScript
or

    curl -i -H "Accept: application/json" -X GET http://localhost:1512/persons/search?skills=JavaScript\&infer=false
Result:

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 369
    ETag: W/"171-AFZeOo7QTpmJBmC+DxMRJg"
    Date: Thu, 15 Dec 2016 14:03:19 GMT
    Connection: keep-alive
    
    [{"displayName":"Thomas Maqua","id":"tm","skills":[{"name":"React","inferred":false,"level":5,"affinity":5},{"name":"Redux","inferred":false,"level":3,"affinity":5},{"name":"Angular","inferred":false,"level":4,"affinity":3},{"name":"JavaScript","inferred":false,"level":4,"affinity":4}],"currentProject":{"customer":"Magic Bank","name":"Fancypants","pl":"?","tl":"?"}}]


Find all people with inferred skills:
=====================================

    curl -i -H "Accept: application/json" -X GET http://localhost:1512/persons/search?skills=JavaScript\&infer=true
Result:

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 718
    ETag: W/"2ce-BMaC7jdJLN0CBIjSCIqXtg"
    Date: Thu, 15 Dec 2016 14:03:41 GMT
    Connection: keep-alive
    
    [{"displayName":"Alasdair Collinson","id":"ac","skills":[{"name":"Java","inferred":false,"level":5,"affinity":4},{"name":"Wicket","inferred":false,"level":4,"affinity":1},{"name":"Node.JS","inferred":false,"level":2,"affinity":3},{"name":"JavaScript","inferred":true}],"currentProject":{"customer":"Mock Bank","name":"Homeless","pl":"cw","tl":"ds"}},{"displayName":"Thomas Maqua","id":"tm","skills":[{"name":"React","inferred":false,"level":5,"affinity":5},{"name":"Redux","inferred":false,"level":3,"affinity":5},{"name":"Angular","inferred":false,"level":4,"affinity":3},{"name":"JavaScript","inferred":false,"level":4,"affinity":4}],"currentProject":{"customer":"Magic Bank","name":"Fancypants","pl":"?","tl":"?"}}]

Find existing person with the id "ac":
======================================

    curl -i -H "Accept: application/json" -X GET http://localhost:1512/persons/ac
Result:

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 348
    ETag: W/"15c-xOOxtxfckitNVlV41JycKA"
    Date: Thu, 15 Dec 2016 14:29:37 GMT
    Connection: keep-alive

    {"displayName":"Alasdair Collinson","id":"ac","skills":[{"name":"Java","inferred":false,"level":5,"affinity":4},{"name":"Wicket","inferred":false,"level":4,"affinity":1},{"name":"Node.JS","inferred":false,"level":2,"affinity":3},{"name":"JavaScript","inferred":true}],"currentProject":{"customer":"Mock Bank","name":"Homeless","pl":"cw","tl":"ds"}}

Find non-existing person with the id "bd":
==========================================

    curl -i -H "Accept: application/json" -X GET http://localhost:1512/persons/bd
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

Modifying the level of and affinity to a skill
==============================================

    curl -i -H "Content-Type: application/json" -X POST -d '{"name":"Java","inferred":false,"level":5,"affinity":3}' http://localhost:5000/persons/ac
Result:

    HTTP/1.1 201 Created
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: text/plain; charset=utf-8
    Content-Length: 7
    ETag: W/"7-Ds7rRYYflYXdepej42+Fxg"
    Date: Thu, 15 Dec 2016 21:24:34 GMT
    Connection: keep-alive

Get a list of all skills
========================
    curl -i -H "Accept: application/json" -X GET https://techtalent.herokuapp.com/skills
Result:

    HTTP/1.1 200 OK
    Server: Cowboy
    Connection: keep-alive
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: text/html; charset=utf-8
    Content-Length: 66
    Etag: W/"42-z/Rw/Yjqy6Jb35WPHKt7Cw"
    Date: Thu, 15 Dec 2016 15:12:45 GMT
    Via: 1.1 vegur

    ["Java","Wicket","Node.JS","JavaScript","React","Angular","Redux"]

Stats about those skills
========================
    curl -i -H "Accept: application/json" -X GET http://localhost:5000/skills/stats
Results:

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 1452
    ETag: W/"5ac-GaefzLRO+QMuQs/Avr+qHQ"
    Date: Thu, 15 Dec 2016 20:17:03 GMT
    Connection: keep-alive

    [{"skill":"React","values":[{"id":"tm","values":{"level":"4","affinity":"5"}},{"id":"ce","values":{"level":5,"affinity":5}},{"id":"ds","values":{"level":2,"affinity":1}}]},{"skill":"Redux","values":[{"id":"tm","values":{"level":"2","affinity":"4"}},{"id":"ce","values":{"level":5,"affinity":5}}]},{"skill":"Wicket","values":[{"id":"ac","values":{"level":4,"affinity":1}},{"id":"mb","values":{"level":5,"affinity":1}},{"id":"ds","values":{"level":4,"affinity":1}}]},{"skill":"Elixir","values":[{"id":"ds","values":{"level":3,"affinity":5}}]},{"skill":"Node.JS","values":[{"id":"ac","values":{"level":2,"affinity":3}},{"id":"mb","values":{"level":3,"affinity":3}},{"id":"ag","values":{"level":4,"affinity":4}}]},{"skill":"JavaScript","values":[{"id":"tm","values":{"level":"5","affinity":"5"}},{"id":"ce","values":{"level":5,"affinity":4}},{"id":"ag","values":{"level":5,"affinity":5}},{"id":"wf","values":{"level":5,"affinity":5}}]},{"skill":"Java","values":[{"id":"ac","values":{"level":5,"affinity":4}},{"id":"tm","values":{"level":"3","affinity":"3"}},{"id":"mb","values":{"level":5,"affinity":4}},{"id":"ds","values":{"level":5,"affinity":3}},{"id":"wf","values":{"level":5,"affinity":3}}]},{"skill":"Html","values":[{"id":"ac","values":{"level":4,"affinity":3}},{"id":"tm","values":{"level":4,"affinity":4}},{"id":"mb","values":{"level":4,"affinity":2}},{"id":"ce","values":{"level":5,"affinity":3}},{"id":"ag","values":{"level":5,"affinity":4}}]}]