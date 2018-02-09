var RollingSpider = require("rolling-spider");
var rollingSpider = new RollingSpider({
    uuid: 'Mambo_612477'
});

rollingSpider.connect(function() {
   rollingSpider.setup(function() {
      rollingSpider.startPing();
   });
});

