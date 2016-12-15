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

See how many people in the company have those skills
====================================================
    curl -i -H "Accept: application/json" -X GET http://localhost:5000/skills/stats
Result:

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 210
    ETag: W/"d2-KWbuAquyGOlIBVH2qz2fHw"
    Date: Thu, 15 Dec 2016 19:10:20 GMT
    Connection: keep-alive

    [{"skill":"React","people":1},{"skill":"Redux","people":1},{"skill":"Wicket","people":1},{"skill":"Node.JS","people":1},{"skill":"JavaScript","people":1},{"skill":"Java","people":2},{"skill":"Html","people":2}]