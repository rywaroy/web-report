export default {
  getTimes: function (opts) {
    var performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;

    if (performance === undefined) {
      return false;
    }

    var timing = performance.timing;
    var api = {};
    opts = opts || {};

    if (timing) {
      if (opts && !opts.simple) {
        for (var k in timing) {
          if (isNumeric(timing[k])) {
            api[k] = parseFloat(timing[k]);
          }
        }
      }
      if (api.firstPaint === undefined) {
        var firstPaint = 0;

        // Chrome
        if (window.chrome && window.chrome.loadTimes) {
          // Convert to ms
          firstPaint = window.chrome.loadTimes().firstPaintTime * 1000;
          api.firstPaintTime = firstPaint - timing.navigationStart;
        }
        // IE
        else if (typeof timing.msFirstPaint === 'number') {
          firstPaint = timing.msFirstPaint;
          api.firstPaintTime = firstPaint - timing.navigationStart;
        }
        // Firefox
        if (opts && !opts.simple) {
          api.firstPaint = firstPaint;
        }
      }

      // Total time from start to load
      api.loadTime = timing.loadEventEnd - timing.fetchStart;
      // Time spent constructing the DOM tree
      api.domReadyTime = timing.domComplete - timing.domInteractive;
      // Time consumed preparing the new page
      api.readyStart = timing.fetchStart - timing.navigationStart;
      // Time spent during redirection
      api.redirectTime = timing.redirectEnd - timing.redirectStart;
      // AppCache
      api.appcacheTime = timing.domainLookupStart - timing.fetchStart;
      // Time spent unloading documents
      api.unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
      // DNS query time
      api.lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;
      // TCP connection time
      api.connectTime = timing.connectEnd - timing.connectStart;
      // Time spent during the request
      api.requestTime = timing.responseEnd - timing.requestStart;
      // Request to completion of the DOM loading
      api.initDomTreeTime = timing.domInteractive - timing.responseEnd;
      // Load event time
      api.loadEventTime = timing.loadEventEnd - timing.loadEventStart;
      // Script loading time
      api.scriptLoadTime = timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart;
      // Page full load time
      api.pageFullLoadTime = api.redirectTime + api.lookupDomainTime + api.connectTime + api.requestTime + api.initDomTreeTime + api.domReadyTime;
    }

    return api;
  },
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}