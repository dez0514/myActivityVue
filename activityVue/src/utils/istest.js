let [isTest, href] = [null, window.document.location.href];
if (
  href.indexOf("192.168") > -1 ||
  href.indexOf("localhost") > -1 ||
  href.indexOf("test") > -1
) {
  isTest = true;
} else {
  isTest = false;
}