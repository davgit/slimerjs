
describe("WebPage", function(){
    var webpage;
    var url = "http://127.0.0.1:8083/getHeaders";

    beforeEach(function() {
        if (webpage) {
            return;
        }
        webpage = require("webpage").create();
    });
    it("can set headers",function() {
        var loaded = false;

        webpage.customHeaders = {
            "X-foo": "bar",
        }

        webpage.settings.userAgent = "Super Browser / 1.0"
        // load the page that will returns received headers
        runs(function() {
            webpage.open(url, function(success){
                loaded = true;
            });
        });

        waitsFor(function(){ return loaded;}, 1000);

        runs(function(){
            var content = JSON.parse(webpage.plainText)
            expect(content.headers['User-Agent']).toEqual("Super Browser / 1.0");
            expect(content.headers['X-foo']).toEqual("bar");
            expect(content.body).toEqual('');
            webpage.close();
        });
    });
});

