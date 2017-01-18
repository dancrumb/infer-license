const BSD = /[Rr]edistribution\s*and\s*use\s*in\s*source\s*and\s*binary\s*forms,\s*with\s*or\s*without\s*modification,\s*are\s*permitted\s*provided\s*that\s*the\s*following\s*conditions\s*are\s*met/;
const BSD_ORIGINAL = /All\s*advertising\s*materials\s*mentioning\s*features\s*or\s*use\s*of\s*this\s*software\s*must\s*display\s*the\s*following\s*acknowledgement/;
const BSD_3 = /Neither\s*the\s*name\s*of\s*.*\s*nor\s*the\s*names\s*of\s*its\s*contributors\s*may\s*be\s*used\s*to\s*endorse\s*or\s*promote\s*products\s*derived\s*from\s*this\s*software\s*without\s*specific\s*prior\s*written\s*permission/;
const MIT = /Permission\s*is\s*hereby\s*granted,\s*free\s*of\s*charge,\s*to\s*any\s*person\s*obtaining\s*a\s*copy\s*of\s*this\s*software\s*and\s*associated\s*documentation\s*files/;
const ISC = /Permission\s*to\s*use,\s*copy,\s*modify,\s*and\/or\s*distribute\s*this\s*software\s*for\s*any\s*purpose\s*with\s*or\s*without\s*fee\s*is\s*hereby\s*granted,\s*provided\s*that\s*the\s*above\s*copyright\s*notice\s*and\s*this\s*permission\s*notice\s*appear\s*in\s*all\s*copies./;
const LGPL = /Everyone\s*is\s*permitted\s*to\s*copy\s*and\s*distribute\s*verbatim\s*copies\s*of\s*this\s*license\s*document,\s*but\s*changing\s*it\s*is\s*not\s*allowed./;
const LGPL20 = /This\s*license,\s*the\s*Library\s*General\s*Public\s*License/;
const LGPL21 = /This\s*license,\s*the\s*Lesser\s*General\s*Public\s*License/;
const LGPL30 = /This\s*version\s*of\s*the\s*GNU\s*Lesser\s*General\s*Public\s*License/;
const APACHE = /[Aa]pache/;
const APACHE10 = /Redistributions\s*of\s*source\s*code\s*must\s*retain\s*the\s*above\s*copyright/;
const APACHE11 = /The\s*end-user\s*documentation\s*included\s*with\s*the\s*redistribution,\s*if\s*any,\s*must\s*include\s*the\s*following\s*acknowledgment/;
const APACHE20 = /"License"\s*shall\s*mean\s*the\s*terms\s*and\s*conditions\s*for\s*use,\s*reproduction/;
const EPL10 = /The\s*Eclipse\s*Foundation\s*is\s*the\s*initial\s*Agreement\s*Steward/;
const WTFPL = /FUCK/;


function isBSD(text) {
  if (BSD.test(text) && !APACHE.test(text)) {
    if (BSD_ORIGINAL.test(text)) {
      return 'BSD-4-Clause';
    } else if (BSD_3.test(text)) {
      return 'BSD-3-Clause';
    } else {
      return 'BSD-2-Clause';
    }
  }
}

function isMIT(text) {
  if (MIT.test(text)) {
    return 'MIT';
  }
}

function isISC(text) {
  if (ISC.test(text)) {
    return 'ISC';
  }
}

function isEclipse(text) {
  if (EPL10.test(text)) {
    return 'EPL-1.0';
  }
}

function identifyVersion(text, baseLicense, versions) {
  if (baseLicense.test(text)) {
    return Object.keys(versions).find(function (spdx) {
      return versions[spdx].test(text);
    });
  }
}

function isLGPL(text) {
  return identifyVersion(text, LGPL, {
    'LGPL-2.0': LGPL20,
    'LGPL-2.1': LGPL21,
    'LGPL-3.0': LGPL30
  });
}

function isApache(text) {
  return identifyVersion(text, APACHE, {
    'Apache-1.1': APACHE11,
    'Apache-2.0': APACHE20,
    'Apache-1.0': APACHE10
  });
}

function isWTF(text) {
  if (WTFPL.test(text)) {
    return 'WTFPL';
  }
}


module.exports = methods = {
  isBSD: isBSD,
  isMIT: isMIT,
  isISC: isISC,
  isLGPL: isLGPL,
  isApache: isApache,
  isEclipse: isEclipse,
  isWTF: isWTF,
  inferLicense: function (text) {
    const matchingMethod = Object.keys(methods).find(function (methodName) {
      return /^is/.test(methodName) && methods[methodName](text);
    });
    if (matchingMethod) {
      return methods[matchingMethod](text);
    } else {
      return undefined;
    }
  }
};


