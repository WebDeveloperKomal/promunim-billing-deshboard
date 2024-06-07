const hostScript = document.createElement("script");
hostScript.onload = (function (document) {
  if (
    document.cookie
      .match("(^|;)\\s*" + "access_token" + "\\s*=\\s*([^;]+)")
      ?.pop() ||
    ""
  ) {
    window.location.href = "/app/dashboard";
  }
})(document);