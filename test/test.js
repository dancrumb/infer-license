/**
 * Created by danrumney on 1/17/17.
 */
const infer = require('../infer-license');
const licenses = require('spdx-license-list/spdx-full');
const assert = require('assert');

const methodsUnderTest = Object.keys(infer).filter(function(method) { return /is.*/.test(method); } );

function onlyOneIsTrue(list) {
  return list.filter(Boolean).length === 1;
}

function assertDefinitive(text) {
  assert(onlyOneIsTrue(methodsUnderTest.map(function(methodName) {
    return(infer[methodName](text));
  })));
}

const matchers = {
  'MIT': 'isMIT',
  'BSD-2-Clause': 'isBSD',
  'BSD-3-Clause': 'isBSD',
  'BSD-4-Clause': 'isBSD',
  'ISC': 'isISC',
  'LGPL-2.0': 'isLGPL',
  'LGPL-2.1': 'isLGPL',
  'LGPL-3.0': 'isLGPL',
  'Apache-1.0': 'isApache',
  'Apache-1.1': 'isApache',
  'Apache-2.0': 'isApache',
  'EPL-1.0': 'isEclipse',
  'WTFPL': 'isWTF'
};

Object.keys(matchers).forEach(function (spdx) {
  const method = matchers[spdx];
  console.log('Testing ' + spdx);
  const license = licenses[spdx].license;
  assert(infer[method](license));
  assert.equal(infer.inferLicense(license), spdx);
  assertDefinitive(license)
});
