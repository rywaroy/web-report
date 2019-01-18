export default function getBrowseType() {
  const Sys = {};
  const ua = navigator.userAgent.toLowerCase();
  const re =/(msie|firefox|chrome|opera|version).*?([\d.]+)/;
  const m = ua.match(re);
  Sys.browser = m[1].replace(/version/, "'safari");
  Sys.ver = m[2];
  return Sys;
}