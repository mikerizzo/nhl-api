# NHL API

This application is a demonstration of using NodeJS to
create an API by screen scraping nhl.com. It caches the
json payloads with redis (set to 2 min).

## Install Dependencies

    npm install

## Run

    node server.js

Alternatively, start with foreman:

    foreman start

## API

Grab the team stats for the current season:

    http://localhost:8001/oilers

Specify a season:

    http://localhost:8001/senators/20052006

Add playoffs to the URI to retrieve playoff statistics:

	http://localhost:8001/canucks/20102011/playoffs

Asking for a team that doesn't exist, a season that doesn't exist,
or playoff statistics for a year in which there are none, will
return a 404:

	http://localhost:8001/mapleleafs/20102011/playoffs

## License

Copyright 2011 Brock Whitten
All rights reserved.

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

