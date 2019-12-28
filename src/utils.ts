const dns = require("dns");

const isOnline = () => {
  return new Promise(resolve => {
    dns.lookup("www.gnome.org", (error: boolean) => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

const isOldNode = () => {
  // anything older than v4 is considered old
  let currentMajorNodeVersion = parseInt(process.versions.node.split(".")[0]);
  let acceptableMajorVersion = 6;
  return currentMajorNodeVersion < acceptableMajorVersion;
};

const ansiColors = {
  reset: "\x1b[0m",
  hicolor: "\x1b[1m",
  underline: "\x1b[4m",
  inverse: "\x1b[7m",
  // foreground colors
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  // background colors
  bg_black: "\x1b[40m",
  bg_red: "\x1b[41m",
  bg_green: "\x1b[42m",
  bg_yellow: "\x1b[43m",
  bg_blue: "\x1b[44m",
  bg_magenta: "\x1b[45m",
  bg_cyan: "\x1b[46m",
  bg_white: "\x1b[47m"
};

export { isOnline, isOldNode, ansiColors };
