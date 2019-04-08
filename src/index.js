import timing from './timing';
import ajax from './ajax';
import browseType from './browseType';

export default function webReport(opts) {

  // 合并配置项
  const option = Object.assign({
    isErrorReport: true,
    isPerformanceReport: true,
    pv: 0,
    errorReportUrl: 'http://localhost:7001/errors',
    performanceReportUrl: 'http://localhost:7001/performance'
  }, opts);
  
  // 性能监控
  if (option.isPerformanceReport) {
    const {
      lookupDomainTime, // DNS 耗时
      connectTime, // TCP链接耗时
      requestTime, // request请求耗时
      domReadyTime, // 解析dom耗时
      readyStart, // 准备新页面所花费的时间
      scriptLoadTime, // 脚本加载时间
      pageFullLoadTime, // 页面完全加载时间
    } = timing.getTimes();

    // const data = timing.getTimes();
    const sys = browseType();

    ajax(option.performanceReportUrl, {
      lookupDomainTime,
      connectTime,
      requestTime,
      domReadyTime,
      readyStart,
      scriptLoadTime,
      pageFullLoadTime,
      project: option.project,
      browser: sys.browser,
      version: sys.ver,
    });
  }

  let flag = '';

  // 错误监控
  if (option.isErrorReport) {
    window.onerror = (msg, url, line, col, error) => {
      // 异步
      setTimeout(() => {
        // 过滤连续发送的报错
        if (flag === `${line}${col}`) {
          return;
        }

        flag = `${line}${col}`;
        if (Math.random() * 100 > option.pv) {
          const sys = browseType();
          ajax(option.errorReportUrl, {
            project: option.project,
            msg,
            url,
            line,
            col,
            browser: sys.browser,
            version: sys.ver,
          });
        }
      }, 0);

    }
  }
}
